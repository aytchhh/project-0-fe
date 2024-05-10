import ArticlesList from './components/ArticlesList'
import SingleArticle from './components/SingleArticle'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const [upVoted, setUpvoted] = useState(false)
    const [downVoted, setDownvoted] = useState(false)
    const [login, setLogin] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [user, setUser] = useState({})

    return (
        <>
            <Routes>
            <Route path='/' element={ <ArticlesList 
                                        login={login}
                                        setLogin={setLogin}
                                        showForm={showForm}
                                        setShowForm={setShowForm}
                                        user={user}
                                        setUser={setUser}
                                    />} 
            />
            <Route path='/:article_id' element={ <SingleArticle 
                                                    upVoted={upVoted}
                                                    setUpvoted={setUpvoted}
                                                    downVoted={downVoted}
                                                    setDownvoted={setDownvoted}
                                                    login={login}
                                                    setLogin={setLogin}
                                                    showForm={showForm}
                                                    setShowForm={setShowForm}
                                                    user={user}
                                                    setUser={setUser}
                                                />} 
            />
            </Routes>
        </>
  )
}

export default App
