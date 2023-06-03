import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ZoneList from './ZoneList';
import 'bootstrap/dist/css/bootstrap.min.css';

function Zone() {
    // État pour stocker la liste des zones 
    const [zones, setZones] = useState([]);

    // Fonction pour récupérer la liste des zones depuis le backend 
    const fetchZones = async () => {
        try {
            await axios.get('http://localhost:8080/api/zones/all')
                .then((response) => {
                    console.log(response.data)
                    setZones(response.data)
                })
            //   setZones(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    // Effet pour charger les zones au montage du composant 
    useEffect(() => {
        fetchZones();
    }, []);

    return (
        <div>
            <h1>Liste des zones</h1>
            <ul>
                {/* Boucle pour afficher chaque zone dans la liste */}
               {zones.map(zone => (
                <li key={zone.id}>{zone.nom}</li> 
 ))}
            </ul>
        </div>
    );
};

export default Zone;