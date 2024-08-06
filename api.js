import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-rv48.onrender.com/api",
});

export function getArticles() {
  return api.get("/articles").then(({ data: { articles } }) => {
    return articles;
  });
}

export function getArticleById(articleId) {
  return api.get(`/articles/${articleId}`).then(({ data: { article } }) => {
    return article;
  });
}

export function getCommentsByArticleId(id) {
  return api.get(`/articles/${id}/comments`).then(({ data: { comments } }) => {
    return comments;
  });
}

export function patchArticleVotes(id, vote) {
  return api.patch(`/articles/${id}`, vote).then(({ data: { article } }) => {
    return article
  });
}
