import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-rv48.onrender.com/api",
});

export function getArticles({
  topicName = "",
  sortBy = "created_at",
  order = "desc",
  page = 1,
  limit = 10,
} = {}) {
  const params = {
    ...(topicName && { topic: topicName }),
    ...(sortBy && { sort_by: sortBy }),
    ...(order && { order: order }),
    page,
    limit,
  };
  
  return api
    .get("/articles", { params })
    .then(({ data }) => {
      const articles = data.articles;
      const totalCount = data.total_count;
      return { totalCount, articles };
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
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
    return article;
  });
}

export function getUserByUsername(username) {
  return api.get(`/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
}
export function postComment(id, comment) {
  return api
    .post(`/articles/${id}/comments`, comment)
    .then(({ data: { comment } }) => {
      return comment;
    });
}

export function deleteComment(id) {
  return api.delete(`/comments/${id}`).catch((err) => err);
}

export function getTopics() {
  return api.get("/topics").then(({ data: { rows } }) => {
    return rows;
  });
}

export function postArticle(article) {

  return api.post('/articles', article).then(({data: {post}}) => {
   
    return post
  })
}