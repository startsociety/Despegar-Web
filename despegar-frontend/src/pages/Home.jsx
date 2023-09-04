import React, { useEffect, useState } from "react";
import { flightPresenter } from '../presenter/FlightPresenter'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Flight from "./Flights/Flight";

const Home = (props) => {
   const [flights, setFlights] = useState([]);
   const {getFlights} = flightPresenter()
   
    useEffect(() => {
      getFlights()
        .then((res) => {
          setFlights(res.flights)
        })
        .catch((err) => console.log(err));
    }, []);

    return (
      <Box sx={{ flexGrow: 1, margin: 5 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {
              flights ? flights.map((flight) =>{
              return (
                  <Flight flight={flight} key={flight.idFlight}/>
                )
              })
              : null
          }
        </Grid>
      </Box>
    );
  }

export default Home;