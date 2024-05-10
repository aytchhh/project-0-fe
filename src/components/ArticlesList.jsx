import Header from './Header'
import ArticleCard from './ArticleCard'
import getArticles from '../../api'
import SpinnerUI from './SpinnerUI'
import { useState } from 'react'
import { useEffect } from 'react'

function ArticlesList({login, setLogin, showForm, setShowForm, user, setUser}) {
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
        // change category
    }

    return (
        <>
            <Header 
                login={login}
                setLogin={setLogin}
                showForm={showForm}
                setShowForm={setShowForm}
                user={user}
                setUser={setUser}
            />

            <label>Article Category: </label>
            <select name="categories" id="category-select" onChange={handleChange}>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
            </select>

            {isLoading ? <SpinnerUI /> :
            <ul>
                {
                    articles.map((article)=>{
                        return (
                            <ArticleCard 
                                key={article.article_id}
                                article={article}
                            />
                        )
                    })
                }
            </ul>
            }
        </>
    )
}

export default ArticlesList;