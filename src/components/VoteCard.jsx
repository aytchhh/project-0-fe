import { useState } from "react"
import { patchArticleById } from "../../api"
import LoginForm from "./LoginForm"
import { Alert } from "react-bootstrap"

function VoteCard({article, upVoted, setUpvoted, downVoted, setDownvoted, login, setLogin, showForm, setShowForm, user, setUser}) {
    const [voteCount, setVoteCount] = useState(article.votes)
    const [error, setError] = useState(null)

    const handleVote = (vote)=>{
        if (!login) setShowForm(true)
        else {
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
    
            patchArticleById(article.article_id, newVote)
                .then((data)=>{
                    setVoteCount(data.votes)
                })
                .catch((err)=>{
                    setError(err)
                    setVoteCount(article.votes);
                    setUpvoted(false)
                    setDownvoted(false)
                })
        }
    }

    return (
        <span className='vote-span'>
            {showForm && <LoginForm 
                            login={login}
                            setLogin={setLogin}
                            user={user}
                            setUser={setUser}
                            showForm={true}
                            setShowForm={setShowForm}
            />}
            <button className= {upVoted ? "up-voted" : "up-button"} onClick={()=>handleVote(1)}>&#x25B2;</button>
            <p>{voteCount < 0 ? 0 : voteCount } {' '}
                {voteCount === 1 ? "vote" : "votes"}
            </p>
            <button className= {downVoted ? "down-voted" : "down-button"} onClick={()=>handleVote(-1)} disabled={!downVoted && article.votes === 0}>&#x25BC;</button>
        </span>
        // error message to be added
    )
}

export default VoteCard;