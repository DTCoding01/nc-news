
import ArticleCard from "./ArticleCard";


export default function ArticlesList({ articles }) {
    
  return (
    <ul>
      {articles.map((article) => (
        <li>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
