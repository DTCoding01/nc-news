import { useEffect, useState, useContext } from "react";
import { fetchAllArticles } from "../../utils/articles";
import { UserContext } from "../../contexts/UserContext";
import ArticlesList from "../articles/ArticlesList";
import "../../css/pages/AccountDetails.scss";

export default function AccountDetails() {
  const [articles, setArticles] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchAllArticles()
        .then((allArticles) => {
          const filteredArticles = allArticles.filter(
            (article) => article.author === user.username
          );
          setArticles(filteredArticles);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [user]);

  function handleClick() {
    setUser(null);
    localStorage.removeItem(`user`);
  }

  return (
    <section className="account-details">
      <div>
        <p className="my-posts">My Posts</p>
        <button onClick={handleClick}>Sign-Out</button>
      </div>

      <ArticlesList articles={articles} setArticles={setArticles}showDelete={true}/>
    </section>
  );
}
