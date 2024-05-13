import { Link } from 'react-router-dom'

function ArticleCard({ article }) {

    return (
        <div className="article-card">
            <Link to={`/${article.article_id}`}>
                <h2>{article.title}</h2>
            </Link>
            <p>author: {article.author}</p>
            {/* to be refactored 👇 */} 
            <p>created at: {article.created_at}</p>
            <Link to={`/${article.article_id}`}>
                <img src={article.article_img_url max-width}/>
            </Link>
            <br/>
            <p>{article.votes} votes</p>
            <p>{article.comment_count} comments</p>
        </div>
    )
}

export default ArticleCard;