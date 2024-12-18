import React from "react";
import './home.css'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to our website!</h1>
            <p>If you're looking for a easy way to chat online, you've come to the right place!<br/> Our chat application is perfect for new users.<br/>Those who already use it they know it's great.</p>
            <p>For new users – we warmly invite you to sign up and start chatting in no time!<br/> It's quick, easy, and will give you full access to all the app's features</p>
            <p>If you're already with us – don't wait any longer<br/> Log in now to continue chatting with friends, family, or colleagues.</p>
            <p>Join our community and enjoy seamless communication!</p>
            <div className="home-links">
                <Link to ='/login'>Log in</Link>
                <Link to ='/register'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Home;