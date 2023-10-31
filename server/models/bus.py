from .dbconfig import db
from datetime import datetime
from sqlalchemy.orm import validates
class Bus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    number_plate=db.Column(db.String(),unique=True,nullable=False)
    # name = db.Column(db.String(10),nullable=True)
    # img_url=db.Column(db.String(),nullable=True)
    route_id=db.Column(db.Integer,db.ForeignKey('route.id'),nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    available_seats = db.Column(db.Integer, nullable=False)
    driver=db.Column(db.String(20),nullable=False)
    departure_time=db.Column(db.DateTime,default=datetime.utcnow())
    # return_time = db.Column(db.DateTime, nullable=True)
    # cost_per_seat = db.Column(db.Float, nullable=False)
    # start_point = db.Column(db.String(50), nullable=False)
    # end_point = db.Column(db.String(50), nullable=False)
    # routes=db.relationship('Route',backref='bus')
    def __init__(self, number_plate, route_id, owner_id, capacity, driver, departure_time):
        self.number_plate = number_plate
        self.route_id = route_id
        self.owner_id = owner_id
        self.capacity = capacity
        self.available_seats = capacity  
        self.driver = driver
        self.departure_time = departure_time
    
    @validates('capacity')
    def validate_capacity(self,key,capacity):
        if not(14<=capacity<=80):
            raise ValueError("Number of seats should be between 14 and 70")
        return capacity
    @validates('available_seats')
    def validate_available_seats(self, key, available_seats):
        if not (1 <= available_seats <= self.capacity):
            raise ValueError("Available Seats must be between 1 and capacity Of the Bus")
        return available_seats
    
    def __repr__(self):
        return self.name