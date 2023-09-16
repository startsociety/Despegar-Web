import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Stack } from '@mui/material';
import { useNavigate } from 'react-router'

import vuelo1 from '../../assets/vuelo1.jpg'
import vuelo2 from '../../assets/vuelo2.jpg'
import vuelo3 from '../../assets/vuelo3.jpg'
import vuelo4 from '../../assets/vuelo4.png'
import { FlightDetails } from "./FightDetails";

const Flight = (props) => {
   const {flight} = props
   const navigate = useNavigate();
   const images = [vuelo1, vuelo2, vuelo3, vuelo4]

    return (
        <Card elevation={3} sx={{ maxWidth: 245, minWidth: 245, margin: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={images[Math.floor(Math.random() * images.length)]}
                alt="Vuelo"
            />
            <CardContent>
                <Stack >
                    <Typography sx={{justifySelf:'center'}} gutterBottom variant="h6" component="div">
                    {`${flight.origin.city} a ${flight.destination.city}`}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                    {`Desde $${flight.price * 2}`}
                    </Typography>
                    <Typography marginTop={"10px"} variant="body2" color="text.secondary">
                    {`El ${flight.departure_datetime}`}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions sx={{justifyContent:'center', alignContent:'end'}}>
                <FlightDetails idFlightIda={flight.id} idFlightVuelta={flight.id}/>
            </CardActions>
        </Card>
    );
  }

export default Flight;