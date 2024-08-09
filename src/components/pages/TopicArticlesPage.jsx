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
    <section className="topic-articles-page" aria-labelledby="topic-heading">
      <div className="topic-header">
        <h1 id="topic-heading" className="topic-slug">
          {topicSlug}
        </h1>
        <p id="topic-description">
          {topicDescription || "Loading description..."}
        </p>
      </div>
      {isLoading && (
        <div className="loading-container"role="status" aria-live="polite">
          <LoadingAnimation />
        </div>
      )}
      <Link
        to="/post"
        state={{ topic: topicSlug }}
        className="add-article-link"
        aria-label={`Add a new article to ${topicSlug}`}
      >
        ADD NEW ARTICLE
      </Link>
      {topicArticles.length === 0 ? (
        <div className="empty-topic" aria-labelledby="empty-topic-heading">
          <h2 id="empty-topic-heading" className="visually-hidden">
            No Articles Available
          </h2>
          <p className="empty-topic-message">No Articles Yet...</p>
        </div>
      ) : (
        <ArticlesList articles={topicArticles} />
      )}
    </section>
  );
}
