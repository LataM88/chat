import React, { useState, useEffect } from "react";
import './chat.css';

const Chat = () => {
    const [users, setUsers] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 

    //function to get users from backend
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users'); 
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data); 
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <div className="main-container">
            <div className="users">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search for users"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <ul>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((userObject, index) => (
                                <li key={index}>{userObject.displayName}</li> 
                            ))
                        ) : (
                            <li>No users found</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="chat">
                <input type="text" />
                <button type="submit">Send</button>
            </div>
        </div>
    );
};

export default Chat;