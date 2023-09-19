import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { flightPresenter } from '../../presenter/FlightPresenter'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useNavigate } from 'react-router'
import { DetailsCard } from "./DetailsCard";
import { Card, CardContent, Checkbox, Paper, Stack, Typography, } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  alignItems: 'center',
  p: 4,
};

export const FlightDetails = (props) => {
  const {idFlightIda} = props

  const [open, setOpen] = useState(false);
  const [flightIda, setFlightIda] = useState(null);
  const [flightBacks, setFlightBacks] = useState(null);
  const [origin, setOrigin] =  useState("");
  const [destination, setDestination] =  useState("");

  const {getById, getFlightsBack} = flightPresenter()
  const navigate = useNavigate();

  const [flightVueltaId, setFlightVueltaId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = (id) => {
    if (isChecked && flightVueltaId === id) {
      setIsChecked(false);
      setFlightVueltaId(null);
    } else {
      setIsChecked(true);
      setFlightVueltaId(id);
    }
  };

  useEffect(() => {
    if (open) {
        getById(idFlightIda)
        .then((res) => {
          setFlightIda(res)
          setOrigin(res.origin)
          setDestination(res.destination)
          getFlightsBack(res.id, null)
          .then((response) => {
            setFlightBacks(response)            
          })
          .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toBookFlight = () => {
    handleClose()
    const queryParams = {
      flightId: flightIda?.id,
      flightBackId: flightVueltaId,
    };
  
    const url = `/book-flight/${queryParams.flightId}/${queryParams.flightBackId}`;
    console.log("url =>", url)
    navigate(url);
  }

  const arrow = (
    <Box
      component="span"
      sx={{ alignSelf:'flex-end', justifySelf:'end', display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      <CompareArrowsIcon/> 
    </Box>
  );

  return (
    <div>
      <Button onClick={handleOpen} size="small" color="primary">Ver detalles</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            <Typography variant="h6" sx={{alignSelf:"center"}} component="h2">
              {`${origin.city}`} {arrow} {`${destination.city}`}
            </Typography>

            { flightIda ?
              <DetailsCard flight={flightIda} title='Ida'/>
              :
              null
            }
            
            <Card variant="outlined" elevation={3} sx={{ marginTop: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                      {`Vuelta: ${destination.code}`} {arrow} {`${origin.code}`}
                  </Typography>
                  {
                    (flightBacks != null && flightBacks.length > 0) ? flightBacks.slice(0, 3).map((flight) =>{
                    return (
                      <Paper elevation={1} sx={{marginTop:"10px"}}>
                        <Stack direction="row" spacing={2} alignItems={"center"} justifyContent={"start"}>
                        <Checkbox
                          checked={isChecked && flightVueltaId === flight.id}
                          onClick={() => handleCheckboxClick(flight.id)}
                        />
                          {`${flight.origin.name} a las ${flight.departure_datetime}` }
                        </Stack>
                      </Paper>
                      )
                    })
                    : 
                    <Typography sx={{marginTop:"10px"}}>
                      {`No hay vueltas disponibles.`}
                    </Typography>
                  } 
                </CardContent>
            </Card>
            <Button sx={{marginTop:"10px", alignSelf:"center"}} size="medium" color="primary" onClick={toBookFlight}>
                Reservar
            </Button>
          </Stack>       
        </Box>
      </Modal>
    </div>
  );
}