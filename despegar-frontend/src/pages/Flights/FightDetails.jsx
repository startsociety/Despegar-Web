import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { flightPresenter } from '../../presenter/FlightPresenter'

import { useNavigate } from 'react-router'
import { DetailsCard } from "./DetailsCard";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  alignContent: 'center',
  p: 4,
};

export const FlightDetails = (props) => {
  const {idFlightIda, idFlightVuelta} = props

  const [open, setOpen] = useState(false);
  const [flightIda, setFlightIda] = useState({});
  const [flightVuelta, setFlightVuelta] = useState(null);
  
  const {getById} = flightPresenter()
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
        getById(idFlightIda)
        .then((res) => {
          setFlightIda(res)
        })
        .catch((err) => console.log(err));
        if(idFlightVuelta){
            getById(idFlightVuelta)
            .then((res) => {
                setFlightVuelta(res)
            })
            .catch((err) => console.log(err));
        }
    }
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toBookFlight = () => {
    handleClose()
    navigate("/book-flight")
  }

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
            <DetailsCard flight={flightIda} title='Ida'/>
            { 
                (flightVuelta) ?
                <DetailsCard flight={flightVuelta} title='Vuelta'/>
                : null
            }
            <Button size="medium" color="primary" onClick={toBookFlight}>
                Reservar
            </Button>
        </Box>
      </Modal>
    </div>
  );
}