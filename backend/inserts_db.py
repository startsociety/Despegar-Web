from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from datetime import time

from database import Clients, Flights, Airports, PassengerFlights, Passengers

engine = create_engine('sqlite:///database.db')

Session = sessionmaker(bind=engine)
session = Session()


def insertNewFlight(departure_datetime, arrival_datetime, origin, destination, flight_time, price, capacity):

    new_flight = Flights(

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


def insertNewAirport(code, name, city, country, image):
    new_airport = Airports(
        code=code,
        name=name,
        city=city,
        country=country,
        image=image
    )

    try:
        session.add(new_airport)
        session.commit()
        print("Nuevo aeropuerto insertado correctamente")
    except Exception as e:
        session.rollback()
        print("Error al insertar el aeropuerto:", str(e))
    finally:
        session.close()


def insertPassengerFlights(flight_id, passenger_id, seat):
    new_passenger_flights = PassengerFlights(
        passenger_id = passenger_id,
        flight_id = flight_id,
        seat = seat
    )

    try:
        session.add(new_passenger_flights)
        session.commit()
        print("Nuevo vuelo de cliente insertado correctamente")
    except Exception as e:
        session.rollback()
        print("Error al insertar el vuelo de cliente:", str(e))
    finally:
        session.close()

def insertNewPassenger(name, document, country, sex):

    new_passenger = Passengers(
        name=name,
        document=document,
        sex=sex,
        country=country
    )

    try:
        session.add(new_passenger)
        session.commit()
        print("Nuevo pasajero insertado correctamente")
    except Exception as e:
        session.rollback()
        print("Error al insertar el pasajero:", str(e))
    finally:
        session.close()

insertNewAirport(
    code="EZE",
    name="Aeropuerto Internacional Ministro Pistarini",
    city="Buenos Aires",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1cfsLaTEhOkgMMwk-uac-A9HF0yxOySul"
)

insertNewAirport(
    code="AEP",
    name="Aeroparque Jorge Newbery",
    city="Buenos Aires",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1cfsLaTEhOkgMMwk-uac-A9HF0yxOySul"
)

insertNewAirport(
    code="COR",
    name="Aeropuerto Internacional Ingeniero Ambrosio Taravella",
    city="Córdoba",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1wpRLBTNFgedeGnfTvZQgcgcMrK29v4Vd"
)

insertNewAirport(
    code="MDQ",
    name="Aeropuerto Internacional Astor Piazzolla",
    city="Mar del Plata",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1_XM00QPIDBFZcabuuEZp6-UwrxDECvCL"
)

insertNewAirport(
    code="SLA",
    name="Aeropuerto Internacional Martín Miguel de Güemes",
    city="Salta",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1xKA6tsRS2V_ilQNVSQob2OvYsxPJI0nU"
)

insertNewAirport(
    code="ROS",
    name="Aeropuerto Internacional Rosario - Islas Malvinas",
    city="Rosario",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1Hg-Uv7W3w0YY8gc01-xGG4crEuE-O0sa"
)

insertNewAirport(
    code="FTE",
    name="Aeropuerto Internacional El Calafate",
    city="El Calafate",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1qJsVoBzr5Y57JC_kMpheU4W1k_N1rGSD"
)

insertNewAirport(
    code="IGR",
    name="Aeropuerto Internacional Cataratas del Iguazú",
    city="Puerto Iguazú",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1xwVYBpPd3xhvExiHdFnYrzPsO4sqPAH2"
)

insertNewAirport(
    code="USH",
    name="Aeropuerto Internacional Malvinas Argentinas",
    city="Ushuaia",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1JAJ22RyXD-QeDE7ZgEgi8f2JJuKUVkFu"
)

insertNewAirport(
    code="BRC",
    name="Aeropuerto Internacional San Carlos de Bariloche",
    city="San Carlos de Bariloche",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1SeOBGQ1Mw4UrPxugK5gkoq5lxJMEJ3fe"
)

insertNewAirport(
    code="BHI",
    name="Aeropuerto Internacional Comandante Espora",
    city="Bahía Blanca",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1v1AiNnoFqP6oLl5CNF8DOsoiLovoLd-3"
)

insertNewAirport(
    code="CRD",
    name="Aeropuerto Internacional General E. Mosconi",
    city="Comodoro Rivadavia",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1ZcpndF7JFPa33oWUxyirn6FwQiG2G553"
)

insertNewAirport(
    code="RGA",
    name="Aeropuerto Internacional Piloto Civil Norberto Fernández",
    city="Río Grande",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=170E95dY9PMYYfdop0S9KhNTqqmmzzKWB"
)

insertNewAirport(
    code="LUQ",
    name="Aeropuerto Internacional Brigadier Mayor César Raúl Ojeda",
    city="San Luis",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1fAbaLkW5-Tc-jKwV4B1eTwqRBADiVphB"
)

insertNewAirport(
    code="FMA",
    name="Aeropuerto Internacional Formosa",
    city="Formosa",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1jLDyCh3idN0KSFRnYSjlGS02PEyTHBFA"
)

insertNewAirport(
    code="NQN",
    name="Aeropuerto Internacional Presidente Perón",
    city="Neuquén",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1ZYEWXXVMGMHjq-21dz9rKr_-PPCMyYV8"
)

insertNewAirport(
    code="PMY",
    name="Aeropuerto Internacional General Enrique Mosconi",
    city="Puerto Madryn",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1tL-Z7YG8WId2iJ9cTu-4fg_Lxx5hKuUo"
)

insertNewAirport(
    code="TCN",
    name="Aeropuerto General Fernández Oro",
    city="Cipolletti",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1Oekz10enCXKAlJOJLUE0OKBo1nd9Uwyd"
)

insertNewAirport(
    code="RSA",
    name="Aeropuerto Internacional Santa Rosa",
    city="Santa Rosa",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=1AVJZ9yVMGCHOMIAODLPf_son1mwexrFe"
)

insertNewAirport(
    code="REL",
    name="Aeropuerto Internacional Almirante Marcos A. Zar",
    city="Trelew",
    country="Argentina",
    image="https://drive.google.com/uc?export=view&id=165bNEMVDMURBZKEiUwaJFToI-RK2BBxZ"
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 20, 11, 30, 0),
    arrival_datetime=datetime(2023, 10, 20, 14, 0, 0),
    origin=1,
    destination=3,
    flight_time=time(2, 30),
    price=220,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 22, 11, 30, 0),
    arrival_datetime=datetime(2023, 10, 22, 14, 0, 0),
    origin=3,
    destination=1,
    flight_time=time(2, 30),
    price=220,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 28, 18, 30, 0),
    arrival_datetime=datetime(2023, 10, 28, 22, 0, 0),
    origin=3,
    destination=1,
    flight_time=time(2, 30),
    price=220,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 25, 9, 0, 0),
    arrival_datetime=datetime(2023, 10, 25, 11, 30, 0),
    origin=2,
    destination=4,
    flight_time=time(2, 30),
    price=210,
    capacity=180
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 29, 14, 0, 0),
    arrival_datetime=datetime(2023, 10, 29, 16, 30, 0),
    origin=2,
    destination=4,
    flight_time=time(2, 30),
    price=210,
    capacity=180
)

