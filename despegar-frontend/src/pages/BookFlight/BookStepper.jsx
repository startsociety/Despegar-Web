import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AddPassengers } from './AddPassengers';
import { Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';
import { flightPresenter } from '../../presenter/FlightPresenter'
import { FlightConfirm } from './FlightConfirm';
import { BookFlight } from './BookFlight';

const steps = ['Seleccionar asientos', '¿Quienes viajan?', 'Confirmar'];

const STEPS_ID = {
  "seats": 0,
  "passengers":1,
  "confirm": 2,
}

export const BookFlightStepper = () => {
  const navigate = useNavigate();
  const { getById, bookingFlight } = flightPresenter()
  const { flightId, flightBackId } = useParams();

  const [activeStep, setActiveStep] = React.useState(0);

  const [booking, setBooking] = useState({
    "flight": null,
    "flightBack": null,
    "selectedSeating": [],
    "selectedSeatingBack": [],
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
    let validate = false;

    if(activeStep == STEPS_ID.seats) {
      console.log("🚀 ~ entro activeStep")
      validate = StepSeats()
    }

    else if(activeStep == STEPS_ID.passengers) {
      validate = StepPassengers()
    }

    if(activeStep == STEPS_ID.confirm) {
      StepFlightConfirm()
      validate = true
    }

    if(validate){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  function  StepSeats(){
    let validate = validateStepSeats()

    if(validate){
      let tempPassengers = []
      const tempBooking = booking
      
      selectedSeating.forEach(element => {
        tempPassengers.push(passengerEmpty)
      });
  
      tempBooking.passengers = tempPassengers
      setBooking(tempBooking)
    }

    return validate;
  }

  function validateStepSeats() {

    let validate = true;

    console.log("🚀 ~ file: BookStepper.jsx:120 ~ validateStepSeats ~ booking.selectedSeating:", booking.selectedSeating)
    if(booking.selectedSeating.length <= 0){
      alert("Se debe seleccionar 1 asiento como minimo en Ida")
      validate = false; 
    }
    else if(flightBackId != "null" && booking.selectedSeatingBack.length == 0){      
      alert("Se debe seleccionar 1 asiento como minimo en Vuelta")
      validate = false; 
    }
    else if(flightBackId != "null" && booking.selectedSeating.length != booking.selectedSeatingBack.length){
      alert("Se deben marcar la misma cantidad de asientos en la ida y vuelta")
      validate = false; 
    }

    return validate;
  }

  function StepPassengers(){
    let validate = validateStepPassengers(booking.passengers)

    return validate;
  }

  function validateStepPassengers(passengers) {
    const seats = new Set();
    const seatBacks = new Set();
  
    for (let i = 0; i < passengers.length; i++) {
      const passenger = passengers[i];
  
      if (
        !passenger.name ||
        !passenger.country ||
        !passenger.document ||
        !passenger.sex
      ) {
        alert("Por favor, complete todos los campos para el pasajero " + (i + 1));
        return false;
      }
  
      if (
        passenger.name.trim() === "" ||
        passenger.country.trim() === "" ||
        passenger.document.trim() === "" ||
        passenger.sex.trim() === ""
      ) {
        alert("Por favor, ingrese valores válidos para el pasajero " + (i + 1));
        return false;
      }
  
      if (seats.has(passenger.seat)) {
        alert("El asiento " + passenger.seat + " ya ha sido seleccionado por otro pasajero.");
        return false;
      }
      seats.add(passenger.seat);
  
      if (seatBacks.has(passenger.seatBack)) {
        alert("El asiento de vuelta " + passenger.seatBack + " ya ha sido seleccionado por otro pasajero.");
        return false;
      }
      seatBacks.add(passenger.seatBack);
    }
  
    return true;
  }

  const StepFlightConfirm = () => {
    bookingFlight(booking)
    .then((res) => {
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })
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
                  <Stack>
                      <Box sx={{ color: 'purple' }}>
                        <h1 style={{ fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: 3, color: 'purple' }}>
                          Reserve sus asientos
                        </h1>
                      </Box>
                      {(flightId != 'null') ?
                        <BookFlight title="Ida" booking={booking} setBooking={setBooking} idFlight={flightId}
                          selectedSeating={selectedSeating}
                          setSelectedSeating={setSelectedSeating} />
                        :
                        null}
                      {(flightBackId != 'null') ?

                        <BookFlight title="Vuelta" booking={booking} setBooking={setBooking} type='back' idFlight={flightBackId}
                          selectedSeating={selectedSeatingBack}
                          setSelectedSeating={setSelectedSeatingBack} />
                        :
                        null}
                    </Stack>
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