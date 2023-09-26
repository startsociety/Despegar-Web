import React from 'react';
import Box from '@mui/material/Box';
import { BookFlight } from './BookFlight';
import { Stack } from '@mui/material';

export function FlightSeatsReserve(flightId, booking, setBooking, selectedSeating, setSelectedSeating, flightBackId, selectedSeatingBack, setSelectedSeatingBack) {
  return <Stack>
    <Box sx={{ color: 'purple' }}>
      <h1 style={{ fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: 3, color: 'purple' }}>
        Reserve sus asientos
      </h1>
    </Box>
    {(flightId != 'null') ?
      <BookFlight title="Ida" booking={booking} setBooking={setBooking} idFlight={flightId}
        selectedSeating={selectedSeating}
        setSelectedSeating={setSelectedSeating} />
      :
      null}
    {(flightBackId != 'null') ?

      <BookFlight title="Vuelta" booking={booking} setBooking={setBooking} type='back' idFlight={flightBackId}
        selectedSeating={selectedSeatingBack}
        setSelectedSeating={setSelectedSeatingBack} />
      :
      null}
  </Stack>;
}
