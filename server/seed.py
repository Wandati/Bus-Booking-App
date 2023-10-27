from app import app
from models.dbconfig import db
from models.booking import Booking
from models.user import User
from models.bus import Bus
from models.routes import Route
from faker import Faker
from werkzeug.security import generate_password_hash
from random import randint,choice as rc

with app.app_context():
    Booking.query.delete()
    Bus.query.delete()
    User.query.delete()
    Route.query.delete()
    fake = Faker()
    
    users=[]
    for _ in range(20):
        user=User(username=fake.name(),email=fake.email(),password=generate_password_hash('password'))
        users.append(user)
    db.session.add_all(users)
    db.session.commit()
    routes=[]
    for _ in range(10):
        route=Route(start_point=fake.address(),end_point=fake.address(),price=randint(100,3000))
        routes.append(route)
    db.session.add_all(routes)
    db.session.commit()
    buses=[]
    for _ in range(20):
        bus=Bus(name=fake.name(),number_plate=fake.last_name(),route_id=rc(routes).id,owner_id=rc(users).id,number_of_seats=randint(15,80),driver=fake.first_name())
        buses.append(bus)
    db.session.add_all(buses)
    db.session.commit()
    bookings=[]
    for _ in range(30):
        booking=Booking(user_id=rc(users).id,bus_id=rc(buses).id,seat_number=randint(1,60))
        bookings.append(booking)
    db.session.add_all(bookings)
    db.session.commit()
    
    
print("Seed Data Added Successfully!!!")