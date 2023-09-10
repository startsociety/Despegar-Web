import axios from "axios"
import {flightPresenterMock} from './Mocks/FlightMock'

export const flightPresenter = () => {

    const useMock = import.meta.env.VITE_REACT_BACKEND_MOCK
    const baseUrl = import.meta.env.VITE_REACT_BACKEND_URL

    const {getMock} = flightPresenterMock()

    const getFlights = async (from, to) => {
        try {

            if(useMock == 'true'){
                return getMock()
            }

            const res = await axios.get(`${baseUrl}/flights`, {
                params: {
                    from: from,
                    to: to
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

    return {
        getFlights,
        getById
    }
}