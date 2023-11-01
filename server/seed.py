from app import app
from models.dbconfig import db
from models.booking import Booking
from models.user import User
from models.bus import Bus
from models.routes import Route
from faker import Faker
from werkzeug.security import generate_password_hash
from random import randint,choice as rc
from datetime import datetime
    # fake = Faker()
    
    # users=[]
    # for _ in range(20):
    #     user=User(username=fake.name(),email=fake.email(),password=generate_password_hash('password'))
    #     users.append(user)
    # db.session.add_all(users)
    # db.session.commit()
    # routes=[]
    # for _ in range(10):
    #     route=Route(start_point=fake.address(),end_point=fake.address(),price=randint(100,3000))
    #     routes.append(route)
    # db.session.add_all(routes)
    # db.session.commit()
    # buses=[]
    # for _ in range(20):
    #     bus=Bus(name=fake.name(),number_plate=fake.last_name(),route_id=rc(routes).id,owner_id=rc(users).id,number_of_seats=randint(15,80),driver=fake.first_name())
    #     buses.append(bus)
    # db.session.add_all(buses)
    # db.session.commit()
    # bookings=[]
    # for _ in range(30):
    #     booking=Booking(user_id=rc(users).id,bus_id=rc(buses).id,seat_number=randint(1,60))
    #     bookings.append(booking)
    # db.session.add_all(bookings)
    # db.session.commit()

