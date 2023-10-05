import React, {useEffect, useState} from "react";
import { Box, FormControl, Grid, Input, InputAdornment, InputLabel, Paper, Stack, TextField } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BadgeIcon from '@mui/icons-material/Badge';
import ef_method from '../../assets/ef_method.png'
import card_method from '../../assets/card_method.png'
import mercado_pago from '../../assets/mercado_pago.png'

export const PayFlight = (props) => {
  
    const QR_IMAGE = "https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1kG1KDxRppNGFRARSd1kPFtme2iyKaSyz%2Fedit%23gid%3D1929463467&chs=180x180&choe=UTF-8&chld=L|2"
    const [code, setCode] = React.useState(generarCodigo());
    const { booking, payment_method, expandedAccordion, setExpandedAccordion } = props;

    const handleChange = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : null);
    };

    function generarCodigo() {
        const pre = Math.floor(Math.random() * 900) + 100; 
        const sub = Math.floor(Math.random() * 900) + 100;
        
        return `${pre}-${sub}`;
    }
    

    return (
        <Grid container rowSpacing={1} sx={{justifyContent:'center', marginTop:"30px", marginBottom:"30px"}}>
            <Stack spacing={3} sx={{justifyContent:'center'}}>
                <Box sx={{ color:'purple'}}>
                    <h1 style={{fontFamily: 'sans-serif',fontWeight: 700, letterSpacing: 3, color: 'purple'}}>
                        Pagar vuelo
                    </h1>
                </Box>
                <Stack direction="row" spacing={3} alignItems={"center"} justifyContent={"start"}>
                    <div>
                        <Accordion expanded={expandedAccordion === payment_method.Tarjeta} onChange={handleChange(payment_method.Tarjeta)} sx={{justifyContent:'center', alignItems:'center'}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Tarjeta
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Credito / Debito</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{justifyContent:'center', alignItems:'center'}}>
                                    <Grid sx={{ m: 1, paddingRight:"10px", paddingLeft:"10px" }}>
                                        <FormControl fullWidth sx={{ m: 1, marginRight:"10px" }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-amount">Numero de la tarjeta</InputLabel>
                                            <Input
                                                id="standard-adornment-amount"
                                                startAdornment={<CreditCardIcon position="start" />}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Stack direction={"row"} fullWidth justifyContent={"space-between"} sx={{ m: 1, paddingRight:"10px", paddingLeft:"10px" }}>
                                        <FormControl fullWidth sx={{ m: 1, marginRight:"10px" }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-amount"> Mes de vencimiento </InputLabel>
                                            <Input
                                                id="standard-adornment-amount"
                                                startAdornment={<CalendarMonthIcon position="start"/>}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{ m: 1, marginRight:"10px" }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-amount">CVC</InputLabel>
                                            <Input
                                                id="standard-adornment-amount"
                                                startAdornment={<FormatListNumberedIcon position="start">3 digitos</FormatListNumberedIcon>}
                                            />
                                        </FormControl>
                                    </Stack>
                                    <Grid sx={{ m: 1, paddingRight:"10px", paddingLeft:"10px" }}>
                                        <FormControl fullWidth sx={{ m: 1, marginRight:"10px" }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-amount">Nombre que figura en la tarjeta</InputLabel>
                                            <Input
                                                id="standard-adornment-amount"
                                                startAdornment={<BadgeIcon position="start" />}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Box sx={{justifyContent: 'center', marginBottom:"20px", display: 'flex', alignItems: 'center'}}>
                                        <img src={card_method} width={"207.6"} height={"87.2"}></img>
                                    </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expandedAccordion === payment_method.Efectivo} onChange={handleChange(payment_method.Efectivo)}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Efectivo</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                              {`Llévalo tu codigo a cualquier punto de pago de RappiPago o PagoFacil para completar tu transacción.
                                Presenta el código al cajero para realizar el pago.
                                Recuerda que este código es válido solo para esta transacción y asegúrate de pagarlo dentro del plazo indicado en tu orden de compra.`}
                            </Typography>

                            <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center',  marginTop: "25px" }}>
                                <Stack>
                                    <Typography marginTop={"5px"} marginBottom={"15px"}  fontWeight="bold" fontSize="1.5rem">
                                        {`Tu código es: ${code}`}
                                    </Typography>
                                    <img src={ef_method} width={"257.58"} height={"84.24"} alt="Efectivo Método" />
                                </Stack>
                            </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expandedAccordion === payment_method.MercadoPago} 
                                   sx={{justifyContent:"center", alignSelf:"center"}}
                                   onChange={handleChange(payment_method.MercadoPago)}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Mercado Pago
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Pago por QR
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{justifyContent:"center", alignItems:"center"}}>
                            <Typography>
                                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1}>   
                                    Escanea el QR para finalizar el pago desde la App!                                 
                                    <img src={mercado_pago} width={"207.6"} height={"87.2"}></img>
                                </Stack>                                
                            </Typography>
                                <Box sx={{justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                                    <img
                                        src={QR_IMAGE}
                                        width={"250px"}
                                        height={"250px"}
                                        alt="QR Code"
                                        style={{
                                            border: '4px solid blue', 
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expandedAccordion === payment_method.Cripto} 
                                   disabled="true"
                                   sx={{justifyContent:"center", alignSelf:"center"}}
                                   onChange={handleChange(payment_method.Cripto)}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Criptomonedas (BTC/USDT)
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {"Proximamente!"}
                            </Typography>
                            </AccordionSummary>
                        </Accordion>
                    </div>
                </Stack>
            </Stack>
        </Grid>
    );

  }