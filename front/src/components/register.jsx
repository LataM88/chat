import React, { useState } from "react";
import './register.css';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate();

        if (Object.keys(errors).length === 0) {
            try {
                console.log("Request body:", {
                    email,
                    password,
                    name: name + ' ' + last,
                });

                const response = await fetch('http://localhost:8080/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        name: name + ' ' + last,
                    }),
                });

                if (response.ok) {
                    setSuccessMessage("Registration successful!<br>Login in 3 sec");
                    setTimeout(() => {
                        navigate('/Login');  
                    }, 3000)
                     
                } else {
                    const errorText = await response.text();
                    console.error("Server error:", errorText);
                    setErrors({ firebase: [errorText] });
                    setTimeout(() => setErrors({ firebase: [] }), 5000);  
                }
            } catch (error) {
                console.error("Error during registration:", error);
                setErrors({ firebase: [error.message] });
                setTimeout(() => setErrors({ firebase: [] }), 5000);  
            }
        } else {
            setErrors(errors);
        }
    };

    const validate = () => {
        const error = {};

        // Name validation
        if (!name) {
            error.name = ["Name is required"];
        }

        // Last name validation
        if (name && !last) {
            error.last = ["Last name is required"];
        }

        // Email validation
        if (name && last && !email) {
            error.email = ["Email is required"];
        }

        // Password validation
        if (name && last && email && !password) {
            error.password = ["Password is required"];
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
                    {errors.firebase && errors.firebase.map((error, index) => (
                        <div key={index} className="errors-firebase">{error}</div>
                    ))}
                    {successMessage && (
                        <div
                            className="success"
                            dangerouslySetInnerHTML={{ __html: successMessage }}
                        ></div>
                    )}
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
