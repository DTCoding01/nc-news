import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTopics } from "../../../api";
import TopicsCard from "../topics/TopicsCard.jsx";
import "../../css/pages/TopicsPage.scss";
import { useError } from "../../contexts/ErrorContext.jsx";
import { useIsLoading } from "../../contexts/IsLoading.jsx";
import LoadingAnimation from "../LoadingAnimation.jsx";
export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const { setError } = useError();
  const { isLoading, setIsLoading } = useIsLoading();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((responseTopics) => {
        setTopics(responseTopics);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Topics not found");
        navigate("/error");
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <LoadingAnimation />;
      </div>
    );
  }
  return (
    <section className="topics-page">
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>
              <TopicsCard topic={topic} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
