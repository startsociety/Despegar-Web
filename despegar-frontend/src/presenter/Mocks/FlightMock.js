export const flightPresenterMock = () => {

    const res = {
        recipe : {
            idUser: 1,
            userName: 'lucasambesi',
        },
        flights: [
            {
                id: 1,
                departure_datetime: '20/10/2023 11:30hs',
                arrival_datetime: '20/10/2023 14:00hs ',
                origin: 'Buenos Aires',
                destination :'Salta',
                flight_time: '2 horas 30 minutos',
                price: 220,
                capacity: 200,    
            },
            {
                id: 2,
                departure_datetime:'25/10/2023 09:00hs',
                arrival_datetime: '25/10/2023 11:30hs',
                origin: 'Córdoba',
                destination: 'Salta',
                flight_time: '2 horas 30 minutos',
                price: 210,
                capacity: 180,
            },
            {
                departure_datetime: '1/11/2023 13:00hs',
                arrival_datetime: '1/11/2023 15:30hs',
                origin: 'Mendoza',
                destination: 'Buenos Aires',
                flight_time: '2 horas 30 minutos',
                price: 190,
                capacity: 250,
            },
            {
                id: 4,
                departure_datetime: '5/11/2023 16:30hs',
                arrival_datetime: '5/11/2023 19:00hs',
                origin: 'Salta',
                destination: 'Córdoba',
                flight_time: '2 horas 30 minutos',
                price: 230,
                capacity: 220,
            },
            {
                id: 5,
                departure_datetime: '10/09/2023 8:00hs',
                arrival_datetime: '10/09/2023 10:30hs',
                origin: 'Buenos Aires',
                destination: 'Córdoba',
                flight_time: '2 horas 30 minutos',
                price: 150,
                capacity: 150,
            },
            {
                id: 6,
                departure_datetime: '15/09/2023 9:30hs',
                arrival_datetime: '15/09/2023 12:00hs',
                origin: 'Córdoba',
                destination: 'Mendoza',
                flight_time: '2 horas 30 minutos',
                price: 200,
                capacity: 200,
            },         
            {
                id: 7,
                departure_datetime: '20/09/2023 13:45hs',
                arrival_datetime: '20/09/2023 16:15hs',
                origin: 'Mendoza',
                destination: 'Salta',
                flight_time: '2 horas 30 minutos',
                price: 250,
                capacity: 250,
            },
            {
                id: 8,
                departure_datetime: '25/09/2023 11:00hs',
                arrival_datetime: '25/09/2023 13:30hs',
                origin: 'Salta',
                destination: 'Buenos Aires',
                flight_time: '2 horas 30 minutos',
                price: 180,
                capacity: 180,
            },
            {
                id: 9,
                departure_datetime: '11/09/2023 7:30hs',
                arrival_datetime: '11/09/2023 10:00hs',
                origin: 'Buenos Aires',
                destination: 'Mendoza',
                flight_time: '2 horas 30 minutos',
                price: 200,
                capacity: 200,
            },
            {
                id: 10,
                departure_datetime: '30/09/2023 14:00hs',
                arrival_datetime: '30/09/2023 16:30hs',
                origin: 'Buenos Aires',
                destination: 'Bariloche',
                flight_time: '2 horas 30 minutos',
                price:280,
                capacity:180,
            },
            {
                id: 11,
                departure_datetime: '5/10/2023 10:00hs',
                arrival_datetime:'5/10/2023 12:30hs',
                origin:'Córdoba',
                destination:'Bariloche',
                flight_time:'2 horas 30 minutos',
                price:260,
                capacity:150,
            },
            {
                id: 12,
                departure_datetime: '10/10/2023 8:30hs',
                arrival_datetime: '10/10/2023 11:00hs',
                origin:'Mendoza',
                destination:'Córdoba',
                flight_time:'2 horas 30 minutos',
                price:180,
                capacity:200,
            },
            {
                id: 13,
                departure_datetime: '15/10/2023 15:00hs',
                arrival_datetime: '15/10/2023 17:30hs',
                origin:'Salta',
                destination:'Mendoza',
                flight_time:'2 horas 30 minutos',
                price:210,
                capacity:220,
            }
        ]
    }
    
    const getMock = () => {
        return res   
    }

    return {
        getMock,
    }
}