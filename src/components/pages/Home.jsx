import { getArticles } from "../../../api";
import "../../css/pages/Home.scss";
import { useEffect, useState } from "react";
import ArticlesList from "../articles/ArticlesList";
import { useError } from "../../contexts/ErrorContext";
export default function Home() {
  const [articles, setArticles] = useState([]);
  const {setError} = useError()

  useEffect(() => {
    getArticles()
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        setError("Error fetching Articles")
      });
  }, []);

  return (
    <section id="home">
      <ArticlesList articles={articles} />
    </section>
  );
}
