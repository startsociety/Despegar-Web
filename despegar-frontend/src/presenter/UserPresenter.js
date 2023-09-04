import axios from "axios"
import {userPresenterMock} from './Mocks/UserMock'

export const userPresenter = () => {

    const useMock = import.meta.env.VITE_REACT_BACKEND_MOCK
    const baseUrl = import.meta.env.VITE_REACT_BACKEND_URL

    const { getMock } = userPresenterMock()

    const getById = async (idUser) => {
        try {

            if(useMock == 'true'){
                return getMock()
            }

            const res = await axios.get(`${baseUrl}/user`, {
                params: {
                  idUser: idUser
                }
              });

            const result = await res.data;

            return result
        } catch (err) {
            console.error(err)
        }
    }

    const login = async (username, password) => {
        try {
            if(useMock == 'true'){
                return getMock()
            }

            const body = {
                user: username,
                password: password
            }
            console.log(`${baseUrl}/user/login`, body)
            const res = await axios.post(`${baseUrl}/user/login`, body);
            
            return res;
        } catch (err) {
            console.log('err => ' , err)
        }
    }

    return {
        getById,
        login
    }
}