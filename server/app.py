from config import jwt,app,db,api
from models.booking import Booking
from models.bus import Bus
from models.user import User
from models.routes import Route
from flask_restful import Resource
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity
from flask import jsonify,request
from werkzeug.security import generate_password_hash,check_password_hash
class Home(Resource):
    def get(self):
        return {"message":"Hello World"}
    
class SignUp(Resource):
    
    def post(self):
        
        try:
            data=request.get_json()
            username=data['username']
            email=data['email']
            password1=data['password1']
            password2=data['password2']
            user_type=data['user_type']
            if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
                return {"Error":"Username Already Exists"},401
            elif not(password1 == password2):
                return {"Error":"Passwords Do not Match!!"},401
            else:
                new_user=User(username=username,email=email,password=generate_password_hash(password1),user_type=user_type)
                db.session.add(new_user)
                db.session.commit()
                return {"Message": "Sign-Up Successful!!"},201
        except Exception as e:
            return {"Errors":str(e)},401
class Login(Resource):
    def post(self):
        data=request.get_json()
        email=data['email']
        password=data['password']
        
        user=User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password,password):
            token = create_access_token(identity=user.id)
            return {"Message":"Login Successful!!","token":token},200
        else:
            return {"Error":"Invalid Username or Password!!"},401
        
class Logout(Resource):
    @jwt_required()
    def delete(self):
        return {"Message":"Logout Successful!"}
    
class Routes(Resource):
    def get(self):
        routes=[
            {
                "bus_id":route.bus_id,
                "start_point":route.start_point,
                "end_point":route.end_point,
                "price":route.price,
                "departure_time":route.departure_time.strftime('%Y-%m-%d %H:%M:%S'),
                "return_time":route.return_time.strftime('%Y-%m-%d %H:%M:%S') if route.return_time else None
            }
            for route in Route.query.all()
        ]
        return routes,200
    
class BookingList(Resource):
    @jwt_required()
    def get(self):
        user_id=get_jwt_identity()
        current_user=User.query.filter_by(id=user_id).first()
        if not current_user.bookings:
            return {"Message":"No Bookings Available.."}
        else:
            bookings=[
                {
                    "booking_id":booking.id,
                    "bus_id":booking.bus_id,
                    "user_id":booking.user_id,
                    "seat_number":booking.seat_number,
                    "departure_time":booking.departure_time.strftime('%Y-%M-%d %H:%M:%S'),
                    "return_time":booking.return_time.strftime('%Y-%M-%d %H:%M:%S') if booking.return_time else None,
                    "is_confirmed":booking.is_confirmed
                }
                
                for booking in current_user.bookings
            ]
        return bookings,200
    @jwt_required()
    def post(self):
        user_id=get_jwt_identity()
        data=request.get_json()
        bus_id=data['bus_id']
        seat_number=data['seat_number']
        is_confirmed=data['is_confirmed']
        
        bus=Bus.query.filter_by(id=bus_id).first()
        existing_booking = Booking.query.filter_by(user_id=user_id,bus_id=bus_id).first()
        if not bus:
            return {"Error":"Bus Does not exist"}
        elif existing_booking:
            return {"Error":"Booking Already Exists.."}
        else:
            new_booking=Booking(user_id=user_id,bus_id=bus_id,seat_number=seat_number,is_confirmed=is_confirmed)
            db.session.add(new_booking)
            db.session.commit()
            return {
                "booking_id":new_booking.id,
                 "user_id":new_booking.user_id,
                "bus_id":new_booking.bus_id,
                "seat_number":new_booking.seat_number,
                "departure_time":new_booking.departure_time.strftime('%Y-%M-%d %H:%M:%S'),
                "return_time":new_booking.return_time.strftime('%Y-%M-%d %H:%M:%S') if new_booking.return_time else None,
                "is_confirmed":new_booking.is_confirmed
            },201
      
class BookingById(Resource):
    @jwt_required()
    def get(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        booking=Booking.query.filter_by(id=id).first()
        if not booking:
            return {"error":"Booking does not exist"},401
        elif booking not in user.bookings:
            return {"error":"Unauthorized to perform this action."},401
        return {  
                "booking_id":booking.id,
                "user_id":booking.user_id,
                "bus_id":booking.bus_id,
                "seat_number":booking.seat_number,
                "departure_time":booking.departure_time.strftime('%Y-%M-%d %H:%M:%S'),
                "return_time":booking.return_time.strftime('%Y-%M-%d %H:%M:%S') if booking.return_time else None,
                "is_confirmed":booking.is_confirmed
        },200
    @jwt_required()
    def patch(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        booking=Booking.query.filter_by(id=id).first()
        if not booking:
            return {"error":"Booking does not exist"},401
        elif booking not in user.bookings:
            return {"error":"Unauthorized to perform this action."},401
        else:
            data=request.get_json()
            # for attr in data:
            #     setattr(booking,attr,data[attr])
            for attr in request.get_json():
                setattr(booking,attr,request.json[attr])
            db.session.add(booking)
            db.session.commit()
            return {  
                "booking_id":booking.id,
                "user_id":booking.user_id,
                "bus_id":booking.bus_id,
                "seat_number":booking.seat_number,
                "departure_time":booking.departure_time.strftime('%Y-%M-%d %H:%M:%S'),
                "return_time":booking.return_time.strftime('%Y-%M-%d %H:%M:%S') if booking.return_time else None,
                "is_confirmed":booking.is_confirmed
        },200
    @jwt_required()
    def delete(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        booking=Booking.query.filter_by(id=id).first()
        if not booking:
            return {"error":"Booking does not exist"},401
        elif booking not in user.bookings:
            return {"error":"Unauthorized to perform this action."},401
        
        db.session.delete(booking)
        db.session.commit()
        return {"message":"Booking deleted Successfully!!"},200
        
        
api.add_resource(Home,'/',endpoint='/')
api.add_resource(SignUp,'/sign_up',endpoint='/sign_up')
api.add_resource(Login,'/login',endpoint='/login')
api.add_resource(Logout,'/logout',endpoint='/logout')
api.add_resource(Routes,'/routes',endpoint='/routes')
api.add_resource(BookingList,'/bookings',endpoint='/bookings')
api.add_resource(BookingById,'/bookings/<int:id>',endpoint='/bookings/<int:id>')

    

if __name__ == "__main__":
    app.run(port=5500,debug=True)