with app.app_context():
    Booking.query.delete()
    Bus.query.delete()
    User.query.delete()
    Route.query.delete()
    users_data = [
        {"username": "Admin", "email": "Admin@gmail.com", "password": "password1", "user_type": "Admin"},
        {"username": "busowner1", "email": "BusOwner1@example.com", "password": "password2", "user_type": "BusOwner"},
        {"username": "busowner2", "email": "BusOwner2@example.com", "password": "password3", "user_type": "BusOwner"},
        {"username": "busowner3", "email": "BusOwner3@example.com", "password": "password4", "user_type": "BusOwner"},
        {"username": "busowner4", "email": "BusOwner4@example.com", "password": "password9", "user_type": "BusOwner"},
        {"username": "customer1", "email": "customer1@example.com", "password": "password5", "user_type": "Customer"},
        {"username": "custome2", "email": "customer2@example.com", "password": "password6", "user_type": "Customer"},
        {"username": "customer3", "email": "customer3@example.com", "password": "password7", "user_type": "Customer"},
        {"username": "customer4", "email": "customer4@example.com", "password": "password8", "user_type": "Customer"},
        {"username": "customer5", "email": "customer5@example.com", "password": "password10", "user_type": "Customer"}
    ]

    routes_data = [
        {"start_point": "Nairobi", "end_point": "Mombasa", "price": 3000.0},
        {"start_point": "Nairobi", "end_point": "Kisumu", "price": 1500.0},
        {"start_point": "Nairobi", "end_point": "Thika", "price": 200.0},
        {"start_point": "Nairobi", "end_point": "Eldoret", "price": 2000.0},
        {"start_point": "Nairobi", "end_point": "Naivasha", "price": 1000.0},
        {"start_point": "Mombasa", "end_point": "Lamu", "price": 500.0},
        {"start_point": "Kisumu", "end_point": "Kakamega", "price": 400.0},
        {"start_point": "Kisumu", "end_point": "Kisii", "price": 500.0},
        {"start_point": "Eldoret", "end_point": "Kitale", "price": 700.0},
        {"start_point": "Machakos", "end_point": "Voi", "price": 1350.0}
    ]

    # Seed data for Buses
    buses_data = [
        {"number_plate": "KCA123A",  "route_id": 1, "owner_id": 2, "capacity": 50, "driver": "Driver A","departure_time":"2023-10-05 09:00:00"},
        {"number_plate": "KCB780B",  "route_id": 1, "owner_id": 2, "capacity": 50, "driver": "Driver B","departure_time":"2023-10-05 21:00:00"},
        {"number_plate": "KCC781C",  "route_id": 2, "owner_id": 2, "capacity": 40, "driver": "Driver C","departure_time":"2023-10-07 08:00:00"},
        {"number_plate": "KCD784D",  "route_id": 2, "owner_id": 2, "capacity": 40, "driver": "Driver D","departure_time":"2023-10-07 18:00:00"},
        {"number_plate": "KCE785E",  "route_id": 3, "owner_id": 2, "capacity": 30, "driver": "Driver E","departure_time":"2023-10-23 05:00:00"},
        {"number_plate": "KCF782F",  "route_id": 3, "owner_id": 3, "capacity": 30, "driver": "Driver F","departure_time":"2023-10-23 22:00:00"},
        {"number_plate": "KCG783G",  "route_id": 4, "owner_id": 3, "capacity": 60, "driver": "Driver G","departure_time":"2023-10-28 07:00:00"},
        {"number_plate": "KCH759H",  "route_id": 4, "owner_id": 3, "capacity": 60, "driver": "Driver H","departure_time":"2023-10-28 20:00:00"},
        {"number_plate": "KCI729I",  "route_id": 5, "owner_id": 3, "capacity": 50, "driver": "Driver I","departure_time":"2023-10-30 06:00:00"},
        {"number_plate": "KCJ509J",  "route_id": 5, "owner_id": 3, "capacity": 50, "driver": "Driver J","departure_time":"2023-10-30 23:00:00"},
        {"number_plate": "KCK229K",  "route_id": 6, "owner_id": 4, "capacity": 45, "driver": "Driver K","departure_time":"2023-11-21 06:30:00"},
        {"number_plate": "KDL349L",  "route_id": 6, "owner_id": 4, "capacity": 45, "driver": "Driver L","departure_time":"2023-11-21 00:00:00"},
        {"number_plate": "KDM369M",  "route_id": 7, "owner_id": 4, "capacity": 65, "driver": "Driver M","departure_time":"2023-11-15 05:30:00"},
        {"number_plate": "KDA720N",  "route_id": 7, "owner_id": 4, "capacity": 65, "driver": "Driver N","departure_time":"2023-11-15 19:30:00"},
        {"number_plate": "KDD300O",  "route_id": 8, "owner_id": 4, "capacity": 55, "driver": "Driver O","departure_time":"2023-11-01 04:00:00"},
        {"number_plate": "KDE600P",  "route_id": 8, "owner_id": 5, "capacity": 55, "driver": "Driver P","departure_time":"2023-11-01 17:00:00"},
        {"number_plate": "KDC724Q",  "route_id": 9, "owner_id": 5, "capacity": 60, "driver": "Driver Q","departure_time":"2023-11-20 06:00:00"},
        {"number_plate": "KDF229R",  "route_id": 9, "owner_id": 5, "capacity": 60, "driver": "Driver R","departure_time":"2023-11-20 21:00:00"},
        {"number_plate": "KDJ298T",  "route_id": 10, "owner_id": 5, "capacity": 50, "driver":"Driver S","departure_time":"2023-11-14 07:00:00"},
        {"number_plate": "KDN198T",  "route_id": 10, "owner_id": 5, "capacity": 50, "driver":"Driver T","departure_time":"2023-11-14 20:30:00"}
    ]

    bookings_data = [
        {"user_id": 6, "bus_id": 1, "seat_number": 11},
        {"user_id": 10, "bus_id": 20, "seat_number": 34},
        {"user_id": 6, "bus_id": 3, "seat_number": 1},
        {"user_id": 9, "bus_id": 17, "seat_number": 45},
        {"user_id": 8, "bus_id": 10, "seat_number": 50},
        {"user_id": 6, "bus_id": 4, "seat_number": 30},
        {"user_id": 7, "bus_id": 7, "seat_number": 22},
        {"user_id": 10, "bus_id": 5, "seat_number": 20},
        {"user_id": 6, "bus_id": 2, "seat_number": 25},
        {"user_id": 7, "bus_id": 8, "seat_number": 1},
        {"user_id": 8, "bus_id": 12, "seat_number": 60},
        {"user_id": 7, "bus_id": 9, "seat_number": 40},
        {"user_id": 9, "bus_id": 15, "seat_number": 22},
        {"user_id": 10, "bus_id": 19, "seat_number": 33},
        {"user_id": 8, "bus_id": 11, "seat_number": 30},
        {"user_id": 7, "bus_id": 6, "seat_number": 16},
        {"user_id": 8, "bus_id": 13, "seat_number": 55},
        {"user_id": 9, "bus_id": 14, "seat_number": 16},
        {"user_id": 9, "bus_id": 16, "seat_number": 37},
        {"user_id": 10, "bus_id": 18, "seat_number": 24}
    ]


    for user_data in users_data:
        password=user_data["password"]
        hashed_password=generate_password_hash(password)
        user_data["password"]=hashed_password
        user = User(**user_data)
        db.session.add(user)
    for route_data in routes_data:
        route = Route(**route_data)
        db.session.add(route)
    for bus_data in buses_data:
        # bus_data["available_seats"]-=1
        bus_data_str=bus_data["departure_time"]
        new_bus_data=datetime.strptime(bus_data_str,'%Y-%m-%d %H:%M:%S')
        bus_data["departure_time"]=new_bus_data
        # new_data=dict(bus_data)
        bus = Bus(**bus_data)
        db.session.add(bus)
        
    for bus in Bus.query.all():
        bus.available_seats-=1
    db.session.commit()
    # for bus_data in buses_data:

    #     departure_time_str = bus_data.get("departure_time")
    #     if departure_time_str:
    #         new_departure_time = datetime.strptime(departure_time_str, '%Y-%m-%d %H:%M:%S')
    #         bus_data["departure_time"] = new_departure_time

    #         bus = Bus(**bus_data)
    #         db.session.add(bus)

    for booking_data in bookings_data:
        booking = Booking(**booking_data)
        db.session.add(booking)
        


    db.session.commit()



    
print("Seed Data Added Successfully!!!")