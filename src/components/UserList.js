import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

 
const UserList = () => { 
    const [Users, setUsers] = useState([]);
    const [UserName, setUserName] = useState('');
    const [UserId, setUserId] = useState('');

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:9090/api/users/all');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const getUserById = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:9090/api/users/${id}`);
            setUserId(response.data.id);
            setUserName(response.data.name);
        } catch (error) {
            console.error(error);
        }
    };
    const addUser = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:9090/api/users/save', { nom: UserName });
            setUsers([...Users, response.data]);
            setUserName('');
        } catch (error) {
            console.error(error);
        }
    };
    const updateUser = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:9090/api/users/update/${UserId}`, { nom: UserName });
            const updatedUsers = Users.map((User) => {
                if (User.id === response.data.id) {
                    return response.data;
                }
                return User;
            });
            setUsers(updatedUsers);
            setUserId('');
            setUserName('');
        } catch (error) {
            console.error(error);
        }
    };
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:9090/api/users/delete/${id}`);
            const updatedUsers = Users.filter((User) => User.id !== id);
            setUsers(updatedUsers);
        } catch (error) {
            console.error(error);
        }
    }
 return ( 
<div className="container mt-4">
        <h1>users</h1>
        <table className="table mt-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom utilisateur</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {Users.map((User, index) => (
                    <tr key={User.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{User.nom}</td>
                        <td>
                            <button className="btn btn-primary btn-sm mx-1" onClick={() =>
                                getUserById(User.id)}>
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() =>
                                deleteUser(User.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="mt-3">
            <input
                type="text"
                className="form-control mr-2 d-inline-block"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
            />
            {UserId ? (
                <button className="btn btn-success" onClick={updateUser}>
                    Update User
                </button>
            ) : (
                <button className="btn btn-primary" onClick={addUser}>
                    Add User
                </button>
            )}
        </div>
    </div>
 ); 
}; 
 
export default UserList; 