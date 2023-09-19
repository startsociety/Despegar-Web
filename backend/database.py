from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, Float, ForeignKey, Float, Time
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine("sqlite:///database.db")
db_session = scoped_session(sessionmaker(bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


class Clients(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String)
    document = Column(Integer, nullable=False)
    phone = Column(String)
    address = Column(String)
    city = Column(String)
    birthday = Column(Date)
    sex = Column(String, nullable=False)
    password = Column(String, nullable=False)


class Flights(Base):
    __tablename__ = "flights"

    id = Column(Integer, primary_key=True)
    departure_datetime = Column(DateTime, nullable=False)
    arrival_datetime = Column(DateTime, nullable=False)
    origin = Column(ForeignKey("airports.id"), nullable=False)
    destination = Column(ForeignKey("airports.id"), nullable=False)
    flight_time = Column(Time, nullable=False)
    price = Column(Float, nullable=False)
    capacity = Column(Integer, nullable=False)


class PassengerFlights(Base):
    __tablename__ = "passenger_flights"

    id = Column(Integer, primary_key=True)
    passenger_id = Column(ForeignKey("passengers.id"), nullable=False)
    flight_id = Column(ForeignKey("flights.id"), nullable=False)
    seat = Column(String, nullable=False)


class Airports(Base):
    __tablename__ = "airports"

    id = Column(Integer, primary_key=True)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    country = Column(String, nullable=False)


class Passengers(Base):
    __tablename__ = "passengers"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    document = Column(Integer, nullable=False)
    country = Column(String)
    sex = Column(String, nullable=False)


Base.metadata.create_all(
    engine, Base.metadata.tables.values(), checkfirst=True)
