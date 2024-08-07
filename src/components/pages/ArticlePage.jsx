import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../css/pages/ArticlePage.scss";
import { useEffect, useState } from "react";
import { getArticleById, patchArticleVotes } from "../../../api.js";
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

export default function ArticlePage({ placeholderArticle }) {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [paragraphs, setParagraphs] = useState([]);
  const [articleVotes, setArticleVotes] = useState(0);
  const [userVote, setUserVote] = useState(0);
  const { setError } = useError();
  const { isLoading, setIsLoading } = useIsLoading();
  const navigate = useNavigate();

  useEffect(() => {
    if (placeholderArticle) {
      setIsLoading(true);
      setArticle(placeholderArticle);
      const splitBody = splitContentIntoParagraphs(placeholderArticle.body);
      setParagraphs(splitBody);
      setIsLoading(false);
      return;
    }
    if (articleId) {
      setIsLoading(true);
      getArticleById(articleId)
        .then((fetchedArticle) => {
          setArticle(fetchedArticle);
          setArticleVotes(fetchedArticle.votes);
          const splitBody = splitContentIntoParagraphs(fetchedArticle.body);
          setParagraphs(splitBody);

          const storedVote = getUserVoteFromStorage(articleId);
          setUserVote(storedVote);
          setIsLoading(false);
        })
        .catch((error) => {
          setError("Article Not Found");
          navigate("/error");
        });
    }
  }, [articleId, placeholderArticle]);

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
  if (isLoading) {
    return <LoadingAnimation />;
  }
  return (
    <section className="article-page">
      <ArticleCard article={article} />
      <div className="author-and-votes">
        <p className="author">{article.author}</p>
        <div className="article-buttons">
          <p className={`article-votes`}>{articleVotes}</p>
          <button
            id="upvote-article"
            className={userVote === 1 ? "clicked" : null}
            onClick={handleVote}
            aria-label="Upvote article"
          >
            +
          </button>
          <button
            id="downvote-article"
            className={userVote === -1 ? "clicked" : null}
            onClick={handleVote}
            aria-label="Downvote article"
          >
            -
          </button>
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
      {!placeholderArticle && <CommentList articleId={article.article_id} />}
    </section>
  );
}
