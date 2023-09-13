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
