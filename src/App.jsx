import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import ArticlePage from "./components/pages/ArticlePage";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./components/pages/AccountPage";

function App() {
 
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
