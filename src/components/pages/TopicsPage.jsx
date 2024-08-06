import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTopics } from "../../../api";
import TopicsCard from "../topics/TopicsCard.jsx";
import "../../css/pages/TopicsPage.scss";
import { useError } from "../../contexts/ErrorContext.jsx";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const { setError } = useError();
  const navigate = useNavigate()

  useEffect(() => {
    getTopics()
      .then((responseTopics) => setTopics(responseTopics))
      .catch((error) => {
        setError("Topics not found");
        navigate("/error");
      });
  }, [topics]);

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
