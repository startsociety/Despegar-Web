import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router'

import vuelo1 from '../../assets/vuelo1.jpg'
import vuelo2 from '../../assets/vuelo2.jpg'
import vuelo3 from '../../assets/vuelo3.jpg'
import vuelo4 from '../../assets/vuelo4.png'

const Flight = (props) => {
   const {flight} = props
   const navigate = useNavigate();
   const images = [vuelo1, vuelo2, vuelo3, vuelo4]

   const toBookFlight = () => { navigate("/book-flight") }

    return (
        <Card elevation={3} sx={{ maxWidth: 345, minWidth: 345, margin: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={images[Math.floor(Math.random() * images.length)]}
                    alt="Vuelo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {`${flight.origin} a ${flight.destination}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {`$${flight.price}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary">
                Ver detalles
            </Button>
            <Button size="small" color="primary" onClick={toBookFlight}>
                Reservar
            </Button>
            </CardActions>
        </Card>
    );
  }

export default Flight;