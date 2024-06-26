import Header from './Header'
import ArticleCard from './ArticleCard'
import getArticles, { getTopics } from '../../api'
import SpinnerUI from './SpinnerUI'
import { useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import { Accordion, Nav, Navbar, Container, Row, Col } from 'react-bootstrap';

function ArticlesList({login, setLogin, showForm, setShowForm, user, setUser}) {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const topicQuery = searchParams.get('topic')
    const sortQuery = searchParams.get('sort_by')
    const orderQuery = searchParams.get('order')
    
    getTopics()
        .then((arr)=>{
        setTopics(arr.map((topic)=>topic.slug))
        })
        .catch((err)=>{window.alert(err.response.data.message)})

    useEffect(()=>{
        setIsLoading(true)
        getArticles(topicQuery, sortQuery, orderQuery)
        .then((data)=>{
            setArticles(data)
            setIsLoading(false)
        })
        .catch((err)=>{window.alert(err.response.data.message)})
    }, [topicQuery, sortQuery, orderQuery])
    
    const setCategory = (e)=>{
        const newParams = new URLSearchParams(searchParams);
        if (!e.target.value) newParams.delete('topic')
        else newParams.set('topic', e.target.value);
        setSearchParams(newParams);
    }

    const setSort = (e)=>{
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', e.target.value)
        setSearchParams(newParams);
    }

    const setOrder = (e)=>{
        const newParams = new URLSearchParams(searchParams);
        newParams.set('order', e.target.value)
        setSearchParams(newParams)
    }

    return (
        <Container fluid className="articles">

            <Row>
                <Col className='header-col'>
                <Header 
                    login={login}
                    setLogin={setLogin}
                    showForm={showForm}
                    setShowForm={setShowForm}
                    user={user}
                    setUser={setUser}
                />
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={3} className="sidebar-col">
                <div id='sidebar' className='sidebar'>
                    {/* refactor here */}
                        <div className='query-select'>
                            <label>Topic: </label>
                            <select name="topic" id="topic-select" value={topicQuery || ''} onChange={setCategory}>
                                {
                                    [<option key={0} value={''}>all</option>, ...topics.map((topic, index)=><option key={index + 1} value={topic}>{topic}</option>)]
                                }
                            </select>

                            <label>Sort By: </label>
                            <select name='sort-by' id='sort-by-select' value={sortQuery || 'created_at'} onChange={setSort}>
                                <option value={'created_at'}>Date</option>
                                <option value={'comment_count'}>Comments Count</option>
                                <option value={'votes'}>Votes</option>
                            </select>
                        
                            <label>Order: </label>
                            <select name='order' id='order-by-select' value={orderQuery || 'DESC'} onChange={setOrder}>
                                <option value={'DESC'}>High to Low</option>
                                <option value={'ASC'}>Low to High</option>
                            </select>
                        </div>
                </div>
                </Col>

                <Col md={12} lg={9} className="content-col">
                <div className="content">
                    {isLoading ? <SpinnerUI /> :
                        <ul id='contents'>
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
                </div>
                </Col>
            </Row>

        </Container>
    )
}

export default ArticlesList;