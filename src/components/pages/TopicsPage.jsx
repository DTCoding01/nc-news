import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopicsCard from "../topics/TopicsCard.jsx";
import "../../css/pages/TopicsPage.scss";
import { useError } from "../../contexts/ErrorContext.jsx";
import { useIsLoading } from "../../contexts/IsLoading.jsx";
import LoadingAnimation from "../LoadingAnimation.jsx";
import AddTopicForm from "../topics/AddTopicForm.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import {
  fetchAndSortTopics,
  fetchFollowedTopics,
  handleFollowTopic,
  handleUnfollowTopic,
} from "../../utils/topics.js";

export default function TopicsPage() {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [followedTopics, setFollowedTopics] = useState(new Set());
  const { setError } = useError();
  const { isLoading, setIsLoading } = useIsLoading();
  const [addTopicClicked, setAddTopicClicked] = useState(false);
  const navigate = useNavigate();

  function handleAddTopic(e) {
    e.preventDefault();
    setAddTopicClicked(true);
  }

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);

    fetchAndSortTopics()
      .then(setTopics)
      .then(() => fetchFollowedTopics(user.username))
      .then(setFollowedTopics)
      .catch((error) => {
        console.error("Error fetching topics or followings:", error);
        setError("Topics not found");
        navigate("/error");
      })
      .finally(() => setIsLoading(false));
  }, [user, setError, navigate, setIsLoading]);

  function handleFollow(e, slug) {
    e.preventDefault();

    handleFollowTopic(user.username, slug)
      .then(() => {
        setFollowedTopics((prevFollowedTopics) => {
          const updated = new Set(prevFollowedTopics);
          updated.add(slug);
          return updated;
        });
      })
      .catch((error) => {
        console.error(`Error following topic ${slug}:`, error);
        setError(`Could not follow topic ${slug}`);
      });
  }

  function handleUnfollow(e, slug) {
    e.preventDefault();

    handleUnfollowTopic(user.username, slug)
      .then(() => {
        setFollowedTopics((prevFollowedTopics) => {
          const updated = new Set(prevFollowedTopics);
          updated.delete(slug);
          return updated;
        });
      })
      .catch((error) => {
        console.error(`Error unfollowing topic ${slug}:`, error);
        setError(`Could not unfollow topic ${slug}`);
      });
  }

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
            {followedTopics.has(topic.slug) ? (
              <button
                onClick={(e) => handleUnfollow(e, topic.slug)}
                className="unfollow-topic"
              >
                UNFOLLOW
              </button>
            ) : (
              <button
                onClick={(e) => handleFollow(e, topic.slug)}
                className="follow-topic"
              >
                FOLLOW
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
