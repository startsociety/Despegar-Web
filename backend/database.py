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
    phone = Column(String, nullable=False)
    address = Column(String)
    city = Column(String)
    birthday = Column(Date, nullable=False)
    sex = Column(String, nullable=False)
    password = Column(String, nullable=False)


class Flights(Base):
    __tablename__ = "flights"

    id = Column(Integer, primary_key=True)
    departure_datetime = Column(DateTime, nullable=False)
    arrival_datetime = Column(DateTime, nullable=False)
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    flight_time = Column(Time, nullable=False)
    price = Column(Float, nullable=False)
    capacity = Column(Integer, nullable=False)


class ClientsFlight(Base):
    __tablename__ = "clients_flights"

    id = Column(Integer, primary_key=True)
    client_id = Column(ForeignKey("clients.id"), nullable=False)
    flight_id = Column(ForeignKey("flights.id"), nullable=False)
    seat = Column(String, nullable=False)

class Airport(Base):
    __tablename__ = "airports"

    id = Column(Integer, primary_key=True)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    country = Column(String, nullable=False)

Base.metadata.create_all(
    engine, Base.metadata.tables.values(), checkfirst=True)
