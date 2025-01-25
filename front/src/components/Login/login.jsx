import React, { useState } from "react";
import './login.css';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate();
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const userId = data.userId; 

                    localStorage.setItem("userId", userId);

                    setSuccessMessage(data.message || "Login successful!");
                    setTimeout(() => setSuccessMessage(''), 5000);
                    navigate('/Chat');
                } else {
                    const errorData = await response.json();
                    setServerError(errorData.message || "An error occurred.");
                }
            } catch (error) {
                console.error("Error during login:", error);
                setServerError("An unexpected error occurred.");
            }
        }
    };

    const validate = () => {
        const error = {};

        // Email validation
        if (!email) {
            error.email = ["Email is required"];
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = ["Invalid email format"];
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
            <p>It's nice to see you again<br />Go on, talk with your friends</p>
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
                    {serverError && <div className="error">{serverError}</div>}
                    {successMessage && <div className="success">{successMessage}</div>}
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
                     