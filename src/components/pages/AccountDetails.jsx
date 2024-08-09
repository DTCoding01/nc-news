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
    <section
      className="account-details"
      aria-labelledby="account-details-heading"
    >
      <div className="account-details-header">
        <h1 id="account-details-heading" className="visually-hidden">
          Account Details
        </h1>
        <p className="my-posts" aria-label="My Posts">
          My Posts
        </p>
        <button onClick={handleClick} aria-label="Sign out of account">
          Sign-Out
        </button>
      </div>
      {isLoading ? (
        <div className="loading-container" role="status" aria-live="polite">
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
