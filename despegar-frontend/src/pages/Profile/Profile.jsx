import React, { useEffect, useState } from "react";
import { Avatar, Box, Stack, Button, Container, Divider, Grid, ListItem, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { userPresenter } from '../../presenter/UserPresenter'
import {AssignmentInd, Cake, Person, Wc, Email, Phone, Home, LocationCity, Edit} from '@mui/icons-material';

export const Profile = (props) => {

    const { user } = props
    const [client, setClient] =  useState("");
    const [editMode, setEditMode] =  useState(false);
    const { getById, update } = userPresenter()

    useEffect(() => {
            getById(user.idUser)
            .then((res) => {
                setClient(res)
            })
            .catch((err) => console.log(err));
      }, []);

    const handleEdit = () => {
        setEditMode(!editMode)
    };

    const edit = () => {

        update(client)
        .then((res) => {
            setEditMode(!editMode)
            alert("Datos editados con exito!")
        })
        .catch((err) => console.log(err));
    };

    const handleInputChange = (event) => {
        const name = event.target.name
    
        const value = event.target.type === "number"
            ? event.target.valueAsNumber : event.target.type === 'checkbox'
            ? event.target.checked : event.target.value
    
        let temp = { ...client }
        temp[name] = value
        setClient(temp)
    }

    return (
        <Container maxWidth="100%" >
            <Box display="flex" justifyContent="center" m={8} sx={{borderRadius:20}}>
                <Paper elevation={8} sx={{minWidth:750, paddingBottom:"20px" ,justifyContent: 'left', alignContent:'left', borderRadius:"11px"}}>
                    <Stack container item justifyContent="left" paddingLeft={2} paddingTop={2} sx={{minWidth:700, minHeight:110, backgroundColor: '#560EEC', borderRadius:"11px 11px 0px 0px", }} >
                        <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"}>
                            <Avatar sx={{ width: 56, height: 56 }} alt="noimage" src="src\assets\noimage.png"/>
                            <Typography marginLeft={2} marginTop={1} alignContent={'right'} variant="h5" color="white" >{ `${client.name}`}</Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"} paddingRight={2} alignItems={"center"} marginTop={1}>
                            <Grid container item justifyContent="bottom">
                            <Typography marginLeft={"10px"} variant="body2" color="white" >{`${client.email}`}</Typography>
                            </Grid>
                            {
                                editMode ?
                                    null
                                :
                                    <Button variant="outlined" size="large" onClick={handleEdit} sx={{width:90, height:35, justifyContent: 'center' , color:"white", borderColor:"white"}}>
                                        <Edit />
                                        EDITAR
                                    </Button>
                            }
     
                        </Stack>                            
                    </Stack>
                    {
                        editMode ?
                        <>
                            <Box container item justifyContent="left" marginLeft={3} marginRight={3} paddingTop={2}>
                                <Typography variant="h5">{'Datos personales'}</Typography>
                                <Stack direction="row" paddingTop={2} paddingBottom={3} justifyContent="flex-start" alignItems="center" spacing={8}>
                                    <Grid container item>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            name="name"
                                            label="Nombre"
                                            variant="outlined"
                                            defaultValue={client.name}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid container item>
                                        <TextField
                                            fullWidth
                                            disabled
                                            id="document"
                                            name="document"
                                            label="Documento"
                                            variant="outlined"
                                            value={client.document}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                                        <InputLabel id="demo-simple-select-autowidth-label" style={{fontFamily: 'Lato', fontWeight: 500}}>Genero</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                name="sex"
                                                id="demo-simple-select-autowidth"
                                                value={client.sex}
                                                onChange={handleInputChange}
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
                                    <Grid container item>
                                        <TextField
                                            fullWidth
                                            label="Fecha de Nacimiento"
                                            variant="outlined"
                                            name="birthday"
                                            type='date'
                                            onChange={handleInputChange}
                                            value={client.birthday}
                                        />
                                    </Grid>  
                                </Stack>
                                <Divider />
                            </Box>
                            <Box container item justifyContent="left" marginLeft={3} marginRight={3} paddingTop={2}>
                                <Typography variant="h5">{'Datos de contacto'}</Typography>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" paddingTop={2} spacing={8}>
                                    <Grid container item>
                                        <TextField
                                            fullWidth
                                            disabled
                                            id="email"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            defaultValue={client.email}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid container item>
                                        <TextField
                                            fullWidth
                                            id="phone"
                                            name="phone"
                                            label="Telefono"
                                            variant="outlined"
                                            defaultValue={client.phone}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid container item>
                                        <TextField
                                            fullWidth
                                            id="address"
                                            name="address"
                                            label="Direccion"
                                            variant="outlined"
                                            defaultValue={client.address}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid container item>
                                        <TextField
                                            fullWidth
                                            id="city"
                                            name="city"
                                            label="Ciudad"
                                            variant="outlined"
                                            defaultValue={client.city}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Stack>       
                            </Box>
                            <Stack direction={"row"} spacing={5} display="flex" justifyContent="end" alignItems="center" marginLeft={3} marginRight={3} paddingTop={4}>
                                <Button onClick={handleEdit} variant="outlined" color="primary" sx={{ color:"#560EEC", borderColor:"#560EEC"}}>
                                    Cancelar
                                </Button>
                                <Button onClick={edit} variant="contained" sx={{ backgroundColor:"#560EEC", borderColor:"#560EEC"}}>
                                    Confirmar
                                </Button>
                            </Stack>
                        </>
                            
                        :
                        <>
                            <Box container item justifyContent="left" marginLeft={3} paddingTop={2}>
                                <Typography variant="h4">{'Datos personales'}</Typography>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={8}>
                                    <ListItem><Person fontSize= 'large'></Person><Typography variant="body1" color="black" >{`Nombre: ${client.name} `}</Typography></ListItem>
                                    <ListItem><AssignmentInd fontSize= 'large'></AssignmentInd><Typography variant="body1" color="black" >{`DNI: ${client.document} `}</Typography></ListItem>
                                    <ListItem><Wc fontSize= 'large'></Wc><Typography variant="body1" color="black" >{`Sexo: ${client.sex} `}</Typography></ListItem>
                                    <ListItem><Cake fontSize= 'large'></Cake><Typography variant="body1" color="black" >{`Fecha de Nacimiento: ${client.birthday} `}</Typography></ListItem>                           
                                </Stack>
                                <Divider />
                            </Box>
                            <Box container item justifyContent="left" marginLeft={3} paddingTop={2}>
                                <Typography variant="h4">{'Datos de contacto'}</Typography>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={8}>
                                    <ListItem><Email fontSize= 'large'></Email><Typography variant="body1" color="black" >{`Email: ${client.email} `}</Typography></ListItem>
                                    <ListItem><Phone fontSize= 'large'></Phone><Typography variant="body1" color="black" >{`Telefono: ${client.phone} `}</Typography></ListItem>
                                    <ListItem><Home fontSize= 'large'></Home><Typography variant="body1" color="black" >{`Direccion: ${client.address} `}</Typography></ListItem>
                                    <ListItem><LocationCity fontSize= 'large'></LocationCity><Typography variant="body1" color="black" >{`Ciudad: ${client.city} `}</Typography></ListItem>
                                </Stack>       
                            </Box>
                        </>
                    }     
                </Paper>                   
            </Box>
        </Container>
    );
  }

  const genders = [
    "Otro",
    "Masculino",
    "Femenino"
]