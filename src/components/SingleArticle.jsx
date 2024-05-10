import Header from './Header';
import CommentCard from './CommentCard'
import VoteCard from './VoteCard';
import SpinnerUI from './SpinnerUI';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getArticleById, getCommentsById, postCommentByArticleId } from '../../api'
import { Form, FormGroup, FormControl, Button} from 'react-bootstrap'
import LoginForm from './LoginForm';

function SingleArticle({upVoted, setUpvoted, downVoted, setDownvoted, login, setLogin, showForm, setShowForm, user, setUser}) {
    const { article_id } = useParams()
    const [articleLoading, setArticleLoading] = useState(true)
    const [commentsLoading, setCommentsLoading] = useState(true)
    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([])
    const [commentBody, setCommentBody] = useState('')
    const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(true)

    useEffect(()=>{
        setArticleLoading(true)
        setCommentsLoading(true)

        getArticleById(article_id)
            .then((data)=>{
                setArticle(data)
                setArticleLoading(false)
            })
            .catch((err)=>{console.log(err)})
        
        getCommentsById(article_id)
            .then((data)=>{
                setComments(data)
                setCommentsLoading(false)
            })
            .catch((err)=>{console.log(err)})
    }, [article_id])

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!login) {setShowForm(true)}
        else {
            postCommentByArticleId(article_id, user.username, commentBody)
                .then((data)=>{
                    setCommentBody('')
                    setComments([...comments, data])
                
                })
                .catch((err)=>{
                    console.log(err)
                    setError(err)
                })
                
        }
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
            {
                articleLoading || commentsLoading ? <SpinnerUI /> :
                <>
                    <article className='single-article'>
                        <h2>{article.title}</h2>
                        <img src={article.article_img_url}/>
                        <p>{article.body}</p>
                        <VoteCard
                            article={article} 
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
                        />
                        <p>{article.comment_count} comments</p>
                    </article>

                    <section className='article-comments'>
                        {
                            comments.map((comment)=>{
                                return <CommentCard key={comment.comment_id} comment={comment}/>
                            })
                        }
                    </section>

                    <Form onSubmit={handleSubmit} className='comment-box'>
                        <FormGroup className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <FormControl as="textarea" placeholder="Add a comment" rows={3} value={commentBody} onChange={(e)=>{setCommentBody(e.target.value)}}/>
                        </FormGroup>
                            <div className="d-flex justify-content-end">
                                <Button type="submit" className='post-button' disabled={!commentBody}>Post</Button>
                            </div>
                    </Form>

                    {showForm && <LoginForm 
                        login={login}
                        setLogin={setLogin}
                        user={user}
                        setUser={setUser}
                        showForm={true}
                        setShowForm={setShowForm}
                    />}

                    {
                        error ? <p>{error.response.data.message}</p> : null
                    }
                </>
            }
        </>
    )
}

export default SingleArticle;