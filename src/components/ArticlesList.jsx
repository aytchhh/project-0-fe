import Header from './Header'
import ArticleCard from './ArticleCard'
import getArticles from '../../api'
import { useState } from 'react'
import { useEffect } from 'react'

function ArticlesList() {
    const [articles, setArticles] = useState([])

    useEffect(()=>{
        getArticles()
            .then((data)=>setArticles(data))
            .catch((err)=>{console.log(err)})
    }, [])

    const handleChange = ()=>{

    }


    return (
        <>
            <Header />

            <label>Article Category: </label>
            <select name="categories" id="category-select" onChange={handleChange}>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
            </select>

            <ul>
                {
                    articles.map((article)=>{
                        return <ArticleCard key={article.article_id} article={article}/>
                    })
                }
            </ul>
        </>
    )
}

export default ArticlesList;