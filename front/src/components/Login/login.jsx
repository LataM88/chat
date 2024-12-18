import React from "react";
import './login.css'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
            <h1>Welcome again</h1>
            <p>It's nice to see you again<br />Go on, talk with ur friends</p>
            <div className="login-container">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password "/>
            </div>
            <div className="login-submit">
                <p>Don't have an account?</p>
                <Link to="/register">Sign up</Link>
                <button type="submit">Login</button>
            </div>
        </div>
    )
}

export default Login;
