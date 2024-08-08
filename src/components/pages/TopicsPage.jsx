import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTopics } from "../../../api";
import TopicsCard from "../topics/TopicsCard.jsx";
import "../../css/pages/TopicsPage.scss";
import { useError } from "../../contexts/ErrorContext.jsx";
import { useIsLoading } from "../../contexts/IsLoading.jsx";
import LoadingAnimation from "../LoadingAnimation.jsx";
import AddTopicForm from "../topics/AddTopicForm.jsx";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const { setError } = useError();
  const { isLoading, setIsLoading } = useIsLoading();
  const [addTopicClicked, setAddTopicClicked] = useState(false);
  const navigate = useNavigate();

  function handleAddTopic(e) {
    e.preventDefault();
    setAddTopicClicked(true);
  }

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((responseTopics) => {
        const sortedTopics = responseTopics.sort((a, b) =>
          a.slug.localeCompare(b.slug)
        );
        setTopics(sortedTopics);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Topics not found");
        navigate("/error");
      });
  }, []);


  return (
    <section className="topics-page">
      {isLoading && <LoadingAnimation />}
      <ul>
        {addTopicClicked ? (
          <AddTopicForm
            setAddTopicClicked={setAddTopicClicked}
            setTopics={setTopics}
            topics={topics}
          />
        ) : (
          <li onClick={handleAddTopic} className="add-topic topic-option">
            +
          </li>
        )}
        {topics.map((topic) => (
          <li className="topic-option" key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>
              <TopicsCard topic={topic} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
