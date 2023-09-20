import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AddPassengers } from './AddPassengers';
import { BookFlight } from './BookFlight';
import { Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';

const steps = ['Seleccionar asientos', '¿Quienes viajan?', 'Confirmar'];

export const BookFlightStepper = () => {
  const navigate = useNavigate();
  const { flightId, flightBackId } = useParams();

  const [activeStep, setActiveStep] = React.useState(0);

  const [booking, setBooking] = useState({
    "selectedSeating": [[]],
    "selectedSeatingBack": [[]],
    "passengers": [],
  });

  const [selectedSeating, setSelectedSeating] = useState([]);
  const [selectedSeatingBack, setSelectedSeatingBack] = useState([]);

  const passengerEmpty = {
    dni: null,
    firstname: null,
    lastname: null
  }
  
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
                  <h1>Ultimo paso</h1>
                :
                  <Stack>
                    <Box sx={{color:'purple'}}>
                      <h1 style={{ fontFamily: 'sans-serif',fontWeight: 700, letterSpacing: 3, color: 'purple'}}>
                        Reserve sus asientos
                      </h1>
                    </Box>
                    {
                      (flightId != 'null') ?
                          <BookFlight title="Ida" booking={booking} setBooking={setBooking} idFlight={flightId}
                           selectedSeating={selectedSeating}
                           setSelectedSeating={setSelectedSeating}
                           />
                      :
                        null 
                    }
                    {
                      (flightBackId != 'null') ?

                          <BookFlight title="Vuelta" booking={booking} setBooking={setBooking} type='back' idFlight={flightBackId}
                           selectedSeating={selectedSeatingBack}
                           setSelectedSeating={setSelectedSeatingBack} />
                      :
                        null 
                    }
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