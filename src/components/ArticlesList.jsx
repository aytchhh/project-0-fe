import Header from './Header'
import ArticleCard from './ArticleCard'
import getArticles from '../../api'
import BounceLoader from 'react-spinners/BounceLoader'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function ArticlesList() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getArticles()
            .then((data)=>{
                setArticles(data)
                setIsLoading(false)
            })
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

            {isLoading ? <BounceLoader 
                color='#36d7b7'
                cssOverride={{
                    margin: "30vh auto"
                }} /> 
            :
            <ul>
                {
                    articles.map((article)=>{
                        return (
                        <Link to={`/${article.article_id}`}  key={article.article_id}>
                            <ArticleCard article={article} />
                        </Link>
                        )
                    })
                }
            </ul>
            }
        </>
    )
}

export default ArticlesList;