from flask import Flask, request, Response
from flask_cors import CORS
from sqlalchemy import or_, and_
from datetime import datetime
import json
import logging
import jwt

from database import db_session, Clients, Flights, PassengerFlights, Airports, Passengers
from config import get_env_vars
from mappers import *


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# @app.before_request
def check_authentication():
    try:
        if request.path not in get_env_vars("PUBLIC_ROUTES"):
            if request.headers.get('Authorization') is None:
                return Response(json.dumps({"error": 'Missing authorization token'}), status=401, mimetype='application/json')

            access_token = request.headers.get('Authorization')
            jwt.decode(access_token.split(" ")[1], get_env_vars("JWT_PUBLIC_KEY"), options={
                       "verify_signature": True}, algorithms=["RS256"])
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=401, mimetype='application/json')


@app.route("/signin", methods=["POST"])
def signin():
    try:
        response = None

        email = request.form.get("email")
        password = request.form.get("password")

        existing_user = Clients.query.filter(
            and_(Clients.email == email, Clients.password == password)).first()

        if (existing_user):
            response = Response(json.dumps(
                {"user": client_mapper(existing_user)}), status=200, mimetype='application/json')
            # access_token = jwt.encode({
            #     "exp": int(time.time()+3600),
            #     "email": existing_user.email
            # }, get_env_vars("JWT_PRIVATE_KEY"), algorithm='RS256')

            # response = Response(json.dumps(
            #     {"access_token": access_token, "type": "Bearer"}), status=200, mimetype='application/json')
        else:
            response = Response('Invalid credentials or non-existent client',
                                status=401, mimetype='application/json')

        return response

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/signup", methods=["POST"])
def signup():
    try:
        response = None

        password = request.form.get("password")
        name = request.form.get("name")
        email = request.form.get("email")
        document = int(request.form.get("document"))
        phone = request.form.get("phone")
        address = request.form.get("address")
        city = request.form.get("city")
        country = request.form.get("country")
        birthday = datetime.strptime(request.form.get("birthday"), '%d/%m/%Y')
        sex = request.form.get("sex")

        existing_client = Clients.query.filter(
            or_(Clients.document == document, Clients.email == email)).first()

        if (existing_client):
            response = Response('Client with document {} already exists'.format(
                document), status=409, mimetype='application/json')
        else:
            client = Clients(name=name, email=email, document=document, phone=phone,
                             address=address, city=city, birthday=birthday, sex=sex, password=password)

            passenger = Passengers(
                name=name, sex=sex, document=document, country=country)

            db_session.add(client)
            db_session.add(passenger)
            db_session.commit()

            client_registered = Clients.query.filter_by(
                document=document).first()

            response = Response('Client with email {} created successfully'.format(
                client_registered.document), status=201, mimetype='application/json')

        return response

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/client/<id>", methods=["GET"])
def get_client(id):
    try:
        response = None
        client_data = Clients.query.get(id)
        if client_data is None:
            response = Response('Client with id {} does not exist'.format(
                id), status=404, mimetype='application/json')
        else:
            response = Response(json.dumps(client_mapper(
                client_data)), status=200, mimetype='application/json')
        return response
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/client/<id>", methods=["PUT"])
def update_client(id):
    try:
        response = None
        name = request.form.get("name")
        email = request.form.get("email")
        document = int(request.form.get("document"))
        phone = int(request.form.get("phone"))
        address = request.form.get("address")
        city = request.form.get("city")
        birthday = datetime.strptime(request.form.get("birthday"), '%d/%m/%Y')
        sex = request.form.get("sex")

        client_data = Clients.query.get(id)
        if client_data is None:
            response = Response('Client with id {} does not exist'.format(
                id), status=200, mimetype='application/json')
        else:
            Clients.query.filter_by(id=id).update(dict(
                name=name, email=email, document=document, phone=phone, address=address, city=city, birthday=birthday, sex=sex))
            db_session.commit()
            response = Response('Client with id {} updated successfully'.format(
                id), status=200, mimetype='application/json')

        return response

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/client/<id>", methods=["DELETE"])
def delete_client(id):
    try:
        response = None
        client_data = Clients.query.get(id)
        if client_data is None:
            response = Response('Client with id {} does not exist'.format(
                id), status=200, mimetype='application/json')
        else:
            db_session.delete(client_data)
            db_session.commit()
            response = Response('Client with id {} deleted successfully'.format(
                id), status=200, mimetype='application/json')

        return response

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/clients", methods=["GET"])
def get_clients():
    try:
        clients = Clients.query.all()
        response = []
        for client in clients:
            response.append(client_mapper(client))
        return Response(json.dumps(response), status=200, mimetype='application/json')

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/flight/<id>", methods=["GET"])
def get_flight(id):
    try:
        response = None
        flight_data = Flights.query.get(id)
        if flight_data is None:
            response = Response('Flight with id {} does not exist'.format(
                id), status=404, mimetype='application/json')
        else:
            origin_airport_data = Airports.query.get(flight_data.origin)
            destination_airport_data = Airports.query.get(
                flight_data.destination)
            response = Response(json.dumps(flight_mapper(
                flight_data, origin_airport_data, destination_airport_data)), status=200, mimetype='application/json')
        return response
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/flights", methods=["GET"])
def get_flights():
    try:
        filters = set()

        if request.args.get("from") and request.args.get("to"):
            date_from = datetime.strptime(request.args.get("from"), '%Y-%m-%d')
            date_to = datetime.strptime(request.args.get("to"), '%Y-%m-%d')
            filters.add(Flights.departure_datetime.between(date_from, date_to))

        elif request.args.get("from"):
            date_from = datetime.strptime(request.args.get("from"), '%Y-%m-%d')
            date_to = datetime.strptime("12/12/2999", '%d/%m/%Y')
            filters.add(Flights.departure_datetime.between(date_from, date_to))

        elif request.args.get("to"):
            date_to = datetime.strptime(request.args.get("to"), '%Y-%m-%d')
            now = datetime.now()
            filters.add(Flights.departure_datetime.between(now, date_to))

        if request.args.get("origin"):
            origin = request.args.get("origin")
            filters.add(Flights.origin == origin)

        if request.args.get("destination"):
            destination = request.args.get("destination")
            filters.add(Flights.destination == destination)

        if request.args.get("price_min") and request.args.get("price_max"):
            price_min = float(request.args.get("price_min"))
            price_max = float(request.args.get("price_max"))
            filters.add(Flights.price.between(price_min, price_max))

        elif request.args.get("price_min"):
            price_min = float(request.args.get("price_min"))
            filters.add(Flights.price.between(price_min, float(9999999999)))

        elif request.args.get("price_max"):
            price_max = float(request.args.get("price_max"))
            filters.add(Flights.price.between(float(0), price_max))

        flights = Flights.query.filter(*filters).all()

        response = []
        for flight in flights:
            origin_airport_data = Airports.query.get(flight.origin)
            destination_airport_data = Airports.query.get(flight.destination)

            response.append(flight_mapper(
                flight, origin_airport_data, destination_airport_data))
        return Response(json.dumps(response), status=200, mimetype='application/json')

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/flights-back", methods=["GET"])
def get_flights_back():
    try:
        filters = set()

        if request.args.get("origin") and request.args.get("destination"):
            origin = int(request.args.get("origin"))
            destination = int(request.args.get("destination"))
            filters.add(and_(Flights.origin == origin,
                        Flights.destination == destination))

        if request.args.get("from"):
            date_from = datetime.strptime(
                request.args.get("from"), '%Y-%m-%d %H:%M:%S')
            filters.add(Flights.arrival_datetime > date_from)

        flights = Flights.query.filter(*filters).all()

        response = []
        for flight in flights:
            origin_airport_data = Airports.query.get(flight.origin)
            destination_airport_data = Airports.query.get(flight.destination)

            response.append(flight_mapper(
                flight, origin_airport_data, destination_airport_data))
        return Response(json.dumps(response), status=200, mimetype='application/json')

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/flight/<flight_id>/seats", methods=["GET"])
def get_flight_seats(flight_id):
    try:
        all_seats = {'A1': 1, 'A2': 1, 'A3': 1, 'A4': 1, 'A5': 1, 'A6': 1,
                     'B1': 1, 'B2': 1, 'B3': 1, 'B4': 1, 'B5': 1, 'B6': 1,
                     'C1': 1, 'C2': 1, 'C3': 1, 'C4': 1, 'C5': 1, 'C6': 1,
                     'D1': 1, 'D2': 1, 'D3': 1, 'D4': 1, 'D5': 1, 'D6': 1,
                     'E1': 1, 'E2': 1, 'E3': 1, 'E4': 1, 'E5': 1, 'E6': 1,
                     'F1': 1, 'F2': 1, 'F3': 1, 'F4': 1, 'F5': 1, 'F6': 1}

        response = None

        seats_booked_query = PassengerFlights.query.filter(
            PassengerFlights.flight_id == flight_id).all()

        seats_booked_data = []

        for seat_booked_query in seats_booked_query:
            seats_booked_data.append(
                passenger_flight_mapper(seat_booked_query))

        for seat_booked_data in seats_booked_data:
            all_seats[seat_booked_data["seat"]] = 2

        response = Response(json.dumps(all_seats),
                            status=201, mimetype='application/json')
        return response

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/book-flight", methods=["POST"])
def book_flight():
    try:
        response = None

        all_seats = {'A1': 1, 'A2': 1, 'A3': 1, 'A4': 1, 'A5': 1, 'A6': 1,
                     'B1': 1, 'B2': 1, 'B3': 1, 'B4': 1, 'B5': 1, 'B6': 1,
                     'C1': 1, 'C2': 1, 'C3': 1, 'C4': 1, 'C5': 1, 'C6': 1,
                     'D1': 1, 'D2': 1, 'D3': 1, 'D4': 1, 'D5': 1, 'D6': 1,
                     'E1': 1, 'E2': 1, 'E3': 1, 'E4': 1, 'E5': 1, 'E6': 1,
                     'F1': 1, 'F2': 1, 'F3': 1, 'F4': 1, 'F5': 1, 'F6': 1}

        seats_keys = list(all_seats.keys())

        response = None

        client_id = request.json['client_id']
        flights_id = request.json['flight_id']
        passengers = request.json['passengers']
        price = request.json['price'] if 'price' in request.json else None
        discounts = request.json['discounts'] if 'discounts' in request.json else None
        payment_type = request.json['payment_type'] if 'payment_type' in request.json else None
        payment_date = datetime.strptime(
            request.json['payment_date'], '%d/%m/%Y') if 'payment_date' in request.json else None
        payment_status = request.json['payment_status'] if 'payment_status' in request.json else None

        for i in range(0, len(flights_id)):
            flight_id = flights_id[i]
            flight = Flights.query.filter_by(id=flight_id).first()

            if flight is None:
                raise ValueError(
                    "Flight with id {} does not exist".format(flight_id))

            for passenger in passengers:
                seats = passenger["seat"]

                for seat in seats:
                    seat = seat.upper()
                    if seat not in seats_keys:
                        raise ValueError('Seat is not correct')

                passenger_data = Passengers.query.filter_by(
                    document=passenger['document']).first()
                if passenger_data is None:

                    name = passenger["name"]
                    document = passenger["document"]
                    country = passenger["country"]
                    sex = passenger["sex"]

                    passenger = Passengers(
                        name=name, document=document, country=country, sex=sex)

                    db_session.add(passenger)
                    db_session.commit()

                    passenger_saved = Passengers.query.filter_by(
                        document=document).first()

                    passenger_flight = PassengerFlights(client_id=client_id, passenger_id=passenger_saved.id, flight_id=flight_id,
                                                        seat=seats[i], price=price, discounts=discounts, payment_type=payment_type, payment_date=payment_date, payment_status=payment_status)

                    db_session.add(passenger_flight)
                    db_session.commit()

                else:
                    passenger_flight = PassengerFlights(client_id=client_id, passenger_id=passenger_data.id, flight_id=flight_id,
                                                        seat=seats[i], price=price, discounts=discounts, payment_type=payment_type, payment_date=payment_date, payment_status=payment_status)

                    db_session.add(passenger_flight)
                    db_session.commit()

        response = Response("Flight was booked by {} passengers successfully".format(
            len(passengers)), status=201, mimetype='application/json')

        return response

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/airports", methods=["GET"])
def get_airports():
    try:
        airports = Airports.query.all()
        response = []
        for airport in airports:
            response.append(airport_mapper(airport))
        return Response(json.dumps(response), status=200, mimetype='application/json')

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/airport/<id>", methods=["GET"])
def get_airport(id):
    try:
        response = None
        airport_data = Airports.query.get(id)
        if airport_data is None:
            response = Response('Airport with id {} does not exist'.format(
                id), status=404, mimetype='application/json')
        else:
            response = Response(json.dumps(airport_mapper(
                airport_data)), status=200, mimetype='application/json')
        return response
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/passengers", methods=["POST"])
def new_passenger():
    try:
        response = None

        name = request.form.get("name")
        document = int(request.form.get("document"))
        country = request.form.get("country")
        sex = request.form.get("sex")

        existing_passenger = Passengers.query.filter(
            Passengers.document == document).first()

        if (existing_passenger):
            response = Response('Passenger with document {} already exists'.format(
                document), status=409, mimetype='application/json')
        else:
            passenger = Passengers(
                name=name, document=document, country=country, sex=sex)

            db_session.add(passenger)
            db_session.commit()

            passenger_registered = Passengers.query.filter_by(
                document=document).first()

            response = Response('Client with document {} created successfully'.format(
                passenger_registered.document), status=201, mimetype='application/json')

        return response

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/passenger/<id>", methods=["GET"])
def get_passenger(id):
    try:
        response = None
        passenger_data = Passengers.query.get(id)
        if passenger_data is None:
            response = Response('Passenger with id {} does not exist'.format(
                id), status=404, mimetype='application/json')
        else:
            response = Response(json.dumps(passenger_mapper(
                passenger_data)), status=200, mimetype='application/json')
        return response
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/passenger/<id>", methods=["PUT"])
def update_passenger(id):
    try:
        response = None
        name = request.form.get("name")
        document = int(request.form.get("document"))
        country = request.form.get("country")
        sex = request.form.get("sex")

        passenger_data = Passengers.query.get(id)
        if passenger_data is None:
            response = Response('Passenger with id {} does not exist'.format(
                id), status=200, mimetype='application/json')
        else:
            Passengers.query.filter_by(id=id).update(dict(
                name=name, document=document, country=country, sex=sex))
            db_session.commit()
            response = Response('Passenger with id {} updated successfully'.format(
                id), status=200, mimetype='application/json')

        return response

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/passenger/<id>", methods=["DELETE"])
def delete_passenger(id):
    try:
        response = None
        passenger_data = Passengers.query.get(id)
        if passenger_data is None:
            response = Response('Passenger with id {} does not exist'.format(
                id), status=200, mimetype='application/json')
        else:
            db_session.delete(passenger_data)
            db_session.commit()
            response = Response('Passenger with id {} deleted successfully'.format(
                id), status=200, mimetype='application/json')

        return response

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/passengers", methods=["GET"])
def get_passengers():
    try:
        passengers = Passengers.query.all()
        response = []
        for passenger in passengers:
            response.append(passenger_mapper(passenger))
        return Response(json.dumps(response), status=200, mimetype='application/json')

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.teardown_appcontext
def shutdown_session(Error=None):
    db_session.remove()


if __name__ == '__main__':
    logging.basicConfig()
    app.run(debug=True)
