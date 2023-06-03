import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function User() {
    // State to store the list of users
    const [users, setUsers] = useState([]);

    // Function to fetch the list of users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/all');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Effect to load the users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {/* Loop to display each user in the list */}
                {users.map(users => (
                    <li key={users.id}>{users.nom}</li>
                ))}
            </ul>
        </div>
    );
}

export default User;
