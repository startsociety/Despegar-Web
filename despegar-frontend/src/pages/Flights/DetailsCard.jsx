import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const arrow = (
  <Box
    component="span"
    sx={{ alignSelf:'flex-end', justifySelf:'end', display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    <ArrowForwardIcon/> 
  </Box>
);

export const DetailsCard = (props) => {

 const {flight, title} = props
 const [date, hour] = flight.arrival_datetime ? flight.arrival_datetime.split(" ") : "";
 const [date_departure, hour_departure] =flight.departure_datetime ? flight.departure_datetime.split(" ") : "";

 useEffect(() => {
    console.log("flight DetailsCard=>", flight)
    
  }, []);

  return (
    <Box sx={{ minWidth: 275, marginTop:1 }}>
      <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" component="h2">
                {`${title}: ${flight.origin}`} {arrow} {`  ${flight.destination}`}
            </Typography>
            
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {`Origen: Aeropuerto de ${flight.origin}`} 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {`Fecha: El ${date} a las ${hour}`} 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, alignSelf:'center' }}>
                {`- Duracion ${flight.flight_time} -`} 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {`Destino: Aeropuerto de ${flight.destination}`} 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {`Fecha: El ${date_departure} a las ${hour_departure}`} 
            </Typography>
        </CardContent>
        <CardActions>       
        </CardActions>
      </Card>
    </Box>
  );
}