import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../css/pages/ArticlePage.scss";
import { useContext, useEffect, useState } from "react";
import {
  fetchFollowings,
  getArticleById,
  patchArticleVotes,
} from "../../../api.js";
import ArticleCard from "../articles/ArticleCard.jsx";
import { splitContentIntoParagraphs } from "../../utils/articles.js";
import CommentList from "../comments/CommentList.jsx";
import {
  getUserVoteFromStorage,
  saveUserVoteToStorage,
  removeUserVoteFromStorage,
} from "../../utils/localStorage.js";
import { useError } from "../../contexts/ErrorContext.jsx";
import { useIsLoading } from "../../contexts/IsLoading.jsx";
import LoadingAnimation from "../LoadingAnimation.jsx";
import { handleFollowUser, handleUnfollowUser } from "../../utils/users.js";
import { UserContext } from "../../contexts/UserContext.jsx";

export default function ArticlePage({ placeholderArticle }) {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [paragraphs, setParagraphs] = useState([]);
  const [articleVotes, setArticleVotes] = useState(0);
  const [userVote, setUserVote] = useState(0);
  const [authorFollowed, setAuthorFollowed] = useState(false);
  const { setError } = useError();
  const { user } = useContext(UserContext);
  const { isLoading, setIsLoading } = useIsLoading();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticleData() {
      if (placeholderArticle) {
        setArticle(placeholderArticle);
        setParagraphs(splitContentIntoParagraphs(placeholderArticle.body));
        setIsLoading(false);
      } else if (articleId) {
        try {
          setIsLoading(true);
          const fetchedArticle = await getArticleById(articleId);
          setArticle(fetchedArticle);
          setArticleVotes(fetchedArticle.votes);
          setParagraphs(splitContentIntoParagraphs(fetchedArticle.body));

          const storedVote = getUserVoteFromStorage(articleId);
          setUserVote(storedVote);
        } catch (error) {
          setError("Article Not Found");
          navigate("/error");
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchArticleData();
  }, [articleId, placeholderArticle, navigate, setError, setIsLoading]);

  useEffect(() => {
    async function checkAuthorFollowed() {
      if (user && article.author) {
        try {
          const { users } = await fetchFollowings(user.username);
          if (users.includes(article.author)) {
            setAuthorFollowed(true);
          } else {
            setAuthorFollowed(false);
          }
        } catch (error) {
          console.error("Failed to fetch followings", error);
        }
      }
    }
    checkAuthorFollowed();
  }, [user, article.author]);

  function handleVote(e) {
    const voteType = e.target.id === "upvote-article" ? 1 : -1;

    let voteAmount = 0;
    if (userVote === voteType) {
      voteAmount -= voteType;
      setUserVote(0);
      removeUserVoteFromStorage(articleId);
    } else {
      voteAmount = voteType - userVote;
      setUserVote(voteType);
      saveUserVoteToStorage(articleId, voteType);
    }

    setArticleVotes((prevVotes) => prevVotes + voteAmount);
    const vote = {
      inc_votes: voteAmount,
    };

    patchArticleVotes(articleId, vote).catch((error) => {
      console.error("Error updating votes:", error);
      setArticleVotes((prevVotes) => prevVotes - voteAmount);
      setUserVote(userVote);

      if (userVote !== 0) {
        saveUserVoteToStorage(articleId, userVote);
      } else {
        removeUserVoteFromStorage(articleId);
      }
    });
  }

  function followUser(e, author) {
    e.preventDefault();
    console.log(author);
    handleFollowUser(user.username, { followeeUsername: author })
      .then(() => {
        setAuthorFollowed(true);
      })
      .catch((error) => {
        setError(`Could not follow ${author}`);
      });
  }

  function unfollowUser(e, author) {
    e.preventDefault();
    handleUnfollowUser(user.username, author)
      .then(() => {
        setAuthorFollowed(false);
      })
      .catch((error) => {
        setError(`Could not unfollow ${author}`);
      });
  }

  return (
    <section className="article-page">
      {isLoading ? (
        <div className="loading-container" role="status" aria-live="polite">
          <LoadingAnimation />
        </div>
      ) : (
        <article className="article-section">
          <ArticleCard article={article} />
          <div className="author-and-votes">
            <p className="author" aria-label={`Author: ${article.author}`}>
              {article.author}
            </p>

            <div
              className="article-buttons"
              role="group"
              aria-label="Article voting and follow options"
            >
              <p className="article-votes" aria-live="polite">
                {articleVotes}
              </p>
              <button
                id="upvote-article"
                className={userVote === 1 ? "clicked" : null}
                onClick={handleVote}
                aria-pressed={userVote === 1}
                aria-label="Upvote article"
              >
                +
              </button>
              <button
                id="downvote-article"
                className={userVote === -1 ? "clicked" : null}
                onClick={handleVote}
                aria-pressed={userVote === -1}
                aria-label="Downvote article"
              >
                -
              </button>
              {user.username !== article.author &&
                (authorFollowed ? (
                  <button
                    onClick={(e) => {
                      unfollowUser(e, article.author);
                    }}
                    className="unfollow"
                    aria-label={`Unfollow ${article.author}`}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="follow"
                    onClick={(e) => {
                      followUser(e, article.author);
                    }}
                    aria-label={`Follow ${article.author}`}
                  >
                    Follow
                  </button>
                ))}
            </div>
          </div>

          {paragraphs.map((para, index) => {
            if (para.length > 0) {
              return (
                <p className="paragraph" key={index}>
                  {para}
                </p>
              );
            } else {
              return null;
            }
          })}
        </article>
      )}
      {!placeholderArticle && <CommentList articleId={article.article_id} />}
    </section>
  );
}
