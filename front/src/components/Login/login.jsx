import React, { useState } from "react";
import './login.css'
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); // Changed to an object

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate();
        setErrors(errors); // Set errors to the validation result
        if (Object.keys(errors).length === 0) {
            alert("Done");
        }
    };

    const validate = () => {
        const error = {};

        // Email validation
        if (!email) {
            error.email = ["Email is required"];
        } else {
            if (!email.includes('@')) {
                error.email = error.email || [];
                error.email.push("Email is invalid: missing '@'.");
            }
            if (!email.split('@')[1]) {
                error.email = error.email || [];
                error.email.push("Email is invalid: missing domain after '@'.");
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                error.email = error.email || [];
                error.email.push("Email format is incorrect.");
            }
        }

        // Password validation
        if (!password) {
            error.password = ["Password is required"];
        } else {
            if (password.length < 8) {
                error.password = error.password || [];
                error.password.push("Password must be at least 8 characters long.");
            }
            if (!/[A-Z]/.test(password)) {
                error.password = error.password || [];
                error.password.push("Password must include at least one uppercase letter.");
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                error.password = error.password || [];
                error.password.push("Password must include at least one special character.");
            }
        }

        return error;
    };

    return (
        <div className="login">
            <h1>Welcome again</h1>
            <p>It's nice to see you again<br />Go on, talk with ur friends</p>
            <form onSubmit={handleSubmit}>
                <div className="login-container">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && errors.email.map((error, index) => (
                        <div key={index} className="error">{error}</div>
                    ))}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && errors.password.map((error, index) => (
                        <div key={index} className="error">{error}</div>
                    ))}
                </div>
                <div className="login-submit">
                    <p>Don't have an account?</p>
                    <Link to="/register">Sign up</Link>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
