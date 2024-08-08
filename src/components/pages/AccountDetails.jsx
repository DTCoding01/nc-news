import { useEffect, useState, useContext } from "react";
import { fetchAllArticles } from "../../utils/articles";
import { UserContext } from "../../contexts/UserContext";
import ArticlesList from "../articles/ArticlesList";
import "../../css/pages/AccountDetails.scss";
import { useIsLoading } from "../../contexts/IsLoading";
import LoadingAnimation from "../LoadingAnimation.jsx";

export default function AccountDetails() {
  const [articles, setArticles] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { isLoading, setIsLoading } = useIsLoading();
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      fetchAllArticles()
        .then((allArticles) => {
          const filteredArticles = allArticles.filter(
            (article) => article.author === user.username
          );
          setArticles(filteredArticles);
          setIsLoading(false);
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
      <div className="account-details-header">
        <p className="my-posts">My Posts</p>
        <button onClick={handleClick}>Sign-Out</button>
      </div>
      {isLoading ? (
        <div className="loading">
          <LoadingAnimation />
        </div>
      ) : (
        <ArticlesList
          articles={articles}
          setArticles={setArticles}
          showDelete={true}
        />
      )}
    </section>
  );
}
