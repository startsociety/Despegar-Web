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


def flight_mapper(flight_data):
    return {
        "id": flight_data.id,
        "departure_datetime": str(flight_data.departure_datetime),
        "arrival_datetime": str(flight_data.arrival_datetime),
        "origin": str(flight_data.origin),
        "destination": str(flight_data.destination),
        "flight_time": str(flight_data.flight_time),
        "price": float(flight_data.price),
        "capacity": int(flight_data.capacity)
    }
