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

    const login = async (email, password) => {
        try {
            if(useMock == 'true'){
                return getMock()
            }

            const body = {
                email: email,
                password: password
            }

            const headers = 
            {
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            const res = await axios.post(`${baseUrl}/signin`, body, { headers });
            return res.data;
        } catch (err) {
            console.log('err => ' , err)
        }
    }

    const register = async (user) => {
        try {
            if(useMock == 'true'){
                return getMock()
            }

            const body = {
                "password": user.password,
                "name": user.name,
                "email": user.email,
                "document": user.document,
                "phone": user.phone,
                "address": user.address,
                "city": user.city,
                "birthday": user.bithdate,
                "sex": user.sex         
              }

            const headers = 
            {
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            const res = await axios.post(`${baseUrl}/signup`, body, { headers });
            console.log("res =>", res)
            return res.data;
        } catch (err) {
            console.log('err => ' , err)
        }
    }

    return {
        getById,
        login,
        register
    }
}