insertNewFlight(
    departure_datetime=datetime(2023, 11, 1, 13, 0, 0),
    arrival_datetime=datetime(2023, 11, 1, 15, 30, 0),
    origin=3,
    destination=1,
    flight_time=time(2, 30),
    price=190,
    capacity=250
)

insertNewFlight(
    departure_datetime=datetime(2023, 11, 15, 13, 0, 0),
    arrival_datetime=datetime(2023, 11, 15, 15, 30, 0),
    origin=1,
    destination=3,
    flight_time=time(2, 30),
    price=190,
    capacity=250
)

insertNewFlight(
    departure_datetime=datetime(2023, 11, 5, 16, 30, 0),
    arrival_datetime=datetime(2023, 11, 5, 19, 0, 0),
    origin=14,
    destination=12,
    flight_time=time(2, 30),
    price=230,
    capacity=220
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 10, 8, 0, 0),
    arrival_datetime=datetime(2023, 9, 10, 10, 30, 0),
    origin=11,
    destination=10,
    flight_time=time(2, 30),
    price=150,
    capacity=150
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 15, 9, 30, 0),
    arrival_datetime=datetime(2023, 9, 15, 12, 0, 0),
    origin=16,
    destination=7,
    flight_time=time(2, 30),
    price=200,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 22, 9, 30, 0),
    arrival_datetime=datetime(2023, 9, 22, 12, 0, 0),
    origin=7,
    destination=16,
    flight_time=time(2, 30),
    price=200,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 20, 13, 45, 0),
    arrival_datetime=datetime(2023, 9, 20, 16, 15, 0),
    origin=4,
    destination=1,
    flight_time=time(2, 30),
    price=250,
    capacity=250
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 25, 11, 0, 0),
    arrival_datetime=datetime(2023, 9, 25, 13, 30, 0),
    origin=10,
    destination=19,
    flight_time=time(2, 30),
    price=180,
    capacity=180
)

