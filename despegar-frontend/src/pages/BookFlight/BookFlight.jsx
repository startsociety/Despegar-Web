import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chip, Container } from "@mui/material";
import { flightPresenter } from "../../presenter/FlightPresenter";

export const BookFlight = (props) => {
  
  const { getSeatingFlight } = flightPresenter();

  const {booking, setBooking, selectedSeating, setSelectedSeating, type } = props
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

      selectedSeating.push(position)
    }else{
      const newSelectedSeating  = selectedSeating.filter((post) => post !== position);

      setSelectedSeating(newSelectedSeating)
      newSeating[rowIndex][columnIndex].status = 1;
     
      if(type == 'back'){
        newBooking["selectedSeatingBack"] = newSelectedSeating
      }else{
        newBooking["selectedSeating"] = newSelectedSeating
      }

      setBooking(newBooking)
    }
    setSeating(newSeating);
    console.log("booking =>", booking )
  }

  function getColor(ubication) {
    if (ubication.status === 3) {
      return "#3cbabf";

    }else if(selectedSeating.includes(ubication.position)){
      ubication.status = 3
      return "#3cbabf";
    }

    return ubication.status === 1 ? "#19BA46" : "#808080";
  }

  return (
    <Container sx={{  marginTop: "2%"}}>            
      <Grid container spacing={1}>
        {seating.map((array, rowIndex) => (
          <Box marginTop={1} key={rowIndex}>
            <Grid container item spacing={2}>
              {array.map((ubication, columnIndex) => (
                <Grid item key={columnIndex}>
                  <Box marginLeft={columnIndex === 3 ? 25 : 0}>
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
      {selectedSeating.map((position, columnIndex) => (
          <body2>{position} </body2>
        ))}
    </Container>    
  );
};