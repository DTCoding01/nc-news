import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles, getTopics } from "../../../api";
import ArticleCard from "../articles/ArticleCard";
import "../../css/pages/TopicsArticlesPage.scss";
import { useError } from "../../contexts/ErrorContext";

export default function TopicsArticlesPage() {
  const { topicSlug } = useParams();
  const [topicDescription, setTopicDescription] = useState("");
  const [topicArticles, setTopicArticles] = useState([]);
  const { setError } = useError();

  useEffect(() => {
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
      });

    getArticles(topicSlug)
      .then((articles) => {
        setTopicArticles(articles);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [topicSlug, setError]);

  return (
    <section className="topics-articles-page">
      <div className="topic-header">
        <h2 className="topic-slug">{topicSlug}</h2>
        <p>{topicDescription || "Loading description..."}</p>
      </div>
      <ul>
        {topicArticles.map((article) => (
          <li key={article.article_id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
