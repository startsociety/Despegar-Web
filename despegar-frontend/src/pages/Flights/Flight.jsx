import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Stack } from '@mui/material';
import { FlightDetails } from "./FightDetails";

const Flight = (props) => {
   const {flight} = props

    return (
        <Card elevation={3} sx={{ maxWidth: 245, minWidth: 245, margin: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={flight.destination.image}
                alt="Vuelo"
            />
            <CardContent>
                <Stack>
                    <Typography sx={{justifySelf:'center'}} gutterBottom variant="h6" component="div">
                    {`${flight.origin.city} a ${flight.destination.city}`}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                    {`Desde $${flight.price}`}
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