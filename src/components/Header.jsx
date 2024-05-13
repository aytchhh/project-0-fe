import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { Offcanvas, OffcanvasHeader } from "react-bootstrap";

function Header({login, setLogin, showForm, setShowForm, user, setUser}) {
    const [showOffCanvas, setShowOffCanvas] = useState(false)

    return ( 
        <header>
            <p>nav?</p>
            <Link to="/"><h1>NC News</h1></Link>
            {
                login ? 
                <>
                    <div className="username-avatar">
                        <img src={user.avatar_url} className="avatar" alt={user.username} onClick={()=>setShowOffCanvas(true)}/>
                    </div>

                    <Offcanvas show={showOffCanvas} onHide={()=>setShowOffCanvas(false)} placement="end" scroll={true}>
                        <OffcanvasHeader closeButton>
                            to be added...
                        </OffcanvasHeader>
                        <button className="Logout-trigger" onClick={()=>{setLogin(false)}}>Log Out</button>
                    </Offcanvas>
                </>


                : <>
                    <button onClick={()=>setShowForm(true)} className="login-trigger">Log In</button>
                    <LoginForm login={login} setLogin={setLogin} showForm={showForm} setShowForm={setShowForm} user={user} setUser={setUser}/>
                </>
                
            }
        </header>
    )
}

export default Header;