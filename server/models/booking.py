from .dbconfig import db
from datetime import datetime
from sqlalchemy.orm import validates
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey('bus.id'), nullable=False)
    seat_number = db.Column(db.Integer, nullable=False)
    # departure_time = db.Column(db.DateTime, nullable=False,default=datetime.utcnow())
    # return_time = db.Column(db.DateTime, nullable=True)
    is_confirmed = db.Column(db.Boolean, default=False)
    
    @validates('seat_number')
    def validate_seat_number(self,key,seat_number):
        if not(1<=int(seat_number)<=70):
            raise ValueError("Seat number should be between 1 and 70")
        return seat_number
    
    def __repr__(self):
        return f"Booking id: {self.id}"