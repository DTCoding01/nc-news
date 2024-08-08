import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import ArticlePage from "./components/pages/ArticlePage";
import AccountPage from "./components/pages/AccountPage";
import AccountDetails from "./components/pages/AccountDetails.jsx";
import TopicsPage from "./components/pages/TopicsPage";
import TopicsArticlesPage from "./components/pages/TopicArticlesPage";
import { useError } from "./contexts/ErrorContext";
import ErrorCard from "./components/ErrorCard.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import { UserContext } from "./contexts/UserContext.jsx";
import PostArticlePage from "./components/pages/PostArticlePage.jsx";

function App() {
  const { error, clearError } = useError();
  const { user } = useContext(UserContext);

  return (
    <main>
      <Header />
      <ErrorCard message={error} onClose={clearError} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route
          path="/account"
          element={user ? <AccountDetails user={user} /> : <AccountPage />}
        />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:topicSlug" element={<TopicsArticlesPage />} />
        <Route path="/post" element={<PostArticlePage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
