import timeAgo from "../../utils.js/articles.js";
export default function ArticleCard({ article }) {
  return (
    <article>
      <div className="topic-and-time">
        <h4>{article.topic}</h4>
        <p>{timeAgo(article.created_at)}</p>
      </div>
      <h2>{article.title}</h2>
      <img src={article.article_img_url} />
    </article>
  );
}
