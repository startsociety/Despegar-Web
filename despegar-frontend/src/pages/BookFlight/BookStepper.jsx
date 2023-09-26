import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AddPassengers } from './AddPassengers';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';
import { flightPresenter } from '../../presenter/FlightPresenter'
import { FlightConfirm } from './FlightConfirm';
import { FlightSeatsReserve } from './FlightSeatsReserve';

const steps = ['Seleccionar asientos', '¿Quienes viajan?', 'Confirmar'];

export const BookFlightStepper = () => {
  const navigate = useNavigate();
  const { getById, bookingFlight } = flightPresenter()
  const { flightId, flightBackId } = useParams();

  const [activeStep, setActiveStep] = React.useState(0);

  const [booking, setBooking] = useState({
    "flight": null,
    "flightBack": null,
    "selectedSeating": [[]],
    "selectedSeatingBack": [[]],
    "passengers": [],
  });

  const [selectedSeating, setSelectedSeating] = useState([]);
  const [selectedSeatingBack, setSelectedSeatingBack] = useState([]);

  const passengerEmpty = {
    "name": null,
    "country": null,
    "document": null,
    "sex": null,
    "seat":  null,
    "seatBack": null
  }


  useEffect(() => {

    getById(flightId)
    .then((res) => {
      let updatedBooking = { ...booking };

      updatedBooking["flight"] = res;

      if(flightBackId != "null"){
        getById(flightBackId)
        .then((res) => {
    
          updatedBooking["flightBack"] = res;
          setBooking(updatedBooking);
        
        })
        .catch((err) => console.log(err));
      }
      setBooking(updatedBooking);
    })
    .catch((err) => console.log(err));

  }, []);

  const handleNext = () => {

    if(booking.selectedSeating.length == 0){
      alert("Se debe seleccionar 1 asiento como minimo en Ida")
      return; 
    }
    if(booking.selectedSeatingBack.length == 0){      
      alert("Se debe seleccionar 1 asiento como minimo en Vuelta")
      return; 
    }
    if(booking.selectedSeating.length != booking.selectedSeatingBack.length){
      alert("Se deben marcar la misma cantidad de asientos en la ida y vuelta")
      return; 
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    if(activeStep == 0){
      let tempPassengers = []
      const tempBooking = booking
      
      selectedSeating.forEach(element => {
        tempPassengers.push(passengerEmpty)
      });

      tempBooking.passengers = tempPassengers
      setBooking(tempBooking)
    }

    if(activeStep === steps.length - 1){
      BookingFlightConfirm()
    }
  };

  const BookingFlightConfirm = () => {
    bookingFlight(booking)
    .then((res) => {
      console.log("🚀 ~ file: BookStepper.jsx:109 ~ .then ~ res:", res)
    })
    .catch((err) => console.log(err));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const toHome = () => { navigate("/home") }

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%', marginTop: "40px"}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Se realizo la reserva correctamente
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={toHome}>
                Volver a inicio
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {
              (activeStep == 1)
              ?
              <AddPassengers booking={booking} setBooking={setBooking} />
              :
              (
                (activeStep == 2)
                ?
                <Box sx={{marginTop:"30px", alignContent:"center", justifyItems:"center"}}>
                  <FlightConfirm booking={booking} />
                </ Box>                  
                :
                  FlightSeatsReserve(flightId, booking, setBooking, selectedSeating, setSelectedSeating, flightBackId, selectedSeatingBack, setSelectedSeatingBack)
              )            
            }
            
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atras
              </Button>

              <Box sx={{ flex: '1 1 auto' }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}