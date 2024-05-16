import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { Navbar, Container, NavbarToggle, NavbarOffcanvas, Offcanvas} from "react-bootstrap";

function Header({login, setLogin, showForm, setShowForm, user, setUser}) {
    const [showOffCanvas, setShowOffCanvas] = useState(false)

    const handleLogout = ()=>{
        setUser({})
        setLogin(false)
    }

    return ( 
        <header id="header">
            <div className="header-wrapper">
                <Navbar expand="lg" className="nav">
                    <Container fluid>
                    <NavbarToggle aria-controls="offcanvasNavbar-expand-lg"/>
                    <NavbarOffcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="start" scroll={true}>
                        <p>to be added...</p>
                    </NavbarOffcanvas>
                    </Container>
                </Navbar>

                <Link to="/"><h1>NC News</h1></Link>
                {
                    login ? 
                    <>
                        <div className="avatar">
                            <img src={user.avatar_url} className="avatar" alt={user.username} onClick={()=>setShowOffCanvas(true)}/>
                        </div>

                        <Offcanvas show={showOffCanvas} onHide={()=>setShowOffCanvas(false)} placement="end" scroll={true} className="profile-canvas">
                            <img src={user.avatar_url} className="profile-avatar"/>
                            <p className="username">{user.username}</p>
                            <p>to be added...</p>
                            <hr/>
                            <button className="logout-trigger" onClick={handleLogout}>Log out</button>
                        </Offcanvas>
                    </>


                    : <>
                        <button onClick={()=>setShowForm(true)} className="login-trigger">Log In</button>
                        <LoginForm login={login} setLogin={setLogin} showForm={showForm} setShowForm={setShowForm} user={user} setUser={setUser}/>
                    </>
                }
            </div>
        </header>
    )
}

export default Header;