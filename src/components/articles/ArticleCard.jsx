import { useNavigate } from "react-router-dom";
import timeAgo from "../../utils/articles.js";
export default function ArticleCard({ article }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/article", { state: { articleId: article.article_id } });
  }

  const altText = `Image for article titled '${article.title}' by ${article.author} on ${article.topic}`;
  return (
    <article onClick={handleClick}>
      <div className="topic-and-time">
        <h4>{article.topic}</h4>
        <p>{timeAgo(article.created_at)}</p>
      </div>
      <h2>{article.title}</h2>
      <img alt={altText} src={article.article_img_url} />
    </article>
  );
}
