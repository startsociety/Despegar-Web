import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import despegarLogo from '../../assets/despegarLogo.png'

export const NavBar = (props) => {

  const { user, setUser } = props;
  const navigate = useNavigate();

  const toLogin = () => { navigate("/login") }
  const toProfile = () => { navigate("/profile") }
  const toFlights = () => { navigate("/flights") }
    
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toLogin()
  }

  return (
    <AppBar sx={{position: "static"}}color= 'secondary'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 5, display: { xs: 'flex'} }}>  
            <Card sx={{color:'transparent'}}>
                <CardMedia
                    component="img"
                    alt="Logo Despegar"
                    height="50"
                    image={despegarLogo}
                    title="Despegar"

                />
            </Card>
            <Box sx={{ marginLeft: 2}}> </Box>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'system-ui',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
                }}
            >
                DESPEGAR |
            </Typography>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'system-ui',
                fontWeight: 700,
                letterSpacing: '.rem',
                color: 'white',
                textDecoration: 'none',
                }}
            >
               Viajes baratos y experiencias unicas
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            { user ? (
                <>                     
                    <Button onClick={toProfile} sx={{ my: 2, color: 'white', display: 'block' }}>Mi Perfil</Button>
                    <Button onClick={logout} sx={{ my: 2, color: 'white', display: 'block' }}>Cerrar Sesión</Button>
                </>
            ) : (
                <></>      
            )}

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
