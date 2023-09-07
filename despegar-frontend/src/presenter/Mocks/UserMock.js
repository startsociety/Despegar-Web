import { useState } from "react"

export const userPresenterMock = () => {

    const res = {
        user : {
            "id": 4,
            "name": "Laura Martínez",
            "email": "laura.martinez@example.com",
            "document": 56789012,
            "phone": "555-2345",
            "address": "Plaza Central 789",
            "city": "Salta",
            "birthday": "1988-11-30",
            "sex": "Femenino"
        }
    }

    const getMock = () => {
        return res   
    }

    return {
        getMock
    }
}