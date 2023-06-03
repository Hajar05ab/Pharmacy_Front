import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

 
const PharmacieList = () => { 
    const [pharmacies, setPharmacies] = useState([]);
    const [PharmacieName, setPharmacieName] = useState('');
    const [PharmacieId, setPharmacieId] = useState('');

    useEffect(() => {
        getPharmacies();
    }, []);

    const getPharmacies = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:9090/api/pharmacies/all');
            setPharmacies(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const getPharmacieById = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:9090/api/pharmacies/${id}`);
            setPharmacieId(response.data.id);
            setPharmacieName(response.data.name);
        } catch (error) {
            console.error(error);
        }
    };
    const addPharmacie = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:9090/api/pharmacies/save', { nom: PharmacieName });
            setPharmacies([...pharmacies, response.data]);
            setPharmacieName('');
        } catch (error) {
            console.error(error);
        }
    };
    const updatePharmacie = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:9090/api/pharmacies/update/${PharmacieId}`, { nom: PharmacieName });
            const updatedPharmacies = pharmacies.map((Pharmacie) => {
                if (Pharmacie.id === response.data.id) {
                    return response.data;
                }
                return Pharmacie;
            });
            setPharmacies(updatedPharmacies);
            setPharmacieId('');
            setPharmacieName('');
        } catch (error) {
            console.error(error);
        }
    };
    const deletePharmacie = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:9090/api/villes/delete/${id}`);
            const updatedPharmacies = pharmacies.filter((Pharmacie) => Pharmacie.id !== id);
            setPharmacies(updatedPharmacies);
        } catch (error) {
            console.error(error);
        }
    }
 return ( 
<div className="container mt-4">
        <h1>Pharmacies</h1>
        <table className="table mt-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom Pharmacies</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {pharmacies.map((Pharmacie, index) => (
                    <tr key={Pharmacie.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{Pharmacie.nom}</td>
                        <td>
                            <button className="btn btn-primary btn-sm mx-1" onClick={() =>
                                getPharmacieById(Pharmacie.id)}>
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() =>
                                deletePharmacie(Pharmacie.id)}>
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
                value={PharmacieName}
                onChange={(e) => setPharmacieName(e.target.value)}
            />
            {PharmacieId ? (
                <button className="btn btn-success" onClick={updatePharmacie}>
                    Update Pharmacie
                </button>
            ) : (
                <button className="btn btn-primary" onClick={addPharmacie}>
                    Add Pharmacie
                </button>
            )}
        </div>
    </div>
 ); 
}; 
 
export default PharmacieList; 