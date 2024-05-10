import axios from "axios";

const newsApi = axios.create({ baseURL: "https://nc-news-hwajay.onrender.com/api" });

function getArticles() {

    return newsApi
        .get('/articles')
        .then((res)=>{return res.data.articles})
}

export function getArticleById(article_id) {

    return newsApi
        .get(`/articles/${article_id}`)
        .then((res)=>{return res.data.article})
}

export function getCommentsById(article_id) {

    return newsApi
        .get(`/articles/${article_id}/comments`)
        .then((res) => {return res.data.comments})
}

export function patchArticleById(article_id, vote) {

    return newsApi
        .patch(`/articles/${article_id}`, {inc_votes: vote})
        .then((res)=>{return res.data.article})
}

export function getUserByUsername(username) {

    return newsApi
        .get(`/users/${username}`)
        .then((res)=>{return res.data.user})
}

export function postCommentByArticleId(article_id, username, body) {

    return newsApi
        .post(`/api/articles/${article_id}/comments`, {username: username, body: body})
        .then((res)=>{return res.data.comment})
}

export default getArticles;