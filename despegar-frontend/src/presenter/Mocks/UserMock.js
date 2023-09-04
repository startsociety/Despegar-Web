import { useState } from "react"

export const userPresenterMock = () => {

    const res = {
        user : {
            "id": 1,
            "name": "testname",
            "email": "user@email.com",
            "document": "11222333",
            "phone": "+541111111111",
            "address": "calle falsa 123",
            "city": "springfield",
            "birthday": '1/1/1990',
            "sex": "male",
          }
    }

    const getMock = () => {
        return res   
    }

    return {
        getMock
    }
}