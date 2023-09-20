import axios from "axios"
import {flightPresenterMock} from './Mocks/FlightMock'

export const flightPresenter = () => {

    const useMock = import.meta.env.VITE_REACT_BACKEND_MOCK
    const baseUrl = import.meta.env.VITE_REACT_BACKEND_URL

    const {getMock, getSeatingMock} = flightPresenterMock()

    const getFlights = async (filter) => {
        try {

            if(useMock == 'true'){
                return getMock().flights
            }

            console.log("filter request=>", filter)

            const res = await axios.get(`${baseUrl}/flights`, {
                params: {
                    from: filter.from ,
                    to: filter.to,
                    origin: filter.origin != null ? filter.origin.id : null,
                    destination: filter.destination != null ? filter.destination.id : null,
                    price_min: filter.price_min != null ? filter.price_min : null,
                    price_max: filter.price_max,
                    max_flight_time:filter.max_flight_time
                }
              });
              console.log(res)

            const result = await res.data;

            return result
        } catch (err) {
            console.error(err)
        }
    }

    const getById = async (idFlight) => {
        try {

            if(useMock == 'true'){
                return getMock()
            }

            const res = await axios.get(`${baseUrl}/flight/${idFlight}`);

            const result = await res.data;

            return result
        } catch (err) {
            console.error(err)
        }
    }

    const getFlightsBack = async (origin, destination) => {
        try {

            const res = await axios.get(`${baseUrl}/flights-back`, {
                params: {
                    origin: origin,
                    destination: destination ,
                }
              });


            const result = await res.data;

            return result
        } catch (err) {
            console.error(err)
        }
    }

    const getSeatingFlight = async (idFlight) => {

        try {

            const res = await axios.get(`${baseUrl}/flight/${idFlight}/seats`);

            const result = await res.data;

            let response = [];
            let amountOfElements = 0;
            let seats = []

            Object.keys(result).forEach(element => {
                amountOfElements +=1;
                
                seats.push({position: element, status: result[element]})
                
                if(amountOfElements == 6){
                    response.push(seats);
                    seats = [];
                    amountOfElements = 0;
                }
                
            });


            return response
        } catch (err) {
            console.error(err)
        }

        return getSeatingMock()
    }

    return {
        getFlights,
        getSeatingFlight,
        getById,
        getFlightsBack
    }
}