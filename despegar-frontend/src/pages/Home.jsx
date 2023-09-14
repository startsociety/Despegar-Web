import React, { useEffect, useState } from "react";
import { flightPresenter } from '../presenter/FlightPresenter'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Flight from "./Flights/Flight";
import { Container } from "@mui/material";
import { Filterflights } from "../components/Shared/FilterFlights";

const Home = (props) => {
   const [flights, setFlights] = useState([]);
   const {getFlights} = flightPresenter()
   
   const [filter, setFilter] = useState({
        from:null,
        to: null,
        origin: "",
        destination: "",
        price_min: null,
        price_max: null,
        max_flight_time: null
    })

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
        
      <Container sx={{ marginTop:'2%'}}>

        <Filterflights filter={filter} setFilter={setFilter} setFlights={setFlights}/>
        <Grid marginTop={"20px"} container rowSpacing={1} >
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