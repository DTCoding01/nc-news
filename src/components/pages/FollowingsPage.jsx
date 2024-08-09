import { useContext, useEffect, useState } from "react";
import { fetchFollowings } from "../../../api";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useError } from "../../contexts/ErrorContext.jsx";
import ArticlesList from "../articles/ArticlesList.jsx";
import "../../css/pages/FollowingsPage.scss";
import {
  fetchArticlesByCriteria,
  sortArticlesByDate,
} from "../../utils/followings.js";
import { useIsLoading } from "../../contexts/IsLoading.jsx";
import LoadingAnimation from "../LoadingAnimation.jsx";

export default function FollowingsPage() {
  const { user, isUserLoading } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const { setError } = useError();
  const { isLoading, setIsLoading } = useIsLoading();

  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    if (!user) {
      return;
    }

    setIsLoading(true);

    fetchFollowings(user.username)
      .then(({ topics, users }) => {
        if (topics.length === 0 && users.length === 0) {
          console.warn("No followings found for user:", user.username);
          setIsLoading(false);
          return;
        }

        const topicCriteria = topics.map((topicName) => ({ topicName }));
        const userCriteria = users.map((author) => ({ author }));

        return Promise.all([
          fetchArticlesByCriteria(topicCriteria, { limit: 5 }),
          fetchArticlesByCriteria(userCriteria, { limit: 5 }),
        ]);
      })
      .then(([topicArticles, userArticles]) => {
        const allArticles = [...topicArticles, ...userArticles];
        const sortedArticles = sortArticlesByDate(allArticles);

        setArticles(sortedArticles);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, isUserLoading, setError, setIsLoading]);

  return (
    <div
      className="following-articles"
      aria-labelledby="following-articles-heading"
    >
      <div className="following-header">
        {articles.length === 0 && !isLoading ? (
          <p className="no-follows">You follow no one</p>
        ) : (
          <h2 id="following-articles-heading">Your Followings</h2>
        )}
      </div>
      {isLoading ? (
        <div className="loading-container" role="status" aria-live="polite">
          <LoadingAnimation />
        </div>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </div>
  );
}
