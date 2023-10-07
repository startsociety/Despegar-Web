import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'
import { blue } from '@mui/material/colors'
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';

import { flightPresenter } from '../../presenter/FlightPresenter'
import { airportPresenter } from '../../presenter/AirportPresenter'

export const Filterflights = (props) => {
    const { 
        setFlights,
        filter,
        setFilter
    } = props;

    const {getFlights} = flightPresenter()
    const {getAirports} = airportPresenter()

    const [airports, setAirports] = useState([]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    
    useEffect(() => {
        getAirports()
          .then((res) => {
            setAirports(res)
          })
          .catch((err) => console.log(err));
      }, [])

    const handleChange = (e) => {
        let value = e.target.value
        if(e.target.type === "number"){
            value = Number(value)
        }
        let tempFilter = { ...filter }
        tempFilter[e.target.name] = value
        setFilter(tempFilter)
    }

    const HandleChangeAirportOrigin = (e) => {
        let value = e.target.value

        let tempFilter = { ...filter }
        tempFilter["origin"] = value
        
        setFilter(tempFilter)        
    }

    const HandleChangeAirportBack = (e) => {
        let value = e.target.value

        let tempFilter = { ...filter }
        tempFilter["destination"] = value
        
        setFilter(tempFilter)
    }
    
    const find = () => {
        console.log(filter)
        
        getFlights(filter)
        .then((res) => {          
          setFlights(res)
        })
        .catch((err) => console.log(err));
    }

    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item container xs={11} spacing={1}>
                        <Grid item xs={2}>
                            <Select
                                item
                                labelId="origin"
                                id="origin"
                                value={filter.origin}
                                label="Origen"
                                size="small"
                                fullWidth
                                onChange={HandleChangeAirportOrigin}
                                MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                        width: 400
                                      },
                                    }}}>                                    
                                {
                                    airports ? airports.map((airport , index) =>{
                                        return (
                                            <MenuItem id={airport.id} key={index} value={airport}>                        
                                                {airport.name.length > 40
                                                    ? `(${airport.code}) ${airport.name.slice(0, 37)}...`
                                                    : `(${airport.code}) ${airport.name}`}
                                            </MenuItem>
                                            )
                                        })
                                        : null
                                }                            
                            </Select>
                        </Grid>
                        <Grid item xs={2}>
                            <Select
                                labelId="destination"
                                id="destination"
                                value={filter.destination}
                                label="Destino"
                                size="small"
                                fullWidth
                                onChange={HandleChangeAirportBack}
                                MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                        width: 400
                                      },
                                    }}}>                                    
                                {
                                    airports ? airports.map((airport , index) =>{
                                        return (
                                            <MenuItem id={airport.id} key={index} value={airport}>                        
                                                {airport.name.length > 40
                                                    ? `(${airport.code}) ${airport.name.slice(0, 37)}...`
                                                    : `(${airport.code}) ${airport.name}`}
                                            </MenuItem>
                                            )
                                        })
                                        : null
                                }                            
                            </Select>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Fecha salida"
                                variant="outlined"
                                name="from"
                                type='date'
                                onChange={handleChange}
                                value={filter.from}
                                size="small"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid>    
                        <Grid item xs={2}>
                            <TextField
                                label="Fecha vuelta"
                                variant="outlined"
                                name="to"
                                type='date'
                                onChange={handleChange}
                                value={filter.to}
                                size="small"
                                InputLabelProps={{
                                shrink: true,
                                }}
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