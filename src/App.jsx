import ArticlesList from './components/ArticlesList'
import SingleArticle from './components/SingleArticle'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<ArticlesList />} />
      </Routes>
    </>
  )
}

export default App
