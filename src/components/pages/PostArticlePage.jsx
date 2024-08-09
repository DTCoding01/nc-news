import { useContext, useEffect, useState } from "react";
import "../../css/pages/PostArticlePage.scss";
import { getTopics, postArticle } from "../../../api";
import ArticlePage from "./ArticlePage";
import { UserContext } from "../../contexts/UserContext";
import placeHolderImage from "../../assets/elementor-placeholder-image.webp";
import validateImageUrl from "../../utils/postArticles";
import { useNavigate, useLocation } from "react-router-dom";
import { useError } from "../../contexts/ErrorContext";

export default function PostArticlePage() {
  const { user } = useContext(UserContext);
  const { setError } = useError();
  const location = useLocation();
  const navigate = useNavigate();

  const topicSlug = location.state?.topic || "coding";

  const defaultArticle = {
    title: "Your Title",
    author: user.username,
    topic: topicSlug,
    created_at: Date.now(),
    article_img_url: placeHolderImage,
    body: "",
    placeholder: true,
  };

  const [topics, setTopics] = useState([]);
  const [article, setArticle] = useState(defaultArticle);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  function handleChange(e) {
    const { id, value } = e.target;

    setArticle((prevArticle) => ({
      ...prevArticle,
      [id]: value || defaultArticle[id],
    }));
  }

  async function checkImageUrl() {
    return await validateImageUrl(article.article_img_url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isImageValid = await checkImageUrl();

    if (article.body.length > 0 && isImageValid) {
      postArticle(article)
        .then((postedArticle) => {
          navigate(`/articles/${postedArticle.article_id}`, { replace: true });
        })
        .catch((err) => {
          setError("Error Posting Article");
        });
    } else {
      setError("Invalid image URL or empty article body.");
    }
  }

  return (
    <section className="post-article-page">
      <form
        className="post-form"
        onSubmit={handleSubmit}
        aria-describedby="post-form-description"
      >
        <input
          onChange={handleChange}
          id="title"
          placeholder="Enter your Title..."
          aria-required="true"
        />
        <input
          onChange={handleChange}
          id="article_img_url"
          placeholder="Enter your Image URL..."
          aria-required="true"
        />
        <select
          value={article.topic}
          onChange={handleChange}
          id="topic"
          aria-required="true"
        >
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          ))}
        </select>

        <textarea
          value={article.body}
          onChange={handleChange}
          id="body"
          placeholder="Enter your Article content..."
          aria-required="true"
        />
        <button type="submit" className="post-article-button">
          POST
        </button>
      </form>
      <div
        className="example-article"
        aria-labelledby="example-article-heading"
      >
        <ArticlePage placeholderArticle={article} />
      </div>
    </section>
  );
}
