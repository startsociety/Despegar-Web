import { Avatar, Box, Stack, Button, Container, Divider, Grid, ListItem, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocalStorage } from '../../helpers/useLocalStorage';
import {AssignmentInd, Cake, Person, Wc, Email, Phone, Home, LocationCity, Edit} from '@mui/icons-material';

export const Profile = (props) => {
  
    const client = {
        id: 3,
        name: "Carlos Gómez",
        email: "carlos.gomez@example.com",
        document: "34567890",
        phone: "555-7890",
        address: "Ruta 10, Km 15",
        city: "Mendoza",
        birthday: "1992-03-10",
        sex: "Masculino"
      };

    const [user, setUser] = useLocalStorage('user', '')

    return (
        <Container maxWidth="100%" >
            <Box display="flex" justifyContent="left" m={8} >
                <Paper elevation={8} sx={{minWidth:750, justifyContent: 'left', alignContent:'left'}}>
                    <Stack container item justifyContent="left" paddingLeft={2} paddingTop={2} sx={{minWidth:700, minHeight:110, backgroundColor: '#270570'}} >
                        <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"}>
                            <Avatar sx={{ width: 56, height: 56 }} alt="noimage" src="src\assets\noimage.png"/>
                            <Typography marginLeft={2} marginTop={1} alignContent={'right'} variant="h5" color="white" >{ `${user.name}`}</Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"} paddingRight={2} alignItems={"center"} marginTop={1}>
                            <Grid container item justifyContent="bottom">
                            <Typography  variant="body2" color="white" >{`${user.email}`}</Typography>
                            </Grid>
                            <Button variant="outlined" sx={{width:90, height:35, justifyContent: 'center'}}><Edit></Edit>EDITAR</Button>
                            </Stack>                            
                    </Stack>
                    <Box container item justifyContent="left" marginLeft={3} paddingTop={2}>
                        <Typography variant="h4">{'Datos personales'}</Typography>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={8}>
                            <ListItem><Person fontSize= 'large'></Person><Typography variant="body1" color="black" >{`Nombre: ${user.name} `}</Typography></ListItem>
                            <ListItem><AssignmentInd fontSize= 'large'></AssignmentInd><Typography variant="body1" color="black" >{`DNI: ${user.document} `}</Typography></ListItem>
                            <ListItem><Wc fontSize= 'large'></Wc><Typography variant="body1" color="black" >{`Sexo: ${user.sex} `}</Typography></ListItem>
                            <ListItem><Cake fontSize= 'large'></Cake><Typography variant="body1" color="black" >{`Fecha de Nacimiento: ${user.birthday} `}</Typography></ListItem>                           
                        </Stack>
                        <Divider></Divider>
                    </Box>
                    <Box container item justifyContent="left" marginLeft={3} paddingTop={2}>
                        <Typography variant="h4">{'Datos de contacto'}</Typography>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={8}>
                            <ListItem><Email fontSize= 'large'></Email><Typography variant="body1" color="black" >{`Email: ${user.email} `}</Typography></ListItem>
                            <ListItem><Phone fontSize= 'large'></Phone><Typography variant="body1" color="black" >{`Telefono: ${user.phone} `}</Typography></ListItem>
                            <ListItem><Home fontSize= 'large'></Home><Typography variant="body1" color="black" >{`Direccion: ${user.address} `}</Typography></ListItem>
                            <ListItem><LocationCity fontSize= 'large'></LocationCity><Typography variant="body1" color="black" >{`Ciudad: ${user.city} `}</Typography></ListItem>
                        </Stack>       
                    </Box>
                </Paper>            
            </Box>
        </Container>
    );
  }