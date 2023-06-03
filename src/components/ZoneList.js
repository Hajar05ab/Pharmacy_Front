import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ZoneList = () => {
    const [zones, setZones] = useState([]);
    const [ZoneName, setZoneName] = useState('');
    const [ZoneId, setZoneId] = useState('');

    useEffect(() => {
        getZones();
    }, []);

    const getZones = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:9090/api/zones/all');
            setZones(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const getZoneById = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:9090/api/zones/${id}`);
            setZoneId(response.data.id);
            setZoneName(response.data.name);
        } catch (error) {
            console.error(error);
        }
    };
    const addZone = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:9090/api/zones/save', { nom: ZoneName });
            setZones([...zones, response.data]);
            setZoneName('');
        } catch (error) {
            console.error(error);
        }
    };
    const updateZone = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:9090/api/zones/update/${ZoneId}`, { nom: ZoneName });
            const updatedZones = zones.map((Zone) => {
                if (Zone.id === response.data.id) {
                    return response.data;
                }
                return Zone;
            });
            setZones(updatedZones);
            setZoneId('');
            setZoneName('');
        } catch (error) {
            console.error(error);
        }
    };
    const deleteZone = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:9090/api/zones/delete/${id}`);
            const updatedZones = zones.filter((Zone) => Zone.id !== id);
            setZones(updatedZones);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="container mt-4">
            <h1>Zones</h1>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom Zones</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map((Zone, index) => (
                        <tr key={Zone.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{Zone.nom}</td>
                            <td>
                                <button className="btn btn-primary btn-sm mx-1" onClick={() =>
                                    getZoneById(Zone.id)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() =>
                                    deleteZone(Zone.id)}>
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
                    value={ZoneName}
                    onChange={(e) => setZoneName(e.target.value)}
                />
                {ZoneId ? (
                    <button className="btn btn-success" onClick={updateZone}>
                        Update Zone
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={addZone}>
                        Add Zone
                    </button>
                )}
            </div>
        </div>
    );
};

export default ZoneList; 