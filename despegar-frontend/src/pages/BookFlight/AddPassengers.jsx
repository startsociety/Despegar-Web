import React from "react";
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
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
import Grid from '@mui/material/Grid';
import { CardActions } from '@mui/material';

export const AddPassengers = (props) => {
    const {booking, setBooking } = props
    const [country, setCountry] = React.useState('');
  
    const handleChange = (event) => {
      setCountry(event.target.value);

  }
        return(
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
         >
          <h5>Asientos selectionados ida:</h5>
            {booking.selectedSeating.map((position, columnIndex) => (
            <body2>{position} </body2>
            
          ))}
          <h5>Asientos selectionados vuelta:</h5>
            {booking.selectedSeatingBack.map((position, columnIndex) => (
            <body2>{position} </body2>
            
          ))}
        <Grid container rowSpacing={1} >
        {
          booking.selectedSeating.map((passenger, columnIndex) => (
          (columnIndex > 0)?
          
             <Card elevation={15} sx={{  minWidth: 245, margin: 2, backgroundColor: '#270570'}}>                
                  <h4 style={{fontFamily: 'sans-serif', color:'white'}}> Asiento {passenger}</h4>
                  <CardContent>
                    <div>
                      <TextField sx={{ m: 1, minWidth: 500, backgroundColor: 'white' }}
                        name
                        id="outlined-required"
                        label="Nombre/s"
                        defaultValue=""                        
                      />
                    </div>
                    <div>
                        <TextField  sx={{ m: 1, minWidth: 500, backgroundColor: 'white'}}
                        lastname
                        id="outlined-required"
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
                                  onChange={handleChange}
                                  label="País de residencia"
                                  >
                                  <MenuItem value={1}>Argentina</MenuItem>
                                  <MenuItem value={2}>Bolivia</MenuItem>
                                  <MenuItem value={3}>Brasil</MenuItem>
                                  <MenuItem value={4}>Chile</MenuItem>
                                  <MenuItem value={5}>Colombia</MenuItem>
                                  <MenuItem value={6}>Ecuador</MenuItem>
                                  <MenuItem value={7}>Paraguay</MenuItem>
                                  <MenuItem value={8}>Perú</MenuItem>
                                  <MenuItem value={9}>Uruguay</MenuItem>
                                  <MenuItem value={10}>Venezuela</MenuItem>
                              </Select>
                        </FormControl>
                    </div>
                    <div>
                          <TextField sx={{ m: 1, minWidth: 500, backgroundColor: 'white' }}
                              dni
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
         
          : null
          ))
        }
         </Grid>        
      </Box>
    );

}
