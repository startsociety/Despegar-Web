import React, { useEffect, useState } from "react";
import { flightPresenter } from '../presenter/FlightPresenter'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Flight from "./Flights/Flight";
import { Container } from "@mui/material";

const Home = (props) => {
   const [flights, setFlights] = useState([]);
   const {getFlights} = flightPresenter()
   
    useEffect(() => {
      getFlights('01/01/1970', '01/01/2970')
        .then((res) => {
          console.log("res res =>" , res)
          setFlights(res)
          console.log("res flights =>" , flights)
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        
      <Container sx={{   marginTop:'2%'}}>
        <Grid container rowSpacing={1} >
          {
              flights ? flights.map((flight) =>{
              return (
                  <Flight key={flight.id} flight={flight}/>
                )
              })
              : null
          }
        </Grid>
      </Container>
    );
  }

export default Home;