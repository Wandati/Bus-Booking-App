from .dbconfig import db

class Bus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10),nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    number_of_seats = db.Column(db.Integer, nullable=False)
    driver=db.Column(db.String(20),nullable=False)
    # cost_per_seat = db.Column(db.Float, nullable=False)
    # start_point = db.Column(db.String(50), nullable=False)
    # end_point = db.Column(db.String(50), nullable=False)
    routes=db.relationship('Route',backref='bus')
    
    def __repr__(self):
        return self.name