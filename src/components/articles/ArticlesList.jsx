import "../../css/components/ArticlesList.scss";
import ArticleCard from "./ArticleCard";

export default function ArticlesList({
  articles,
  setArticles,
  showDelete = false,
}) {
  return (
    <ul className="article-list-ul">
      {articles.map((article, index) => (
        <li className="account-article" key={index}>
          <ArticleCard
            article={article}
            showDelete={showDelete}
            setArticles={setArticles}
          />
        </li>
      ))}
    </ul>
  );
}
