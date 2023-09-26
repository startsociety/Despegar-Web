def client_mapper(client_data):
    return {
        "id": client_data.id,
        "name": client_data.name,
        "email": client_data.email,
        "document": client_data.document,
        "phone": client_data.phone,
        "address": client_data.address,
        "city": client_data.city,
        "birthday": str(client_data.birthday),
        "sex": client_data.sex
    }


def flight_mapper(flight_data, origin_airport_data, destination_airport_data):
    return {
        "id": flight_data.id,
        "departure_datetime": str(flight_data.departure_datetime),
        "arrival_datetime": str(flight_data.arrival_datetime),
        "origin": airport_mapper(origin_airport_data),
        "destination": airport_mapper(destination_airport_data),
        "flight_time": str(flight_data.flight_time),
        "price": float(flight_data.price),
        "capacity": int(flight_data.capacity)
    }


def airport_mapper(airport_data):
    return {
        "id": airport_data.id,
        "code": airport_data.code,
        "name": airport_data.name,
        "city": airport_data.city,
        "country": airport_data.country
    }


def passenger_flight_mapper(passenger_flight_data):
    return {
        "id": passenger_flight_data.id,
        "flight_id": passenger_flight_data.flight_id,
        "passenger_id": passenger_flight_data.passenger_id,
        "seat": passenger_flight_data.seat
    }


def passenger_mapper(passenger_data):
    return {
        "id": passenger_data.id,
        "name": passenger_data.name,
        "document": passenger_data.document,
        "country": passenger_data.country,
        "sex": passenger_data.sex
    }