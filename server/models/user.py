from .dbconfig import db
from sqlalchemy.orm import validates

DEFAULT_USERS=["Customer","BusOwner","Admin"]
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    user_type = db.Column(db.String(10), nullable=False,default='Customer')
    
    bookings=db.relationship('Booking',backref='user',cascade='all, delete')
    buses=db.relationship('Bus',backref='user',cascade='all, delete')
    
    @validates('user_type')
    def validate_user_type(self,key,user_type):
        if user_type not in DEFAULT_USERS:
            raise AttributeError("Users can only be Customer or BusOwner")
        return user_type
    @validates('email')
    def validate_email(self,key,email):
        if "@" not in email:
            raise ValueError("Email should contain @ ")
        return email
    
    def __repr__(self):
        return self.username
    
    