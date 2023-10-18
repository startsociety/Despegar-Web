import React, {useState, useEffect} from "react";
import { Grid, Box } from "@mui/material";
import { PassengerCard } from "./PassengerCard";

export const AddPassengers = (props) => {
  const { booking, setBooking } = props;

    const [availableSeats, setAvailableSeats] = useState([...booking.availableSeats]);
    const [availableSeatsBack, setAvailableSeatsBack] = useState([...booking.availableSeatsBack]);
    const setPassenger = (value, index) => {
      const updatedBooking = { ...booking };

      updatedBooking.passengers[index] = value;
      setBooking(updatedBooking);
    }

    const setSelectedSeatingBack = (value, index) => {
        const updatedBooking = { ...booking };
  
        updatedBooking.availableSeatsBack = value;
        setBooking(updatedBooking);
      }

      const setSelectedSeating = (value, index) => {
        const updatedBooking = { ...booking };
  
        updatedBooking.availableSeats = value;
        setBooking(updatedBooking);
      }

    useEffect(() => {
        setSelectedSeating([...availableSeats]);
    }, [availableSeats]);

    useEffect(() => {
        setSelectedSeatingBack([...availableSeatsBack]);
    }, [availableSeatsBack]);

    const handleChangeSeating = (value, passenger, index) => {
        let avaibleSeatsTemp = availableSeats
        avaibleSeatsTemp = avaibleSeatsTemp.filter(seat => seat !== value);

        let passengerTemp = { ...passenger }

        if( passengerTemp["seat"]){
            avaibleSeatsTemp =  [...avaibleSeatsTemp, passengerTemp["seat"]]
        }

        passengerTemp["seat"] = value.toString()
        setAvailableSeats(avaibleSeatsTemp)
        setPassenger(passengerTemp, index)
    }

    const handleChangeSeatingBack = (value, passenger, index) => {
        let avaibleSeatsTemp = availableSeatsBack
        avaibleSeatsTemp = avaibleSeatsTemp.filter(seat => seat !== value);

        let passengerTemp = { ...passenger }

        if( passengerTemp["seatBack"]){
            avaibleSeatsTemp =  [...avaibleSeatsTemp, passengerTemp["seatBack"]]
        }

        passengerTemp["seatBack"] = value.toString()
        setAvailableSeatsBack(avaibleSeatsTemp)
        setPassenger(passengerTemp, index)
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
                        keyPassenger={index}
                        availableSeats={availableSeats}
                        setAvailableSeats={setAvailableSeats}
                        availableSeatsBack={availableSeatsBack}
                        setAvailableSeatsBack={setAvailableSeatsBack}
                        booking={booking}
                        handleChangeSeating={handleChangeSeating}
                        handleChangeSeatingBack={handleChangeSeatingBack}
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
