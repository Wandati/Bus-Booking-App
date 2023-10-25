from .dbconfig import db
from datetime import datetime
from sqlalchemy.orm import validates
class Route(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bus_id=db.Column(db.Integer,db.ForeignKey('bus.id'),nullable=False)
    start_point = db.Column(db.String(50), nullable=False)
    end_point = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float,nullable=False)
    departure_time=db.Column(db.DateTime,default=datetime.utcnow())
    
    @validates('price')
    def validate_price(self,key,price):
        if not (100<=price<=3000):
            raise ValueError("Price Should be between 100 and 3000")
        return price
    
    def __repr__(self):
        return f"Start_Point: {self.start_point},End_Point: {self.end_point}"
    