import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import ArticlePage from "./components/pages/ArticlePage";
import AccountPage from "./components/pages/AccountPage";
import TopicsPage from "./components/pages/TopicsPage";
import TopicsArticlesPage from "./components/pages/TopicArticlesPage";
import { useError } from "./contexts/ErrorContext";
import ErrorCard from "./components/ErrorCard.jsx";

function App() {
  const { error, clearError } = useError();

  return (
    <>
      <Header />
      <ErrorCard message={error} onClose={clearError} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:topicSlug" element={<TopicsArticlesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
