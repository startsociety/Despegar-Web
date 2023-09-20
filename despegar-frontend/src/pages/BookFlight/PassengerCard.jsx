import React from "react";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';

export const PassengerCard = (props) => {

        const {seating, setSeating, passenger, setPassenger} = props 
        const [country, setCountry] = React.useState('')
  
        const handleChangeCountry = (event) => {
            setCountry(event.target.value);
        }

        const handleChange = (e) => {
            let value = e.target.value
            if(e.target.type === "number"){
                value = Number(value)
            }
            
            let passengerTemp = { ...passenger }
            passengerTemp[e.target.name] = value

            console.log(passenger)
        }

        return(
            <Card elevation={15} sx={{  minWidth: 245, margin: 2, backgroundColor: '#270570'}}>                
                <CardContent>
                <h4 style={{fontFamily: 'sans-serif', color:'white'}}> Asiento {seating}</h4>
                <div>
                    <TextField sx={{ m: 1, minWidth: 500, backgroundColor: 'white' }}
                    id="outlined-required"
                    label="Nombre/s"
                    name="firstname"
                    onChange={handleChange}
                    defaultValue=""                        
                    />
                </div>
                <div>
                    <TextField  sx={{ m: 1, minWidth: 500, backgroundColor: 'white'}}
                    id="outlined-required"
                    name="lastname"
                    label="Apellido/s"
                    defaultValue=""
                    />
                </div>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 500, backgroundColor: 'white' }}>
                        <InputLabel id="demo-simple-select-autowidth-label" style={{fontFamily: 'Lato', color:'black', fontWeight: 500}}>País de residencia</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={country}
                                onChange={handleChangeCountry}
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
                </div>
                <div>
                        <TextField sx={{ m: 1, minWidth: 500, backgroundColor: 'white' }}
                            name="dni"
                            id="outlined-required"
                            label="DNI"
                            type="number"
                            defaultValue=""
                    />
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label" style={{fontFamily: 'Lato', color:'white'}}>Genero</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"                                                                            
                                    >
                                    <FormControlLabel value="female" style={{fontFamily: 'Lato', color:'white'}} control={<Radio />} label="Femenino" />
                                    <FormControlLabel value="male" style={{fontFamily: 'Lato', color:'white'}} control={<Radio />} label="Masculino" />
                                    <FormControlLabel value="other" style={{fontFamily: 'Lato', color:'white'}} control={<Radio />} label="Otro" />
                                </RadioGroup>
                        </FormControl>
                    </div>     
                </CardContent>            
            <CardActions>              
            </CardActions>
        </Card>           
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