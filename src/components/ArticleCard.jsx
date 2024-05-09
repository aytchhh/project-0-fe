import VoteCard from "./VoteCard";
import { Link } from 'react-router-dom'

function ArticleCard({ article, upVoted, setUpvoted, downVoted, setDownvoted, voteChange, setVoteChange}) {

    return (
        <div className="article-card">
            <Link to={`/${article.article_id}`}>
                <h2>{article.title}</h2>
            </Link>
            <p>author: {article.author}</p>
            {/* to be refactored 👇 */} 
            <p>created at: {article.created_at}</p>
            <Link to={`/${article.article_id}`}>
                <img src={article.article_img_url}/>
            </Link>
            <br/>
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
        </div>
    )
}

export default ArticleCard;