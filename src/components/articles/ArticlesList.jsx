import ArticleCard from "./ArticleCard";

export default function ArticlesList({ articles }) {
  return (
    <ul className="article-list-ul">
      {articles.map((article) => (
        <li key={article.article_id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
