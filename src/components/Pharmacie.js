import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pharmaciesList from './PharmacieList';
import 'bootstrap/dist/css/bootstrap.min.css';

function pharmacies() {
    // État pour stocker la liste des pharmacies 
    const [pharmacies, setpharmacies] = useState([]);

    // Fonction pour récupérer la liste des pharmacies depuis le backend 
    const fetchpharmacies = async () => {
        try {
            await axios.get('http://localhost:8080/api/pharmacies/all')
                .then((response) => {
                    console.log(response.data)
                    setpharmacies(response.data)
                })
            //   setpharmacies(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    // Effet pour charger les pharmacies au montage du composant 
    useEffect(() => {
        fetchpharmacies();
    }, []);

    return (
        <div>
            <h1>Liste des pharmacies</h1>
            <ul>
                {/* Boucle pour afficher chaque pharmacies dans la liste */}
               {pharmacies.map(pharmacies => (
                <li key={pharmacies.id}>{pharmacies.nom}</li> 
 ))}
            </ul>
        </div>
    );
};

export default pharmacies;