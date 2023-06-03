import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img1 from "../img/phar.jpg";

export default function Accueil() {
const [ph, setPh]= useState(null)


const getCities = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:9090/api/pharmacies/all');
        setPh(response.data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
useEffect(() => {
    getCities();
}, []);



  return (
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
{ ph?.map((row)=>(
  <Card sx={{ width: 345, height: 400, margin: '10px' }}>
  <CardMedia
    sx={{ height: 140 }}
    image={img1}
    title="green iguana"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
     {row.nom}
    </Typography>
    <Typography variant="body2" color="text.secondary">
    {row.adresse}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Consulter</Button>
  </CardActions>
</Card>
))}
    </div>
  )
}
