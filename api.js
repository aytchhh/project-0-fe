import axios from "axios";

const newsApi = axios.create({ baseURL: "https://nc-news-hwajay.onrender.com/api" });

function getArticles(topic) {

    return newsApi
        .get('/articles', {
            params: {
                topic: topic
            }
        })
        .then((res)=>{return res.data.articles})
}

export function getTopics() {

    return newsApi
        .get('/topics')
        .then((res)=>{return res.data.topics})
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
        .post(`/articles/${article_id}/comments`, {username: username, body: body})
        .then((res)=>{return res.data.comment})
}

export function deleteCommentById(comment_id) {
    
    return newsApi
        .delete(`/comments/${comment_id}`)
}

export default getArticles;