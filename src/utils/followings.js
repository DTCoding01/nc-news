import { getArticles } from "../../api";

export function fetchArticlesByCriteria(criteriaList, options = {}) {
  const articlePromises = criteriaList.map((criteria) =>
    getArticles({ ...criteria, ...options })
      .then((response) => response.articles)
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          return [];
        }
        throw error;
      })
  );

  return Promise.all(articlePromises).then((results) => results.flat());
}

export function sortArticlesByDate(articles) {
  return articles.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
}
