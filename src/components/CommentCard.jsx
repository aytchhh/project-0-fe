
function CommentCard({ comment }) {
    return (
        <div className="comment-card">
            <p>author: {comment.author}</p>
            <p>created at: {comment.created_at}</p>
            <p>{comment.body}</p>
        </div>
    )
}

export default CommentCard;