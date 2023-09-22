import React, {useEffect} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { PassengerCard } from "./PassengerCard";

export const AddPassengers = (props) => {
  const { booking, setBooking } = props;

  const setPassenger = (value, index) => {
      const updatedBooking = { ...booking };

      updatedBooking.passengers[index] = value;
      setBooking(updatedBooking);
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
      <h2>Completar información de pasajeros:</h2>
      <Grid container rowSpacing={1}>
          {
              booking.passengers.map((passenger, index) => (
                  <PassengerCard
                      key={index}
                      booking={booking}
                      passenger={passenger}
                      setPassenger={(event) => setPassenger(event, index)}
                      indexPassenger={index}
                  />
              ))
          }
      </Grid>
  </Box>
  );

}
