import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export const FlightConfirm = (props) => {
  
    const { booking } = props;

    return (
    <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch', marginTop:"30px" },
        }}
        noValidate
        autoComplete="off"
    >
        <Grid container rowSpacing={1}>
            <Stack>
                <h2>Información de vuelo:</h2>
                <Stack direction="row" spacing={2} alignItems={"center"} justifyContent={"start"}>
                    {FlightInformation(booking.flight, "Vuelo de ida")}
                    <CompareArrowsIcon/> 
                    {booking.flightBack ? FlightInformation(booking.flightBack, "Vuelo de vuelta") : null}
                </Stack>
            </Stack>
        </Grid>
        <Grid container rowSpacing={1} sx={{marginTop:"30px" }}>
            <Stack>
                <h2>Información de pasajeros:</h2>
                <Stack direction="row" spacing={2} alignItems={"center"} justifyContent={"start"}>
                    {
                        booking.passengers.map((passenger, index) => (
                            PassengerInfo(passenger, index)      
                        ))
                    }
                </Stack>
            </Stack>
        </Grid>
    </Box>
    );

    function FlightInformation(flight, title) {
        return <Grid container rowSpacing={1} >
            <Paper elevation={3} sx={{minWidth:"300px", padding:"15px"}}>
                <Typography fontWeight="fontWeightBold" sx={{justifySelf:"center"}}>{title}</Typography>
                <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Origen:</Typography>
                <Typography >
                    {`(${flight.origin.code}) ${flight.origin.city}`}
                </Typography>
                <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Destino:</Typography>
                <Typography>
                    {`(${flight.destination.code}) ${flight.destination.city}`}
                </Typography>
                <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Fecha de arrivo:</Typography>
                <Typography>
                    {flight.arrival_datetime}
                </Typography>
                <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Fecha de aterrisaje:</Typography>
                <Typography>
                    {flight.departure_datetime}
                </Typography>
                <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Tiempo de vuelo:</Typography>
                <Typography>
                    {flight.flight_time}
                </Typography>
            </Paper>
        </Grid>
    }
  }

function PassengerInfo(passenger, index) {
    return <Grid container rowSpacing={1}>
        <Paper elevation={3} sx={{ minWidth: "300px", padding: "15px" }}>
            <Typography fontWeight="fontWeightBold" sx={{ justifySelf: "center" }}>{`Pasajero ${index + 1}`}</Typography>
            <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Nombre:</Typography>
            <Typography>
                {`${passenger.name}`}
            </Typography>
            <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Documento:</Typography>
            <Typography>
                {`${passenger.document}`}
            </Typography>
            <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Genero:</Typography>
            <Typography>
                {`${passenger.sex}`}
            </Typography>
            <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Pais:</Typography>
            <Typography>
                {`${passenger.country}`}
            </Typography>
            <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Asiento de ida:</Typography>
            <Typography>
                {`${passenger.seat}`}
            </Typography>
            <Typography fontWeight="fontWeightBold" marginTop={"10px"}>Asiento de vuelta:</Typography>
            <Typography>
                {`${passenger.seatBack}`}
            </Typography>
        </Paper>
    </Grid>;
}
