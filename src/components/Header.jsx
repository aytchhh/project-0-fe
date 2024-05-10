import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function Header({login, setLogin, showForm, setShowForm, user, setUser}) {

    return ( 
        <header>
            <p>nav</p>
            <Link to="/"><h1>NC News</h1></Link>
            {
                login ? 
                <div className="username-avatar">
                    <p>{user.username}</p>
                    <img src={user.avatar_url} className="avatar" alt={user.username}/>
                </div>

                : <>
                    <button onClick={()=>setShowForm(true)} className="login-trigger">Log In</button>
                    <LoginForm login={login} setLogin={setLogin} showForm={showForm} setShowForm={setShowForm} user={user} setUser={setUser}/>
                </>
                
            }
        </header>
    )
}

export default Header;