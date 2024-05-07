import { Link } from "react-router-dom";

function Header() {
    return ( 
        <header>
            <p>nav</p>
            <Link to="/"><h1>NC News</h1></Link>
            <button className="login">Log In</button>
        </header>
    )
}

export default Header;