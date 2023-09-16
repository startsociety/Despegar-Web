import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chip, Container } from "@mui/material";
import { flightPresenter } from "../../presenter/FlightPresenter";

export const BookFlight = (props) => {
  
  const { getSeatingFlight } = flightPresenter();

  const {booking, setBooking } = props
  const [seating, setSeating] = useState([[]]);

  useEffect(() => {
    getSeatingFlight()
      .then((res) => {
        setSeating(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleClick(rowIndex, columnIndex) {
    const newSeating = [...seating];
    const position = newSeating[rowIndex][columnIndex].position
    const newBooking = booking
    if(newSeating[rowIndex][columnIndex].status != 3){
      newSeating[rowIndex][columnIndex].status = 3;

      newBooking.selectedSeating.push(position)
    }else{
      const newSelectedSeating  = newBooking.selectedSeating.filter((post) => post !== position);
      newBooking["selectedSeating"] = newSelectedSeating

      setBooking(newBooking)

      newSeating[rowIndex][columnIndex].status = 1;
    }
    
    setSeating(newSeating);
  }

  function getColor(ubication) {
    if (ubication.status === 3) {
      return "#3cbabf";
    }
    else if(booking.selectedSeating.includes(ubication.position)){
      ubication.status = 3
      return "#3cbabf";
    }

    return ubication.status === 1 ? "#19BA46" : "#808080";
  }

  return (
    <Container sx={{  marginTop: "2%"}}>            
      <Grid container spacing={1}>
        {seating.map((array, rowIndex) => (
          <Box marginTop={rowIndex === 1 || rowIndex === 5 ? 5 : 1} key={rowIndex}>
            <Grid container item spacing={1}>
              {array.map((ubication, columnIndex) => (
                <Grid item key={columnIndex}>
                  <Box marginRight={columnIndex === 7 ? 5 : 0}>
                    <Chip
                      label={ubication.position}
                      disabled= {ubication.status == 2} 
                      onClick={ubication.status != 2 ? () => handleClick(rowIndex, columnIndex) : () => null}
                      sx={{
                        borderRadius: "0",
                        backgroundColor: getColor(ubication),
                        typography: "body2",
                        padding: 1,
                        textAlign: "center",
                        width: 60,
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Grid>

      <h5>Asientos selectionados:</h5>
      {booking.selectedSeating.map((position, columnIndex) => (
          <body2>{position} </body2>
        ))} 
    </Container>
    
  );

};