import { useState } from "react";
import { deleteCommentById } from "../../api";

function CommentCard({ comment, user, updateComments }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const handleDelete = (()=>{
        if(window.confirm('Delete this comment?')){
            setIsDeleting(true)
            deleteCommentById(comment.comment_id)
                .then(()=>{
                    updateComments(comment.comment_id)
                    setTimeout(() => {
                        window.alert("Comment deleted!")
                    }, 400);
                })
                .catch((err)=>{
                    setIsDeleting(false)
                    window.alert(err.response.data.message)
                })
        }
    })

    return (
        <div className="comment-card">
            <p>author: {comment.author}</p>
            {/* to be refactored 👇*/}
            <p>created at: {comment.created_at}</p>
            <p>{comment.body}</p>
            {
                (comment.author===user.username) &&
                <button className="delete-comment-button" onClick={handleDelete} disabled={isDeleting}>&#215;</button>
            }
        </div>
    )
}

export default CommentCard;