import { Avatar, Box, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import { Link } from "react-router-dom";
import { useLocalStorage } from '../../helpers/useLocalStorage';

export const Profile = (props) => {
  

    const [user, setUser] = useLocalStorage('user', '')

    return (
        <Container maxWidth="sm" >
            <Box display="flex" justifyContent="center" m={8} >
                <Paper elevation={0} sx={{minWidth:550, height:750, justifyContent: 'center', alignContent:'center'}}>
                    <Grid container spacing={2}>
                        <Grid container item justifyContent="center" >
                            <Box>
                                <Avatar sx={{ bgcolor: deepOrange[500], width:100, height: 100 }}>
                                    {`${user.name.substring(0,1)}`}
                                </Avatar>
                            </Box>    
                        </Grid>
                        <Grid container item justifyContent="center" >
                            <Box>
                                <Typography variant="h5" color="initial">{`${user.name} ${user.lastName}`}</Typography>
                            </Box>    
                        </Grid>
                        <Grid container item justifyContent="center" >
                            <Box>
                                <Typography variant="h6" color="gray">{`@${user.username}`}</Typography>
                            </Box>    
                        </Grid>     

                    </Grid>
                    <Box m={2}></Box>
                    <Divider></Divider>

                    {}
                </Paper>            
            </Box>
        </Container>
    );
  }