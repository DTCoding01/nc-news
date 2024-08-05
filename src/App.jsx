import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import ArticlePage from "./components/articles/ArticlePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
