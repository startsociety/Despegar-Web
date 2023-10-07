import React, { Component, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import { userPresenter } from '../../presenter/UserPresenter'

const Login = (props) => {
  const { user, setUser } = props;
  const navigate = useNavigate();

  const {login} = userPresenter()
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [errUserName, setErrEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errPass, setErrPass] = useState("");

  const [errorLogin, setErrorLogin] = useState("");

  const call_setEmail = (val) => {
      if (val === "") {
          setErrEmail("este campo no puede estar vacio")
      } else {
          setErrEmail("")
      }
      setEmail(val)
  }

  const call_setPassword = (val) => {
      if (val === "") {
          setErrPass("este campo no puede estar vacio")
      } else {
          setErrPass("")
      }
      setPassword(val)
  }

  const clear = () => {
      setEmail("");
      setPassword("");
      setErrEmail("");
      setErrPass("");
      setVisible(false);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  const send = async () => {
      const valid = validate();

      if(valid){
        try {          
            const res = await login(email, password);
            if(res.user){
              setUser(res.user)
              clear()
              navigate({
                pathname:"/home",
                  })               
            } else{
                setErrorLogin("error, verifique email y contraseña")
            }
        } catch (error) {
            console.log(error)
            setErrorLogin("error, verifique email y contraseña")
        }
      }
  }

  const validate = () => {
      let valid = true;
      if (email === "") {
          setErrEmail("Este campo es requerido");
          valid = false;
      }
      if (password === "") {
          setErrPass("Este campo es requerido");
          valid = false;
      }
      return valid;
  }

    return (
      <Container maxWidth="sm" >
        <Box display="flex" justifyContent="center" m={8}>
          <Paper elevation={3}>
            <Grid container spacing={2}>
                <Grid container item justifyContent="center" >
                    <Box m={3}>
                        <Typography variant="h5" color="initial"> Iniciar sesi&oacute;n</Typography>
                    </Box>
                </Grid>
                <Grid container item >
                    <TextField
                        style={{margin: 8, width:"95%"}}
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={e=>{call_setEmail(e.target.value)}}
                        error= {errUserName !== "" ? true : false}
                        helperText = {errUserName}
                        
                    />
              </Grid>
              <Grid container item >                          
                <FormControl sx={{ m: 1, width: '95%' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    value={password}
                    onChange={e=>{call_setPassword(e.target.value)}}
                    error= {errPass !== "" ? true : false}
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
              <Box m={2} display="flex" justifyContent="flex-end">
                <Link to={'/register'}>
                  Registrarse
                </Link>
              </Box> 

          </Grid>                  
          <Box display="flex" justifyContent="center">
              {
                  errorLogin?
                    <Alert severity="warning">{errorLogin} </Alert>
                :
                <></>
              }
          </Box>
          <Box m={2} display="flex" justifyContent="space-around">
              <Button onClick={send} variant="contained" color="primary">
                  Ingresar
              </Button>
          </Box>
        </Paper >
      </Box>
    </Container>
    );
  }

export default Login;