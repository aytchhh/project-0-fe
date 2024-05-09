import Header from './Header';
import CommentCard from './CommentCard'
import VoteCard from './VoteCard';
import SpinnerUI from './SpinnerUI';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getArticleById, getCommentsById } from '../../api'

function SingleArticle({upVoted, setUpvoted, downVoted, setDownvoted, voteChange, setVoteChange}) {
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
    }, [article_id])

    return (
        <>
            <Header />
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
                            voteChange={voteChange}
                            setVoteChange={setVoteChange}
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
                </>
            }
        </>
    )
}

export default SingleArticle;