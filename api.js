import axios from "axios";

const newsApi = axios.create({ baseURL: "https://nc-news-hwajay.onrender.com/api" });

function getArticles() {

    return newsApi
        .get('/articles')
        .then((res)=>{return res.data.articles})
}

export default getArticles;