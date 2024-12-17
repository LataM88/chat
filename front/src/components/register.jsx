import React from "react";
import './register.css'

const Register = () => {
    return (
        <div className="register">
            <h1>Welcome to our chat</h1>
            <p>Wanna talk with some of ur friends?<br />Let's start</p>
            <div className="register-container">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Last name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password "/>
            </div>
            <div className="register-submit">
                <p>Already have an account?<br/>Log In</p>
                <button type="submit">Sign up</button>
            </div>
        </div>
    )
}

export default Register;