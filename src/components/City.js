import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityList from './CityList';
import 'bootstrap/dist/css/bootstrap.min.css';

function City() {
    // État pour stocker la liste des cities 
    const [cities, setCities] = useState([]);

    // Fonction pour récupérer la liste des cities depuis le backend 
    const fetchCities = async () => {
        try {
            await axios.get('http://localhost:8080/api/villes/all')
                .then((response) => {
                    console.log(response.data)
                    setCities(response.data)
                })
            //   setCities(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    // Effet pour charger les cities au montage du composant 
    useEffect(() => {
        fetchCities();
    }, []);

    return (
        <div>
            <h1>Liste des cities</h1>
            <ul>
                {/* Boucle pour afficher chaque city dans la liste */}
               {villes.map(city => (
                <li key={city.id}>{city.nom}</li> 
 ))}
            </ul>
        </div>
    );
};

export default City;