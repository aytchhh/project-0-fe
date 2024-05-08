
function ArticleCard({ article }) {

    return (
        <div className="article-card">
            <h2>{article.title}</h2>
            <p>author: {article.author}</p>
            <p>created at: {article.created_at}</p>
            <img src={article.article_img_url}/>
            <br/>
            <span className="vote-span">
                <button className="up-button">&#x25B2;</button>
                <p>{article.votes} votes</p>
                <button className="down-button">&#x25BC;</button>
            </span>
            <p>{article.comment_count} comments</p>
        </div>
    )
}

export default ArticleCard;