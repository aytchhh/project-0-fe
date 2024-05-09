import Header from './Header'
import ArticleCard from './ArticleCard'
import getArticles from '../../api'
import SpinnerUI from './SpinnerUI'
import { useState } from 'react'
import { useEffect } from 'react'

function ArticlesList({upVoted, setUpvoted, downVoted, setDownvoted, voteChange, setVoteChange}) {
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
            <Header />

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
                                upVoted={upVoted}
                                setUpvoted={setUpvoted}
                                downVoted={downVoted}
                                setDownvoted={setDownvoted}
                                voteChange={voteChange}
                                setVoteChange={setVoteChange}
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