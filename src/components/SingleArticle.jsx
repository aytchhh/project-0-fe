import Header from './Header';
import CommentCard from './CommentCard'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getArticleById, getCommentsById } from '../../api'
import { BounceLoader } from 'react-spinners';

function SingleArticle() {
    const { article_id } = useParams()
    const [articleLoading, setArticleLoading] = useState(true)
    const [commentsLoading, setCommentsLoading] = useState(true)
    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([])


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
    }, [])


    return (
        <>
            <Header />
            {
                articleLoading || commentsLoading ? 
                <BounceLoader 
                    color='#36d7b7'
                    cssOverride={{margin: "30vh auto"}} 
                /> :

                <>
                    <article className='single-article'>
                        <h2>{article.title}</h2>
                        <img src={article.article_img_url}/>
                        <p>{article.body}</p>
                        <span className='vote-span'>
                            <button className="up-button">&#x25B2;</button>
                            <p>{article.votes} votes</p>
                            <button className="down-button">&#x25BC;</button>
                        </span>
                        <p>{article.comment_count} comments</p>
                    </article>

                    <section className='article-comments'>
                        {
                            comments.map((comment)=>{
                                return <CommentCard key={comment.comment_id} comment={comment}/>
                            })
                        }
                    </section>
                </>
            }
        </>
    )
}

export default SingleArticle;