import { useLocation } from "react-router-dom";
import "../../css/pages/ArticlePage.scss";
import { useEffect, useState } from "react";
import { getArticleById } from "../../../api";
import ArticleCard from "./ArticleCard";
import { splitContentIntoParagraphs } from "../../utils/articles";
import CommentList from "../comments/CommentList";
export default function ArticlePage() {
  const location = useLocation();
  const { articleId } = location.state;
  const [article, setArticle] = useState({});
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    if (articleId) {
      getArticleById(articleId)
        .then((fetchedArticle) => {
          setArticle(fetchedArticle);
          const splitBody = splitContentIntoParagraphs(fetchedArticle.body);
          setParagraphs(splitBody);
        })
        .catch((error) => {
          console.error("Error fetching article:", error);
        });
    }
  }, []);


  return (
    <section className="article-page">
      <ArticleCard article={article} />
      <p className="author">{article.author}</p>
      {paragraphs.map((para, index) => {
        if (para.length > 0) {
          return (
            <p className="paragraph" key={index}>
              {para}
            </p>
          );
        } else {
          return null;
        }
      })}
      <CommentList articleId={article.article_id} />
    </section>
  );
}
