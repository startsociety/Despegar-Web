import React, {useState, useEffect} from "react";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Divider, Grid, Paper, Box, Typography } from '@mui/material';

export const PassengerCard = (props) => {

        const { passenger, setPassenger, booking, indexPassenger, availableSeats, availableSeatsBack, keyPassenger, handleChangeSeating, handleChangeSeatingBack } = props

        const handleChangeCountry = (value) => {
   
            let passengerTemp = { ...passenger }
            passengerTemp["country"] = value

            setPassenger(passengerTemp)
        }

        useEffect(() => {
            console.log("pasejro = ", passenger)
        }, [ passenger]);

        function seats(){           
            let seats = availableSeats
            
            if(passenger.seat)
             seats = [...availableSeats, passenger.seat]

            return seats
        }

        function seatsBack(){           
            let seats = availableSeatsBack
            
            if(passenger.seatBack)
             seats = [...availableSeatsBack, passenger.seatBack]

            return seats
        }
        
        const handleChangeGender = (value) => {
   
            let passengerTemp = { ...passenger }
            passengerTemp["sex"] = value

            setPassenger(passengerTemp)
        }

        const handleChangeName = (value) => {
   
            let passengerTemp = { ...passenger }
            passengerTemp["name"] = value

            setPassenger(passengerTemp)
        }

        const handleChangeDocument = (value) => {
   
            let passengerTemp = { ...passenger }
            passengerTemp["document"] = value

            setPassenger(passengerTemp)
        }

        return(
            <Paper elevation={3} sx={{maxWidth:"400px", margin:"20px"}}>
                <Box m={3} >
                    <Grid container spacing={1}>
                        <Grid container item justifyContent="center" >
                            <Box m={3}>
                                <Typography variant="h5" color="initial"> 
                                Pasajero {indexPassenger + 1} 
                                </Typography>
                            </Box>
                        </Grid>                            
                        <Grid item container>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-autowidth-label" style={{fontFamily: 'Lato', fontWeight: 500}}>Asiento de Ida</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        defaultValue={passenger.seat}
                                        onChange={e => { handleChangeSeating(e.target.value, passenger, keyPassenger) }}
                                        label="Asiento de Ida"
                                        >
                                        {
                                            seats().map((seating , index) =>{
                                                return (
                                                    <MenuItem id={seating} key={index} value={seating}>
                                                        {seating}
                                                    </MenuItem>
                                                    )
                                                })
                                        }
                                    </Select>
                            </FormControl>
                        </Grid>
                        {
                            booking.flightBack ? 
                            <Grid item container>
                                <FormControl fullWidth sx={{marginTop:"10px"}}>
                                    <InputLabel id="demo-simple-select-autowidth-label" style={{fontFamily: 'Lato', fontWeight: 500}}>Asiento de Vuelta</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            value={passenger.seatBack}
                                            onChange={e => { handleChangeSeatingBack(e.target.value, passenger, keyPassenger) }}
                                            label="Asiento de Vuelta">
                                            {
                                                seatsBack().map((seating , index) =>{
                                                    return (
                                                        <MenuItem id={seating} key={index} value={seating}>
                                                            {seating}
                                                        </MenuItem>
                                                        )
                                                    })
                                            }
                                        </Select>
                                </FormControl>
                            </Grid>
                            : 
                            null
                        }
                        <TextField                                    
                                style={{ width:"100%", marginTop:"5%", marginRight:"0%"}}
                                id="outlined-required"
                                label="Nombre/s"
                                name="firstname"
                                onChange={e => { handleChangeName(e.target.value) }}
                                value={passenger.name}
                        />
                        <TextField                                     
                                style={{ width:"100%", marginTop:"4%", marginRight:"0%"}}
                                name="dni"
                                id="outlined-required"
                                label="DNI"
                                type="number"
                                value={passenger.document}
                                onChange={e => { handleChangeDocument(e.target.value) }}
                            />
                        <Grid item container>
                            <FormControl fullWidth sx={{marginTop:"10px"}}>
                                <InputLabel id="demo-simple-select-autowidth-label" style={{fontFamily: 'Lato', fontWeight: 500}}>País de residencia</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={passenger.country}
                                        onChange={e => { handleChangeCountry(e.target.value) }}
                                        label="País de residencia"
                                        >
                                        {
                                            countries ? countries.map((country , index) =>{
                                                return (
                                                    <MenuItem id={country} key={index} value={country}>
                                                        {country}
                                                    </MenuItem>
                                                    )
                                                })
                                                : null
                                        }
                                    </Select>
                            </FormControl>
                        </Grid>
                        <Grid item container>
                            <FormControl fullWidth sx={{marginTop:"10px"}}>
                                <InputLabel id="demo-simple-select-autowidth-label" style={{fontFamily: 'Lato', fontWeight: 500}}>Genero</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={passenger.sex}
                                        onChange={e => { handleChangeGender(e.target.value) }}
                                        label="Genero"
                                        >
                                        {
                                            genders ? genders.map((gender , index) =>{
                                                return (
                                                    <MenuItem id={gender} key={index} value={gender}>
                                                        {gender}
                                                    </MenuItem>
                                                    )
                                                })
                                                : null
                                        }
                                    </Select>
                            </FormControl>
                        </Grid>
                    </Grid>            
                </Box>
            </Paper>
    );
}

const countries = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Paraguay",
    "Perú",
    "Uruguay",
    "Venezuela"
]

const genders = [
    "Otro",
    "Masculino",
    "Femenino"
]