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
                    origin: filter.origin != "" ? filter.origin : null,
                    destination: filter.destination != "" ? filter.destination : null,
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

    const getSeatingFlight = async () => {
        return getSeatingMock()
    }

    return {
        getFlights,
        getSeatingFlight,
        getById,
    }
}