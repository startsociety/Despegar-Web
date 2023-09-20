import React, {useEffect} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { PassengerCard } from "./PassengerCard";

export const AddPassengers = (props) => {
    const {booking, setBooking } = props
    const [country, setCountry] = React.useState('');
  
    const handleChange = (event) => {
      setCountry(event.target.value);
    }

    const newPassenger = () => {
      return booking.passengers.push({
        "dni":"",
        "firstname": "",
        "lastname": ""
      })       
    }

    return(
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
        >
        <h5>Asientos selectionados ida:</h5>
          {booking.selectedSeating.map((position) => (
          <body2>{position} </body2>
          
        ))}
        <h5>Asientos selectionados vuelta:</h5>
          {booking.selectedSeatingBack.map((position) => (
          <body2>{position} </body2>
          
        ))}
      <Grid container rowSpacing={1} >
      {
        booking.passengers.map((seating, columnIndex) => (
            <PassengerCard booking={booking} passenger={newPassenger} />
        ))
      }
        </Grid>        
    </Box>
  );

}
