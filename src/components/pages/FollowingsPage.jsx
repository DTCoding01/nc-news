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
import loadingAnimation from "../LoadingAnimation.jsx";
import LoadingAnimation from "../LoadingAnimation.jsx";
export default function FollowingsPage() {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const { setError } = useError();
  const { isLoading, setIsLoading } = useIsLoading();

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    fetchFollowings(user.username)
      .then(({ topics, users }) => {
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error in followings fetch chain:", err);
        setError("Followings not found");
      });
  }, [user, setError]);

  return (
    <div className="following-articles">
      <p className="your-followed">Your Followed Topics</p>
      {isLoading ? <LoadingAnimation /> : <ArticlesList articles={articles} />}
    </div>
  );
}
