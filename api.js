import axios from "axios";

const api = axios.create({
    baseURL: 'https://be-nc-news-rv48.onrender.com/api'
})

export function getArticles() {
    return api.get('/articles').then(({data: {articles}}) => {
        return articles
    })
}