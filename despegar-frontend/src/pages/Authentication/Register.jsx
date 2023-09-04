import React, { useState } from 'react'
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
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
  
    const [tipoUsuario, setTipoUsuario] = useState(0);
    const [errTipoUsuario, setErrTipoUsuario] = useState("");
  
    const [visible, setVisible] = useState(false);
    const [cargando, setCargando] = useState(true);
  
    const [nombre, setNombre] = useState("");
    const [errNombre, setErrNombre] = useState("");
  
    const [apellido, setApellido] = useState("");
    const [errApellido, setErrApellido] = useState("");
  
    const [dni, setDni] = useState("");
    const [errDni, setErrDni] = useState("");
  
    const [email, setEmail] = useState("");
    const [errEmail, setErrEmail] = useState("");
  
    const [username, setUsername] = useState("");
    const [errUserName, setErrUserName] = useState("");
  
    const [password, setPassword] = useState("");
    const [errPass, setErrPass] = useState("");
  
    const [alertMsg, setAlertMsg] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("")
  
  
    const call_setUsername = (val) => {
      if (val === "") {
        setErrUserName("Este campo no puede estar vacio")
      } else {
        setErrUserName("")
      }
      setUsername(val)
    }
  
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
  
    const call_setApellido = (val) => {
      if (val === "") {
        setErrApellido("Este campo no puede estar vacio")
      } else {
        setErrApellido("")
      }
      setApellido(val)
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
  
    const call_setTipoUsuario = (val) => {
      if (val !== "") {
        setErrTipoUsuario("");
        setTipoUsuario(val);
      } else {
        setErrTipoUsuario("Este campo no puede estar vacio");
        setEmail(val);
      }
    }
  
    const clear = () => {
      setNombre("");
      setApellido("");
      setDni("");
      setEmail("");
      setUsername("");
      setPassword("");
  
      setErrNombre("");
      setErrApellido("");
      setErrDni("");
      setErrEmail("");
      setErrUserName("");
      setErrPass("");
  
      setVisible(false);
  
    }
  
    const validate = () => {
      let retorno = true;
      if (nombre === "") {
        setErrNombre("Este campo es requerido");
        retorno = false;
      }
      if (apellido === "") {
        setErrApellido("Este campo es requerido");
        retorno = false;
      }
      if (dni === "") {
        setErrDni("Este campo es requerido");
        retorno = false;
      }
      if (email === "") {
        setErrEmail("Este campo es requerido");
        retorno = false;
      }
      if (username === "") {
        setErrUserName("Este campo es requerido");
        retorno = false;
      }
      if (password === "") {
        setErrPass("Este campo es requerido");
        retorno = false;
      }
      if (tipoUsuario === "") {
        setErrPass("Este campo es requerido");
        retorno = false;
      }
  
      return retorno;
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
  
    const send = async () => {
      const formOK = validate();
      if (formOK) {
        try {
          const newUser = {
            "idUsuario": 0,
            "nombre": nombre,
            "apellido": apellido,
            "dni": dni,
            "email": email.toString(),
            "usuario": username,
            "clave": password,
            "idTipoUsuario": tipoUsuario
          }
        //   await altaUsuario(newUser)
          alert("Usuario Creado")
          navigate("/login")
        } catch (error) {
          console.log(error)
          setAlertSeverity("error")
          setAlertMsg("Error, intente nuevamente")
        }
  
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
                    id="userName"
                    label="Usuario"
                    variant="outlined"
                    value={username}
                    onChange={e => { call_setUsername(e.target.value) }}
                    error={errUserName !== "" ? true : false}
                    helperText={errUserName}
                  />
                </Grid>
                <Grid item container>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
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
                    value={nombre}
                    onChange={e => { call_setNombre(e.target.value) }}
                    error={errNombre !== "" ? true : false}
                    helperText={errNombre}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    fullWidth
                    id="apellido"
                    label="Apellido"
                    variant="outlined"
                    value={apellido}
                    onChange={e => { call_setApellido(e.target.value) }}
                    error={errApellido !== "" ? true : false}
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
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={e => { call_setEmail(e.target.value) }}
                    error={errEmail !== "" ? true : false}
                    helperText={errEmail}
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