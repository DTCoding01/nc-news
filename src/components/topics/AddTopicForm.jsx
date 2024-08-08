import { useState } from "react";
import "../../css/components/AddTopicForm.scss";
import { postTopic } from "../../../api";
import { useError } from "../../contexts/ErrorContext";

export default function AddTopicForm({
  setAddTopicClicked,
  setTopics,
  topics,
}) {
  const { setError } = useError();
  const [inputValues, setInputValues] = useState({
    "topic-name-input": "",
    "topic-description-input": "",
  });

  function handleClose(e) {
    e.preventDefault();
    setAddTopicClicked(false);
  }

  function handleChange(e) {
    setInputValues({ ...inputValues, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      inputValues["topic-name-input"] !== "" &&
      inputValues["topic-description-input"] !== ""
    ) {
      const newTopicObject = {
        slug: inputValues["topic-name-input"],
        description: inputValues["topic-description-input"],
      };
      if (topics.some((topic) => topic.slug === newTopicObject.slug)) {
        setError("Topic already exists");
        return;
      }

      setTopics((currTopics) => [newTopicObject, ...currTopics]);
      postTopic(newTopicObject)
        .then((responseTopic) => {
          setTopics((currTopics) => {
            return currTopics.map((topic) => {
              return topic.slug === responseTopic.slug ? responseTopic : topic;
            });
          });
          setAddTopicClicked(false);
        })
        .catch((err) => {
          setError("Error adding topic");
          setTopics((currTopics) =>
            currTopics.filter((topic) => topic.slug !== newTopicObject.slug)
          );
        });
    }
  }

  return (
    <li className="topic-input-li">
      <form onSubmit={handleSubmit} className="add-topic-form">
        <label htmlFor="topic-name-input">
          Topic Name
          <input
            onChange={handleChange}
            placeholder="Enter your topic name..."
            id="topic-name-input"
            value={inputValues["topic-name-input"]}
          />
        </label>
        <label htmlFor="topic-description-input">
          Topic Description
          <input
            onChange={handleChange}
            placeholder="Enter your topic description..."
            id="topic-description-input"
            value={inputValues["topic-description-input"]}
          />
        </label>
        <button type="submit">Add</button>
        <button onClick={handleClose} className="close-add-topic">
          X
        </button>
      </form>
    </li>
  );
}
