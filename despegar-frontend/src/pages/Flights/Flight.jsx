import React from "react";
import avion from '../../assets/avion.jpg'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Flight = (props) => {
   const {flight} = props

    return (
        <Card elevation={3} sx={{ maxWidth: 345, minWidth: 345, margin: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={avion}
                    alt="Vuelo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {`${flight.origin} a ${flight.destination}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {`$${flight.price}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary">
                Ver detalles
            </Button>
            </CardActions>
        </Card>
    );
  }

export default Flight;