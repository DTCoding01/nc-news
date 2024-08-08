import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopics } from "../../../api";
import { Link } from "react-router-dom";
import "../../css/pages/TopicsArticlesPage.scss";
import { useError } from "../../contexts/ErrorContext";
import { fetchAllArticles } from "../../utils/articles";
import { useIsLoading } from "../../contexts/IsLoading";
import LoadingAnimation from "../LoadingAnimation.jsx";
import ArticlesList from "../articles/ArticlesList.jsx";

export default function TopicsArticlesPage() {
  const { topicSlug } = useParams();
  const [topicDescription, setTopicDescription] = useState("");
  const [topicArticles, setTopicArticles] = useState([]);
  const { setError } = useError();
  const { isLoading, setIsLoading } = useIsLoading();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((topics) => {
        const filteredTopics = topics.filter(
          (topic) => topic.slug === topicSlug
        );
        if (filteredTopics.length > 0) {
          setTopicDescription(filteredTopics[0].description);
        } else {
          throw new Error("Topic not found");
        }
      })
      .catch((error) => {
        setError(error.message);
        navigate("/error");
      });

    fetchAllArticles({ topicName: topicSlug })
      .then((articles) => {
        setTopicArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setTopicArticles([]);
          setIsLoading(false);
          return;
        }
        setError(error.message);
      });
  }, [topicSlug, setError]);

  return (
    <section className="topic-articles-page">
      <div className="topic-header">
        <h2 className="topic-slug">{topicSlug}</h2>
        <p>{topicDescription || "Loading description..."}</p>
      </div>
      {isLoading && <LoadingAnimation />}
      <Link to="/post" state={{ topic: topicSlug }}>
        ADD NEW ARTICLE
      </Link>
      {topicArticles.length === 0 ? (
        <div className="empty-topic">
          <li className="empty-topic-message">No Articles Yet...</li>
        </div>
      ) : (
        <ArticlesList articles={topicArticles} />
      )}
    </section>
  );
}
