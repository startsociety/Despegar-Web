import axios from "axios"

export const airportPresenter = () => {

    const baseUrl = import.meta.env.VITE_REACT_BACKEND_URL

    const getAirports = async () => {
        try {
            const res = await axios.get(`${baseUrl}/airports`);
            const result = await res.data;

            return result
        } catch (err) {
            console.error(err)
        }
    }

    return {
        getAirports,
    }
}