insertNewFlight(
    departure_datetime=datetime(2023, 11, 11, 7, 30, 0),
    arrival_datetime=datetime(2023, 11, 11, 10, 0, 0),
    origin=4,
    destination=8,
    flight_time=time(2, 30),
    price=200,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 9, 30, 14, 0, 0),
    arrival_datetime=datetime(2023, 9, 30, 16, 30, 0),
    origin=11,
    destination=12,
    flight_time=time(2, 30),
    price=280,
    capacity=180
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 5, 10, 0, 0),
    arrival_datetime=datetime(2023, 10, 5, 12, 30, 0),
    origin=9,
    destination=5,
    flight_time=time(2, 30),
    price=260,
    capacity=150
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 10, 8, 30, 0),
    arrival_datetime=datetime(2023, 10, 10, 11, 0, 0),
    origin=6,
    destination=7,
    flight_time=time(2, 30),
    price=180,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 25, 14, 30, 0),
    arrival_datetime=datetime(2023, 10, 25, 18, 0, 0),
    origin=7,
    destination=6,
    flight_time=time(2, 30),
    price=180,
    capacity=200
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 15, 15, 0, 0),
    arrival_datetime=datetime(2023, 10, 15, 17, 30, 0),
    origin=8,
    destination=9,
    flight_time=time(2, 30),
    price=210,
    capacity=220
)

insertNewFlight(
    departure_datetime=datetime(2023, 10, 20, 22, 0, 0),
    arrival_datetime=datetime(2023, 10, 20, 23, 50, 0),
    origin=9,
    destination=8,
    flight_time=time(2, 30),
    price=260,
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


insertNewPassenger(
    name='Juan Pérez',
    document='12345678',
    country='Argentina',
    sex='Masculino'
)

insertNewPassenger(
    name='María Rodríguez',
    document='98765432',
    sex='Femenino',
    country='Argentina'
)

insertNewPassenger(
    name='Carlos Gómez',
    document='34567890',
    sex='Masculino',
    country='Argentina'
)

insertNewPassenger(
    name='Laura Martínez',
    document='56789012',
    country='Argentina',
    sex='Femenino'
)

insertPassengerFlights(
    passenger_id=1,
    flight_id=3,
    seat='A1'
)

insertPassengerFlights(
    passenger_id=2,
    flight_id=3,
    seat='B2'
)

insertPassengerFlights(
    passenger_id=3,
    flight_id=3,
    seat='C4'
)

insertPassengerFlights(
    passenger_id=4,
    flight_id=3,
    seat='F1'
)