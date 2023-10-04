import React, {useEffect} from "react";
import { Box, FormControl, Grid, Input, InputAdornment, InputLabel, Stack, TextField } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BadgeIcon from '@mui/icons-material/Badge';

export const PayFlight = (props) => {
  
    const { booking } = props;

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

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
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
                            <AccordionDetails>
                                <Grid sx={{ m: 1, paddingRight:"10px", paddingLeft:"10px" }}>
                                    <FormControl fullWidth sx={{ m: 1, marginRight:"10px" }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-amount">Numero de la tarjeta</InputLabel>
                                        <Input
                                            id="standard-adornment-amount"
                                            startAdornment={<CreditCardIcon position="start" />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Stack direction={"row"} justifyContent={"space-between"} sx={{ m: 1, paddingRight:"10px", paddingLeft:"10px" }}>
                                    <FormControl sx={{ m: 1, marginRight:"10px" }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-amount"> Mes de vencimiento </InputLabel>
                                        <Input
                                            id="standard-adornment-amount"
                                            startAdornment={<CalendarMonthIcon position="start"/>}
                                        />
                                    </FormControl>
                                    <FormControl  sx={{ m: 1, marginRight:"10px" }} variant="standard">
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
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Efectivo</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {/* metodo de pago */}
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                laoreet.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
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
                            <AccordionDetails>
                            <Typography>
                                Aca va un qr y algo mas
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Stack>
            </Stack>
        </Grid>
    );

  }