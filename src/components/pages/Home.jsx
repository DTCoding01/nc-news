import { getArticles } from "../../../api";
import "../../css/pages/Home.scss";
import { useEffect, useState } from "react";
import ArticlesList from "../articles/ArticlesList";
import { useError } from "../../contexts/ErrorContext";
import { useSearchParams } from "react-router-dom";
import { useIsLoading } from "../../contexts/IsLoading";
import LoadingAnimation from "../LoadingAnimation";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const { setError } = useError();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, setIsLoading } = useIsLoading();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    getArticles({ sortBy, order })
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error fetching Articles: " + err.message);
      });
  }, [sortBy, order, setError]);

  const handleSortChange = (e) => {
    setSearchParams({ sort_by: e.target.value, order });
  };

  const handleOrderChange = (e) => {
    setSearchParams({ sort_by: sortBy, order: e.target.value });
  };

  return (
    <section id="home">
      <div className="sort-controls">
        <label>
          Sort by:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comment Count</option>
          </select>
        </label>
        <label>
          Order:
          <select value={order} onChange={handleOrderChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
      {isLoading ? <LoadingAnimation /> : <ArticlesList articles={articles} />}
    </section>
  );
}
