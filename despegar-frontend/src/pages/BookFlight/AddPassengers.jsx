import React from "react";
import { Grid, Box } from "@mui/material";
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
        <Box sx={{color:'purple', marginLeft: "25px"}}>
            <h1 style={{ fontFamily: 'sans-serif',fontWeight: 700, letterSpacing: 3, color: 'purple'}}>
                Completar información de pasajeros:
            </h1>
        </Box>
        <Grid container sx={{justifyContent:'center'}}>
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
