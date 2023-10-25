from .dbconfig import db
from datetime import datetime
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey('bus.id'), nullable=False)
    seat_number = db.Column(db.Integer, nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False,default=datetime.utcnow())
    return_time = db.Column(db.DateTime, nullable=True)
    is_confirmed = db.Column(db.Boolean, default=False)
    
    
    def __repr__(self):
        return f"Booking id: {self.id}"