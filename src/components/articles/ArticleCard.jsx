import { useNavigate } from "react-router-dom";
import timeAgo from "../../utils/articles.js";
import { deleteArticle } from "../../../api";
import { useError } from "../../contexts/ErrorContext";
export default function ArticleCard({ article, setArticles, showDelete }) {
  const navigate = useNavigate();
  const setError = useError();
  function handleDelete() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!isConfirmed) {
      return;
    }

    setArticles((currArticles) =>
      currArticles.filter(
        (currArticle) => article.article_id !== currArticle.article_id
      )
    );

    deleteArticle(article.article_id).catch((err) => {
      setError("Error Deleting Article");
      setArticles([...articles, article]);
    });
  }
  function handleClick() {
    article.placeholder ? null : navigate(`/article/${article.article_id}`);
  }

  const altText = `Image for article titled '${article.title}' by ${article.author} on ${article.topic}`;
  return (
    <article className="article-list-card" onClick={handleClick}>
      <div className="topic-and-time">
        <h4>{article.topic}</h4>
        <p>{timeAgo(article.created_at)}</p>
      </div>
      <h2>{article.title}</h2>
      <img alt={altText} src={article.article_img_url} />
      {showDelete && <button onClick={handleDelete}>DELETE</button>}
    </article>
  );
}
