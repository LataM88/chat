import React, { useState } from "react";
import './register.css'
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate();
        
        if (Object.keys(errors).length === 0) {
            alert("Done");
        } else {
            setErrors(errors);
        }
    };

    const validate = () => {
        const error = {};
    
        // Last name validation
        if (!last) {
            error.last = ["Last name is required"];
        } else {
            const capitalizedLastName = last.charAt(0).toUpperCase() + last.slice(1);
            if (last !== capitalizedLastName) {
                error.last = error.last || [];
                error.last.push("The first letter must be uppercase");
            }
            if (last.length < 2) {
                error.last = error.last || [];
                error.last.push("The last name must consist of at least two letters.");
            }
        }
    
        // Name validation
        if (!name) {
            error.name = ["Name is required"];
        } else {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            if (name !== capitalizedName) {
                error.name = error.name || [];
                error.name.push("The first letter must be uppercase");
            }
            if (name.length < 2) {
                error.name = error.name || [];
                error.name.push("The name must consist of at least two letters.");
            }
        }
    
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
        <div className="register">
            <h1>Welcome to our chat</h1>
            <p>Wanna talk with some of ur friends?<br />Let's start</p>
            <form onSubmit={handleSubmit}>
                <div className="register-container">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && errors.name.map((error, index) => (
                        <div key={index} className="errors">{error}</div>
                    ))}
                    <input
                        type="text"
                        placeholder="Last name"
                        value={last}
                        onChange={(e) => setLast(e.target.value)}
                    />
                    {errors.last && errors.last.map((error, index) => (
                        <div key={index} className="errors">{error}</div>
                    ))}
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && errors.email.map((error, index) => (
                        <div key={index} className="errors">{error}</div>
                    ))}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && errors.password.map((error, index) => (
                        <div key={index} className="errors">{error}</div>
                    ))}
                </div>
                <div className="register-submit">
                    <p>Already have an account?</p>
                    <Link to="/login">Log In</Link>
                    <button type="submit">Sign up</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
