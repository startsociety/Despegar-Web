from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from datetime import time

from database import Clients, Flights

engine = create_engine('sqlite:///database.db')

Session = sessionmaker(bind=engine)
session = Session()
            
            
def insertNewFlight(departure_datetime, arrival_datetime, origin, destination, flight_time, price, capacity):
   
    new_flight = Flights (
        
        departure_datetime=departure_datetime,
        arrival_datetime=arrival_datetime,
        origin=origin,
        destination=destination,
        flight_time=flight_time,
        price=price,
        capacity=capacity
    )
    
    try:
        session.add(new_flight)
        session.commit()
        print("Nuevo vuelo insertado correctamente")
    except Exception as e:
        session.rollback()
        print("Error al insertar el vuelo:", str(e))
    finally:
        session.close()
        
def insertNewClient(name, email, document, phone, address, city, birthday, sex, password):
    
    new_client = Clients(
        name=name,
        email=email,
        document=document,
        phone=phone,
        address=address,
        city=city,
        birthday=birthday,
        sex=sex,
        password=password
    )

    try:
        session.add(new_client)
        session.commit()
        print("Nuevo cliente insertado correctamente")
    except Exception as e:
        session.rollback()
        print("Error al insertar el cliente:", str(e))
    finally:
        session.close()
            
insertNewFlight(
    departure_datetime=datetime(2023, 10, 20, 11, 30, 0),
    arrival_datetime=datetime(2023, 10, 20, 14, 0, 0),
    origin='Buenos Aires',
    destination='Salta',
    flight_time=time(2, 30),
    price=220,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 25, 9, 0, 0),
    arrival_datetime=datetime(2023, 10, 25, 11, 30, 0),
    origin='Córdoba',
    destination='Salta',
    flight_time=time(2, 30),
    price=210,
    capacity=180
)

insertNewFlight(
    departure_datetime=datetime(2023, 11, 1, 13, 0, 0),
    arrival_datetime=datetime(2023, 11, 1, 15, 30, 0),
    origin='Mendoza',
    destination='Buenos Aires',
    flight_time=time(2, 30),
    price=190,
    capacity=250
)

insertNewFlight(
    departure_datetime=datetime(2023, 11, 5, 16, 30, 0),
    arrival_datetime=datetime(2023, 11, 5, 19, 0, 0),
    origin='Salta',
    destination='Córdoba',
    flight_time=time(2, 30),
    price=230,
    capacity=220
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 10, 8, 0, 0),
    arrival_datetime=datetime(2023, 9, 10, 10, 30, 0),
    origin='Buenos Aires',
    destination='Córdoba',
    flight_time=time(2, 30),
    price=150,
    capacity=150
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 15, 9, 30, 0),
    arrival_datetime=datetime(2023, 9, 15, 12, 0, 0),
    origin='Córdoba',
    destination='Mendoza',
    flight_time=time(2, 30),
    price=200,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 20, 13, 45, 0),
    arrival_datetime=datetime(2023, 9, 20, 16, 15, 0),
    origin='Mendoza',
    destination='Salta',
    flight_time=time(2, 30),
    price=250,
    capacity=250
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 25, 11, 0, 0),
    arrival_datetime=datetime(2023, 9, 25, 13, 30, 0),
    origin='Salta',
    destination='Buenos Aires',
    flight_time=time(2, 30),
    price=180,
    capacity=180
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 11, 7, 30, 0),
    arrival_datetime=datetime(2023, 9, 11, 10, 0, 0),
    origin='Buenos Aires',
    destination='Mendoza',
    flight_time=time(2, 30),
    price=200,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 30, 14, 0, 0),
    arrival_datetime=datetime(2023, 9, 30, 16, 30, 0),
    origin='Buenos Aires',
    destination='Bariloche',
    flight_time=time(2, 30),
    price=280,
    capacity=180
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 5, 10, 0, 0),
    arrival_datetime=datetime(2023, 10, 5, 12, 30, 0),
    origin='Córdoba',
    destination='Bariloche',
    flight_time=time(2, 30),
    price=260,
    capacity=150
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 10, 8, 30, 0),
    arrival_datetime=datetime(2023, 10, 10, 11, 0, 0),
    origin='Mendoza',
    destination='Córdoba',
    flight_time=time(2, 30),
    price=180,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 15, 15, 0, 0),
    arrival_datetime=datetime(2023, 10, 15, 17, 30, 0),
    origin='Salta',
    destination='Mendoza',
    flight_time=time(2, 30),
    price=210,
    capacity=220
)

insertNewClient(
    name='Juan Pérez',
    email='juan.perez@example.com',
    document='12345678',
    phone='555-1234',
    address='Calle Falsa 123',
    city='Buenos Aires',
    birthday=datetime(1990, 5, 15),
    sex='Masculino',
    password='clave123'
)

insertNewClient(
    name='María Rodríguez',
    email='maria.rodriguez@example.com',
    document='98765432',
    phone='555-5678',
    address='Av. Principal 456',
    city='Córdoba',
    birthday=datetime(1985, 7, 20),
    sex='Femenino',
    password='contrasena456'
)

insertNewClient(
    name='Carlos Gómez',
    email='carlos.gomez@example.com',
    document='34567890',
    phone='555-7890',
    address='Ruta 10, Km 15',
    city='Mendoza',
    birthday=datetime(1992, 3, 10),
    sex='Masculino',
    password='miclave789'
)

insertNewClient(
    name='Laura Martínez',
    email='laura.martinez@example.com',
    document='56789012',
    phone='555-2345',
    address='Plaza Central 789',
    city='Salta',
    birthday=datetime(1988, 11, 30),
    sex='Femenino',
    password='secreto987'
)


