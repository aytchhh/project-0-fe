import Header from './Header'
import ArticleCard from './ArticleCard'
import getArticles, { getTopics } from '../../api'
import SpinnerUI from './SpinnerUI'
import { useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'

function ArticlesList({login, setLogin, showForm, setShowForm, user, setUser}) {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const topicQuery = searchParams.get('topic')
    
    getTopics()
        .then((arr)=>{
        setTopics(arr.map((topic)=>topic.slug))
        })
        .catch((err)=>{window.alert(err.response.data.message)})

    useEffect(()=>{
        setIsLoading(true)
        getArticles(topicQuery)
        .then((data)=>{
            setArticles(data)
            setIsLoading(false)
        })
        .catch((err)=>{window.alert(err.response.data.message)})
    }, [topicQuery])
    
    const setCategory = (e)=>{
        const newParams = new URLSearchParams(searchParams);
        newParams.set('topic', e.target.value);
        setSearchParams(newParams);
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

            <label>Article Category: &nbsp;</label>
            <select name="categories" id="category-select" onChange={setCategory}>
                {
                    [<option key={0} value={''}>all</option>, ...topics.map((topic, index)=><option key={index + 1} value={topic}>{topic}</option>)]
                }
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