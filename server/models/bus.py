from .dbconfig import db
from sqlalchemy.orm import validates
class Bus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    number_plate=db.Column(db.String(),unique=True,nullable=False)
    name = db.Column(db.String(10),nullable=True)
    route_id=db.Column(db.Integer,db.ForeignKey('route.id'),nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    number_of_seats = db.Column(db.Integer, nullable=False)
    driver=db.Column(db.String(20),nullable=False)
    # cost_per_seat = db.Column(db.Float, nullable=False)
    # start_point = db.Column(db.String(50), nullable=False)
    # end_point = db.Column(db.String(50), nullable=False)
    # routes=db.relationship('Route',backref='bus')
    
    @validates('number_of_seats')
    def validate_number_of_seats(self,key,number_of_seats):
        if not(14<=number_of_seats<=80):
            raise ValueError("Number of seats should be between 14 and 70")
        return number_of_seats
    
    def __repr__(self):
        return self.name