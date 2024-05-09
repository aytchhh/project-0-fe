import { useState } from "react"
import { patchArticleById } from "../../api"

function VoteCard({article, upVoted, setUpvoted, downVoted, setDownvoted, voteChange, setVoteChange}) {

    const handleVote = (vote)=>{
        if (vote === 1) {
            setUpvoted((currUpvoted)=>!currUpvoted)
            setDownvoted(false)
        } else {
            setUpvoted(false)
            setDownvoted((currDownvoted)=>!currDownvoted)
        }

        let newVote = 0 
        if (upVoted && vote === 1) newVote = -1
        else if (downVoted && vote === -1) newVote = 1
        else if (upVoted && vote === -1) newVote = -2
        else if (downVoted && vote === 1) newVote = 2
        else newVote = vote

        const displayVote = (upVoted && vote === 1) ? 0 : (downVoted && vote === -1) ? 0 : vote 
        setVoteChange(displayVote)
        patchArticleById(article.article_id, newVote)
    }

    return (
        <span className='vote-span'>
            <button className= {upVoted ? "up-voted" : "up-button"} onClick={()=>handleVote(1)}>&#x25B2;</button>
            <p>{article.votes + voteChange < 0 ? 0 : article.votes + voteChange} {article.votes + voteChange === 1 ? "vote" : "votes"}</p>
            <button className= {downVoted ? "down-voted" : "down-button"} onClick={()=>handleVote(-1)} disabled={!downVoted && article.votes === 0}>&#x25BC;</button>
        </span>
    )
}

export default VoteCard;