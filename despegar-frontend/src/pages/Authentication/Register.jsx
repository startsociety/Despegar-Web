import React, { useState } from 'react'
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { userPresenter } from '../../presenter/UserPresenter'

import {
  Grid,
  Typography,
  IconButton,
  Box,
  Container,
  Paper,
  TextField,
} from '@mui/material'

export const Register = () => {

    const navigate = useNavigate();

    const { register } = userPresenter()
  
    const [address, setAddress] = useState("");
    const [errAddress, setErrAddress] = useState("");
  
    const [visible, setVisible] = useState(false);
  
    const [name, setNombre] = useState("");
    const [errNombre, setErrNombre] = useState("");
  
    const [phone, setPhone] = useState("");
    const [errPhone, setErrPhone] = useState("");

    const [city, setCity] = useState("");
    const [errCity, setErrCity] = useState("");
  
    const [sex, setSex] = useState("");
    const [errSex, setErrSex] = useState("");
    
    const [bithdate, setBithDate] = useState("");
    const [errBithDate, setErrBithDate] = useState("");

    const [dni, setDni] = useState("");
    const [errDni, setErrDni] = useState("");
  
    const [email, setEmail] = useState("");
    const [errEmail, setErrEmail] = useState("");
  
    const [password, setPassword] = useState("");
    const [errPass, setErrPass] = useState("");
  
    const [alertMsg, setAlertMsg] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("")
  
    const call_setPassword = (val) => {
      if (val === "") {
        setErrPass("Este campo no puede estar vacio")
      } else {
        setErrPass("")
      }
      setPassword(val)
    }
  
    const call_setNombre = (val) => {
      if (val === "") {
        setErrNombre("Este campo no puede estar vacio")
      } else {
        setErrNombre("")
      }
      setNombre(val)
    }
  
    const call_setPhone = (val) => {
      if (val === "") {
        setErrPhone("Este campo no puede estar vacio")
      } else {
        setErrPhone("")
      }
      setPhone(val)
    }
  
    const call_setDni = (val) => {
      if (val === "") {
        setErrDni("Este campo no puede estar vacio")
      } else {
        setErrDni("")
      }
      setDni(val)
    }
  
    const call_setEmail = (val) => {
      if (val !== "") {
        setErrEmail("");
        setEmail(val);
      } else {
        setErrEmail("Este campo no puede estar vacio");
        setEmail(val);
      }
    }
  
    const call_setAddress = (val) => {
      if (val !== "") {
        setErrAddress("");
        setAddress(val);
      } else {
        setErrAddress("Este campo no puede estar vacio");
        setAddress(val);
      }
    }

    const call_setSex = (val) => {
      if (val !== "") {
        setErrSex("");
        setSex(val);
      } else {
        setErrSex("Este campo no puede estar vacio");
        setSex(val);
      }
    }

    const call_setCity = (val) => {
      if (val !== "") {
        setErrCity("");
        setCity(val);
      } else {
        setErrCity("Este campo no puede estar vacio");
        setCity(val);
      }
    }

    const call_setBithDate = (val) => {
      if (val !== "") {
        setErrBithDate("");
        setBithDate(val);
      } else {
        setErrBithDate("Este campo no puede estar vacio");
        setBithDate(val);
      }
    }
  
    const clear = () => {
      setNombre("");
      setPhone("");
      setAddress("");
      setDni("");
      setEmail("");
      setUsername("");
      setPassword("");
      setSex("");
      setCity("");
      setBithDate("");
  
      setErrNombre("");
      setErrPhone("");
      setErrAddress("");
      setErrDni("");
      setErrEmail("");
      setErrUserName("");
      setErrPass("");
      setErrSex("");
      setErrCity("");
      setErrBithDate("");
  
      setVisible(false);
  
    }
  
    const validate = () => {
      let valid = true;
      
      if (email === "") {
        setErrEmail("Este campo es requerido");
        console.log("Este campo es requerido = email")
        valid = false;
      }
      if (password === "") {
        setErrPass("Este campo es requerido");
        console.log("Este campo es requerido = password")
        valid = false;
      }
      if (name === "") {
        setErrNombre("Este campo es requerido");
        console.log("Este campo es requerido = name")
        valid = false;
      }
      if (dni === "") {
        setErrDni("Este campo es requerido");
        console.log("Este campo es requerido = dni")
        valid = false;
      }
      if (sex === "") {
        setErrSex("Este campo es requerido");
        console.log("Este campo es requerido = sex")
        valid = false;
      }
      if (bithdate === "") {
        setErrBithDate("Este campo es requerido");
        console.log("Este campo es requerido = bithdate")
        valid = false;
      }
      if (address === "") {
        setErrAddress("Este campo es requerido");
        console.log("Este campo es requerido = address")
        valid = false;
      }
      if (phone === "") {
        setErrPhone("Este campo es requerido");
        console.log("Este campo es requerido = phone")
        valid = false;
      }
      if (city === "") {
        setErrCity("Este campo es requerido");
        console.log("Este campo es requerido = city")
        valid = false;
      }

      return valid;
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
  
    const send = async () => {
      const formOK = validate();
      if (formOK) {
        try {
          const newUser = {
            "id": 0,
            "name": name,
            "email": email.toString(),
            "document": dni,
            "phone": phone,
            "address": address,
            "city": city,
            "bithdate": bithdate,
            "sex": sex,
            "password": password
          }
          console.log("new user =>", newUser)
          let res = await register(newUser)
          if(res){
            alert("Usuario Creado")
            navigate("/login")
          }
        } catch (error) {
          console.log(error)
          setAlertSeverity("error")
          setAlertMsg("Error, intente nuevamente")
        }
  
      }
      else{
        console.log("Error register complete")
      }
    }
    const goLogin = () => {
      clear()
      navigate("/login")
    }
  
    return (
      <>
        <Box m={8} />
        <Container maxWidth="sm" >
          <Paper elevation={3}>
            <Box m={3} >
              <Grid container spacing={2}>
                <Grid container item justifyContent="center" >
                  <Box m={3}>
                    <Typography variant="h5" color="initial"> 
                        Registrarme 
                    </Typography>
                  </Box>
                </Grid>
                <Grid item container>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={e => { call_setEmail(e.target.value) }}
                    error={errEmail !== "" ? true : false}
                    helperText={errEmail}
                  />
                </Grid>
                <Grid item container>
                    <FormControl sx={{ m: 1, width: '100%' }} 
                                 variant="outlined"
                                 onChange={e => { call_setPassword(e.target.value) }}>
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={visible ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>{setVisible(!visible)}}                                
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {
                                    visible ? <VisibilityIcon/> : <VisibilityOffIcon/>
                                }
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>

                <hr style={{ width: "100%" }} />

                <Grid container item>
                  <TextField
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    value={name}
                    onChange={e => { call_setNombre(e.target.value) }}
                    error={errNombre !== "" ? true : false}
                    helperText={errNombre}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    fullWidth
                    id="dni"
                    label="DNI"
                    variant="outlined"
                    value={dni}
                    onChange={e => { call_setDni(e.target.value) }}
                    error={errDni !== "" ? true : false}
                    helperText={errDni}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    fullWidth
                    id="sex"
                    label="Sexo"
                    variant="outlined"
                    value={sex}
                    onChange={e => { call_setSex(e.target.value) }}
                    error={errSex !== "" ? true : false}
                    helperText={errSex}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    fullWidth
                    id="bithdate"
                    label="fecha de nacimiento"
                    variant="outlined"
                    value={bithdate}
                    onChange={e => { call_setBithDate(e.target.value) }}
                    error={errBithDate !== "" ? true : false}
                    helperText={errBithDate}
                  />
                </Grid>

                <hr style={{ width: "100%" }} />

                <Grid container item>
                  <TextField
                    fullWidth
                    id="direccion"
                    label="Direccion"
                    variant="outlined"
                    value={address}
                    onChange={e => { call_setAddress(e.target.value) }}
                    error={errAddress !== "" ? true : false}
                    helperText={errAddress}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Telefono"
                    variant="outlined"
                    value={phone}
                    onChange={e => { call_setPhone(e.target.value) }}
                    error={errPhone !== "" ? true : false}
                    helperText={errPhone}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    fullWidth
                    id="city"
                    label="Ciudad"
                    variant="outlined"
                    value={city}
                    onChange={e => { call_setCity(e.target.value) }}
                    error={errCity !== "" ? true : false}
                    helperText={errCity}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box display="flex" justifyContent="center">
              {
                alertMsg ?
                  <Alert severity={alertSeverity}>{alertMsg} </Alert>
                  :
                  <></>
              }
            </Box>
            <Box pb={2} display="flex" justifyContent="space-around" alignItems="center">
              <Button onClick={goLogin} variant="outlined" color="primary">
                Cancelar
              </Button>
              <Button onClick={send} variant="contained" color="primary">
                Registrarse
              </Button>
            </Box>
          </Paper >
        </Container>
      </>
    )
  }