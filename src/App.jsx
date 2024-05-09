import ArticlesList from './components/ArticlesList'
import SingleArticle from './components/SingleArticle'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

function App() {
    const [voteChange, setVoteChange] = useState(0)
    const [upVoted, setUpvoted] = useState(false)
    const [downVoted, setDownvoted] = useState(false)

    return (
        <>
            <Routes>
            <Route path='/' element={ <ArticlesList 
                                        upVoted={upVoted}
                                        setUpvoted={setUpvoted}
                                        downVoted={downVoted}
                                        setDownvoted={setDownvoted}
                                        voteChange={voteChange}
                                        setVoteChange={setVoteChange}
                                    />} 
            />
            <Route path='/:article_id' element={ <SingleArticle 
                                                    upVoted={upVoted}
                                                    setUpvoted={setUpvoted}
                                                    downVoted={downVoted}
                                                    setDownvoted={setDownvoted}
                                                    voteChange={voteChange}
                                                    setVoteChange={setVoteChange}
                                                />} 
            />
            </Routes>
        </>
  )
}

export default App
