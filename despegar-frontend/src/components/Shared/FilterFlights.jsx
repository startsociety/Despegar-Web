import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'
import { blue } from '@mui/material/colors'
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';

import { flightPresenter } from '../../presenter/FlightPresenter'

export const Filterflights = (props) => {
    const { 
        setFlights,
        filter,
        setFilter
    } = props;

    const {getFlights} = flightPresenter()

    const handleChange = (e) => {
        let value = e.target.value
        if(e.target.type === "number"){
            value = Number(value)
        }
        let tempFilter = { ...filter }
        tempFilter[e.target.name] = value
        setFilter(tempFilter)
    }
    
    const find = () => {
        getFlights(filter)
        .then((res) => {
          console.log("res filter=> ", res)
          setFlights(res)
        })
        .catch((err) => console.log(err));
    }

    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item container xs={11} spacing={1}>
                        <Grid item xs={3}>
                            <TextField
                                name="origin"
                                label="Origen"
                                id="origin"
                                variant="outlined"
                                value={filter.origin}
                                size="small"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                name="destination"
                                label="Destino"
                                id="destination"
                                variant="outlined"
                                value={filter.destination}
                                size="small"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                type="number"
                                label="Precio desde"
                                variant="outlined"
                                name="price_min"
                                onChange={handleChange}
                                value={filter.price_min}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                type="number"
                                label="Precio Hasta"
                                variant="outlined"
                                name="price_max"
                                onChange={handleChange}
                                value={filter.price_max}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                type="number"
                                label="Tiempo Max de vuelo"
                                variant="outlined"
                                name="max_flight_time"
                                onChange={handleChange}
                                value={filter.max_flight_time}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={find}>
                            <SearchIcon style={{ color: blue[700], fontSize: "24px" }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}