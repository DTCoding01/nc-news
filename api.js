import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-rv48.onrender.com/api",
});

export function getArticles({
  author = "",
  topicName = "",
  sortBy = "created_at",
  order = "desc",
  page = 1,
  limit = 10,
} = {}) {
  const params = {
    ...(author && { author: author }),
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

export function patchCommentVotes(id, vote) {
  return api.patch(`/comments/${id}`, vote).then(({ data: { comment } }) => {
    return comment;
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
  return api.post("/articles", article).then(({ data: { post } }) => {
    return post;
  });
}

export function deleteArticle(article_id) {
  return api.delete(`/articles/${article_id}`).catch((err) => {
    return err;
  });
}

export function postTopic(topic) {
  return api.post("/topics", topic).then(({ data: { topic } }) => {
    return topic;
  });
}

export function followTopic(username, body) {
  return api.post(`/users/${username}/follow-topic`, body).then(({ data }) => {
    return data;
  });
}

export function unfollowTopic(username, topicSlug) {
  return api
    .delete(`/users/${username}/unfollow-topic/${topicSlug}`)
    .then((response) => {
      return response;
    });
}

export function followUser(username, body) {
  console.log(username, body)
  return api.post(`/users/${username}/follow-user`, body).then(({ data }) => {
    console.log(data)
    return data;
  });
}

export function unfollowUser(currUser, username) {
  return api
    .delete(`/users/${currUser}/unfollow-user/${username}`)
    .then((response) => {
      return response;
    });
}

export function fetchFollowings(username) {
  return api.get(`/users/${username}/followings`).then(({ data }) => {
    return data;
  });
}
