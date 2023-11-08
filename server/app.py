from config import jwt, app, db, api
from flask_cors import CORS
from models.booking import Booking
from models.bus import Bus
from models.user import User
from models.routes import Route
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime,timedelta

CORS(app)

blacklisted_tokens = set()
class Home(Resource):
    def get(self):
        return {"message":"Hello World"}
    
class SignUp(Resource):
    
    def post(self):

        try:
            data=request.get_json()
            username=data['username']
            email=data['email']
            password1=data['password']
            password2=data['confirmPassword']
            user_type=data['role']
            if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
                return {"Error":"Username Already Exists"},401
            elif not(password1 == password2):
                return {"Error":"Passwords Do not Match!!"},400
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
            token = create_access_token(identity=user.id,expires_delta=timedelta(days=7))
            blacklisted_tokens.clear()
            return {"Message":"Login Successful!!","token":token},200
        else:
            return {"Error":"Invalid Email or Password!!"},401
        
class Logout(Resource):
    @jwt_required()
    def delete(self):
        current_user = get_jwt_identity()
        blacklisted_tokens.add(current_user)
        return {"Message":"Logout Successful!"}
    
class Users(Resource):
    @jwt_required()
    def get(self):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        if not(user.user_type == "Admin"):
            return {"error":"Unauthorized"},400
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        users=[
            {
            "id":user.id,
            "username":user.username,
            "email":user.email,
            "user_type":user.user_type
            }
            for user in User.query.all()
        ]
        return users,200
class UsersById(Resource):
    @jwt_required()
    def get(self,id):
        user_id=get_jwt_identity()
        ad_user=User.query.filter_by(id=user_id).first()
        if not(ad_user.user_type == "Admin"):
            return {"error":"Unauthorized"},400
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        query_user=User.query.filter_by(id=id).first()
        if not query_user:
            return {"Error":"User does not exist!!"},401
        elif query_user.user_type == "BusOwner":
            user_details=[
                {
                    
                    "id":query_user.id,
                    "username":query_user.username,
                    "email":query_user.email,
                    "user_type":query_user.user_type,
                    "Buses":[
                        {
                            "id":bus.id,
                            "number_plate":bus.number_plate,
                            "From":Route.query.filter_by(id=bus.route_id).first().start_point,
                            "To":Route.query.filter_by(id=bus.route_id).first().end_point,
                            "Departure_Time":bus.departure_time.strftime('%Y-%M-%d %H:%M:%S '),
                            "Owner":User.query.filter_by(id=bus.owner_id).first().username,
                            "no_of_seats":bus.capacity,
                            "available_seats":bus.available_seats,
                            "driver":bus.driver,
                        }
                        for bus in query_user.buses
                    ]  
                }
            ]
            return user_details,200
        else:
            
            user_details=[
                {
                    
                    "id":query_user.id,
                    "username":query_user.username,
                    "email":query_user.email,
                    "user_type":query_user.user_type,
                    "Bookings":[
                        {
                            
                            "id":booking.id,
                            # "By":User.query.filter_by(id=booking.user_id).first().username,
                            "bus_id":booking.bus_id,
                            # "departure_time":booking.departure_time.strftime('%Y:%M:%d %H:%M:%S '),
                            "departure_time":Bus.query.filter_by(id=booking.bus_id).first().departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                            # "return_time":booking.return_time.strftime('%Y:%M:%d %H:%M:%S ') if booking.return_time else None,
                            "is_confirmed":booking.is_confirmed
                        }
                        for booking in query_user.bookings
                    ]  
                }
            ]
            return user_details,200
    @jwt_required()
    def put(self,id):
        user_id=get_jwt_identity()
        ad_user=User.query.filter_by(id=user_id).first()
        if not(ad_user.user_type == "Admin"):
            return {"error":"Unauthorized"},400
        elif user_id in  blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        query_user=User.query.filter_by(id=id).first()
        if not query_user:
            return {"Error":"User does not exist!!"},401
        
        try:
            data=request.get_json()
            user_type=data["user_type"]
            query_user.user_type=user_type
            db.session.commit()
            return{
                "username":query_user.username,
                "email":query_user.email,
                "user_type":query_user.user_type
            },200
        except Exception as e:
            return {"Error":str(e)},400
    
    @jwt_required()
    def delete(self,id):
        user_id=get_jwt_identity()
        ad_user=User.query.filter_by(id=user_id).first()
        if not(ad_user.user_type == "Admin"):
            return {"error":"Unauthorized"},400
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        query_user=User.query.filter_by(id=id).first()
        if not query_user:
            return {"Error":"User does not exist!!"},401  
        db.session.delete(query_user)
        db.session.commit()
        return {
            "Message":"User Deleted Successfully"
        },200
    
class Buses(Resource):
    @jwt_required()
    def get(self):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        if not(user.user_type == "BusOwner"):
            return {"Error":"Unauthorization error!!"},401
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        buses=[
            {
                "id":bus.id,
                # "Name":bus.name,
                "Number Plate":bus.number_plate,
                "From":Route.query.filter_by(id=bus.route_id).first().start_point,
                "To":Route.query.filter_by(id=bus.route_id).first().end_point,
                "Departure_Time":bus.departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                # "Owner":User.query.filter_by(id=bus.owner_id).first().username,
                "no_of_seats":bus.capacity,
                "available_seats":bus.available_seats,
                "driver":bus.driver
            }
            for bus in user.buses
        ]
        return buses,200
    @jwt_required()
    def post(self):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        if not(user.user_type == "BusOwner"):
            return {"Error":"Unauthorization error!!"},401
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        data=request.get_json()
        # name=data['name']
        number_plate=data['number_plate']
        route_id=data['route_id']
        seats_num=data['no_of_seats']
        driver=data['driver']
        departure_time=data['departure_time']
        route=Route.query.filter_by(id=route_id).first()
        existing_bus=Bus.query.filter_by(number_plate=number_plate).first()
        if not route:
            return{"Error":"Route does not exist!!"}
        elif existing_bus:
            return{"Error":f"Bus With Plate_No {number_plate} already exists!!"},401
        try:
            new_departure_time=datetime.strptime(departure_time,'%Y-%m-%d %H:%M:%S')
            new_bus=Bus(number_plate=number_plate,owner_id=user_id,departure_time=new_departure_time,route_id=route_id,capacity=seats_num,driver=driver)
            db.session.add(new_bus)
            db.session.commit()
            return{
                
                "id":new_bus.id,
                # "Name":new_bus.name,
                "Number_plate":new_bus.number_plate,
                "From":Route.query.filter_by(id=new_bus.route_id).first().start_point,
                "To":Route.query.filter_by(id=new_bus.route_id).first().end_point,
                "Departure_Time":new_bus.departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                "no_of_seats":new_bus.capacity,
                "available_seats":new_bus.available_seats,
                # "Owner":User.query.filter_by(id=new_bus.owner_id).first().username,
                # "no_of_seats":new_bus.number_of_seats,
                "driver":new_bus.driver
                
            },201
        except Exception as e:
            return{"Error":str(e)},400
        
class BusesById(Resource):
    def get(self,id):
        bus=Bus.query.filter_by(id=id).first()
        if not bus:
            return{"Error":"Bus does not exist"},404
        return { 
            "id":bus.id,
            # "Name":bus.name,
            "Number Plate":bus.number_plate,
            "From":Route.query.filter_by(id=bus.route_id).first().start_point,
            "To":Route.query.filter_by(id=bus.route_id).first().end_point,
            "Departure_Time":bus.departure_time.strftime('%Y-%m-%d %H:%M:%S '),
            "no_of_seats":bus.capacity,
            "available_seats":bus.available_seats,
            # "Owner":User.query.filter_by(id=bus.owner_id).first().username,
            # "no_of_seats":bus.number_of_seats,
            "driver":bus.driver
        },200
    @jwt_required()
    def patch(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        bus=Bus.query.filter_by(id=id).first()
        if not(user.user_type == "BusOwner"):
            return {"Error":"Unauthorization error!!"},401
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        elif not bus:
            return {"Error":"Bus does not exist!!"},401
        elif bus not in user.buses:
            return {"Error":"Unauthorization error!!"},401
        for attr in request.get_json():
            setattr(bus,attr,request.json[attr])
        db.session.add(bus)
        db.session.commit()
        return { 
            "id":bus.id,
            # "Name":bus.name,
            "Number Plate":bus.number_plate,
            "From":Route.query.filter_by(id=bus.route_id).first().start_point,
            "To":Route.query.filter_by(id=bus.route_id).first().end_point,
            "Departure_Time":bus.departure_time.strftime('%Y-%m-%d %H:%M:%S '),
            "no_of_seats":bus.capacity,
            "available_seats":bus.available_seats,
            # "Owner":User.query.filter_by(id=bus.owner_id).first().username,
            # "no_of_seats":bus.number_of_seats,
            "driver":bus.driver
        },200
    
    @jwt_required()
    def delete(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        bus=Bus.query.filter_by(id=id).first()
        if not(user.user_type == "BusOwner"):
            return {"Error":"Unauthorization error!!"},401
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        elif not bus:
            return {"Error":"Bus does not exist!!"},401
        elif bus not in user.buses:
            return {"Error":"Unauthorization error!!"},401  
        db.session.delete(bus)
        db.session.commit()
        return {
            "message":"Bus deleted successfully!!"
        },200
class Routes(Resource):
    def get(self):
        routes=[
            {
                "id":route.id,
                "start_point":route.start_point,
                "end_point":route.end_point,
                "price":route.price,
                # "departure_time":route.departure_time.strftime('%Y-%m-%d %H:%M:%S'),
                # "return_time":route.return_time.strftime('%Y-%m-%d %H:%M:%S') if route.return_time else None
            }
            for route in Route.query.all()
        ]
        return routes,200
    @jwt_required()
    def post(self):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        if not(user.user_type == "Admin"):
            return {"error":"Unauthorized"},400
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        data=request.get_json()
        start_point=data['start_point']
        end_point=data['end_point']
        price=data['price']
        existing_route=Route.query.filter_by(start_point=start_point,end_point=end_point).first()
        
        if existing_route:
            return {"Error":"Route exists!"},401
        
        try:
            new_route=Route(start_point=start_point,end_point=end_point,price=price)
            db.session.add(new_route)
            db.session.commit()
            return {
                
                "id":new_route.id,
                "start_point":new_route.start_point,
                "end_point":new_route.end_point,
                "price":new_route.price,
                # "departure_time":new_route.departure_time.strftime('%Y-%m-%d %H:%M:%S'),
                # "return_time":new_route.return_time.strftime('%Y-%m-%d %H:%M:%S') if new_route.return_time else None,
            },201
        except Exception as e:
            return {
                "Error":str(e)
            },401
class FilteredRoutes(Resource):
    def get(self):
        start_point=request.args.get('start').capitalize()   
        end_point=request.args.get('stop').capitalize()
        route = Route.query.filter_by(start_point=start_point,end_point=end_point).first()
        if not route:
            return {'Error':"Route Not Found"},401
        route_details=[
            {
                "route_id":route.id,
                "start_point":route.start_point,
                "end_point":route.end_point,
                "price":route.price,
                # "departure_time":route.departure_time.strftime('%Y-%m-%d %H:%M:%S'),
                # "return_time":route.return_time.strftime('%Y-%m-%d %H:%M:%S') if route.return_time else None,
                "buses":[
                    {
                    "id":bus.id,
                    # "name":bus.name,
                    "number_plate":bus.number_plate,
                    "Departure_Time":bus.departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                    "owner_id":bus.owner_id,
                    "owner":User.query.filter_by(id=bus.owner_id).first().username,
                    "no_of_seats":bus.capacity,
                    "available_seats":bus.available_seats, 
                    "owner_contact":User.query.filter_by(id=bus.owner_id).first().email,
                    # "number_of_seats":bus.number_of_seats,
                    "driver":bus.driver
                    }
                    for bus in route.buses
                ]
            }
        
        ]
        return route_details,200
              
class RoutesById(Resource):
    def get(self,id):
        route=Route.query.filter_by(id=id).first()
        if not route:
            return {"Message":"Route Not Found"}
        
        route_details=[
            {
                "route_id":route.id,
                "start_point":route.start_point,
                "end_point":route.end_point,
                "price":route.price,
                # "departure_time":route.departure_time.strftime('%Y-%m-%d %H:%M:%S'),
                # "return_time":route.return_time.strftime('%Y-%m-%d %H:%M:%S') if route.return_time else None,
                "buses":[
                    {
                    "id":bus.id,
                    # "name":bus.name,
                    "number_plate":bus.number_plate,
                    "Departure_Time":bus.departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                    "owner_id":bus.owner_id,
                    "owner":User.query.filter_by(id=bus.owner_id).first().username,
                    "no_of_seats":bus.capacity,
                    "available_seats":bus.available_seats, 
                    "owner_contact":User.query.filter_by(id=bus.owner_id).first().email,
                    # "number_of_seats":bus.number_of_seats,
                    "driver":bus.driver
                    }
                    for bus in route.buses
                ]
            }
        
        ]
        return route_details,200
      
    @jwt_required()    
    def put(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        if not(user.user_type == "Admin"):
            return {"error":"Unauthorized"},400
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        route=Route.query.filter_by(id=id).first()
        if not route:
            return {"Error":"Route Not found!!!"}
        try:
            data=request.get_json()
            # departure_time=data["departure_time"]
            start_point=data["start_point"]
            end_point=data["end_point"]
            price=data["price"]
            # new_departure_time = datetime.strptime(departure_time, '%Y-%m-%d %H:%M:%S')
            # for attr in request.get_json():
            #     setattr(route,attr,request.json[attr])
            # db.session.add(route)
            # db.session.commit()
            # route.departure_time=new_departure_time
            route.start_point=start_point
            route.end_point=end_point
            route.price=price
            db.session.commit()
            
            return {
                "id":route.id,
                "start_point":route.start_point,
                "end_point":route.end_point,
                "price":route.price,
                # "departure_time":route.departure_time.strftime('%Y-%m-%d %H:%M:%S'),
                # "return_time":route.return_time.strftime('%Y-%m-%d %H:%M:%S') if route.return_time else None,
            },200
        except Exception as e:
            return {"Error":str(e)},400
    @jwt_required()
    def delete(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        if not(user.user_type == "Admin"):
            return {"Error":"Unauthorized"},400
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        route=Route.query.filter_by(id=id).first()
        if not route:
            return {"Error":"Route Not Found!!!"}
        db.session.delete(route)
        db.session.commit()
        return{
            "Message":"Route Successfully Deleted!!"
        },200
        
            
# class BookingList(Resource):
    # @jwt_required()
    # def get(self):
    #     user_id=get_jwt_identity()
    #     current_user=User.query.filter_by(id=user_id).first()
    #     if not current_user.bookings:
    #         return {"Message":"No Bookings Available.."},404
    #     elif user_id in  blacklisted_tokens:
    #         return {"Error":"Unauthorized!!"},400
    #     else:
    #         bookings=[
    #             {
    #                 "booking_id":booking.id,
    #                 "bus_id":booking.bus_id,
    #                 "user_id":booking.user_id,
    #                 "route_id":Bus.query.filter_by(id=booking.bus_id).first().route_id,
    #                 "seat_number":booking.seat_number,
    #                 "departure_time":Bus.query.filter_by(id=booking.bus_id).first().departure_time.strftime('%Y-%m-%d %H:%M:%S '),
    #                 # "departure_time":booking.departure_time.strftime('%Y-%M-%d %H:%M:%S'),
    #                 # "return_time":booking.return_time.strftime('%Y-%M-%d %H:%M:%S') if booking.return_time else None,
    #                 "is_confirmed":booking.is_confirmed
    #             }
                
    #             for booking in current_user.bookings
    #         ]
    #     return bookings,200
class BookingList(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        current_user = User.query.filter_by(id=user_id).first()
        if not (current_user.user_type == "Customer"):
            return {"Error":"Only Customers Can Access this Page"},403
        elif not current_user.bookings:
            return {"Message": "No Bookings Available.."}, 404
        elif user_id in blacklisted_tokens:
            return {"Error": "Unauthorized!!"}, 400
        else:
            bookings = []
            for booking in current_user.bookings:
                route_id = Bus.query.filter_by(id=booking.bus_id).first().route_id 
                route=Route.query.filter_by(id=route_id).first()# Access the Route object associated with the booking
                route_info = {
                    "booking_id": booking.id,
                    "bus_id": booking.bus_id,
                    "user_id": booking.user_id,
                    "start_point": route.start_point,
                    "end_point": route.end_point,
                    "price":route.price,
                    "seat_number": booking.seat_number,
                    "departure_time": Bus.query.filter_by(id=booking.bus_id).first().departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                    "is_confirmed": booking.is_confirmed
                }
                bookings.append(route_info)
            return {"bookings": bookings}, 200



    @jwt_required()
    def post(self):
        user_id=get_jwt_identity()
        data=request.get_json()
        bus_id=data['bus_id']
        seat_number=data['seat_number']
        # is_confirmed=data['is_confirmed']
        current_user = User.query.filter_by(id=user_id).first()
        bus=Bus.query.filter_by(id=bus_id).first()
        # existing_booking = Booking.query.filter_by(user_id=user_id,bus_id=bus_id).first()
        existing_seat=Booking.query.filter_by(bus_id=bus_id,seat_number=seat_number).first()
        if not (current_user.user_type == "Customer"):
            return {"Error":"Only Customers Can Access this Page"},403
        elif not bus:
            return {"Error":"Bus Does not exist"},404
        elif existing_seat:
            return {"Error":"Seat Has Already Been Booked..."},401
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        # elif seat_number == existing_seat.seat_number:
        #     return {"Error":"Seat Has Already Been Booked."},401
        else:
            try:
                new_booking=Booking(user_id=user_id,bus_id=bus_id,seat_number=seat_number)
                db.session.add(new_booking)
                bus.available_seats-=1
                db.session.commit()
                
                new_book_details={
                    "booking_id":new_booking.id,
                    "user_id":new_booking.user_id,
                    "bus_id":new_booking.bus_id,
                    "seat_number":new_booking.seat_number,
                    "departure_time":Bus.query.filter_by(id=new_booking.bus_id).first().departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                    # "departure_time":new_booking.departure_time.strftime('%Y-%M-%d %H:%M:%S'),
                    # "return_time":new_booking.return_time.strftime('%Y-%M-%d %H:%M:%S') if new_booking.return_time else None,
                    "is_confirmed":new_booking.is_confirmed
                }
                return new_book_details,201
            except Exception as e:
                return {"error":str(e)},401
class ConfirmBooking(Resource):
    @jwt_required()
    def put(self):
        booking=Booking.query.filter_by(id=request.args.get('booking_id')).first()
        if not booking:
            return {"Error":"Booking Not Found!"},404
        booking.is_confirmed=True
        db.session.commit()
        return {  
                "booking_id":booking.id,
                "user_id":booking.user_id,
                "bus_id":booking.bus_id,
                "seat_number":booking.seat_number,
                "departure_time":Bus.query.filter_by(id=booking.bus_id).first().departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                # "departure_time":booking.departure_time.strftime('%Y-%M-%d %H:%M:%S'),
                # "return_time":booking.return_time.strftime('%Y-%M-%d %H:%M:%S') if booking.return_time else None,
                "is_confirmed":booking.is_confirmed
        },200
        
               
class BookingById(Resource):
    @jwt_required()
    def get(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        booking=Booking.query.filter_by(id=id).first()
        if not (user.user_type == "Customer"):
            return {"Error":"Only Customers Can Access this Page"},403
        elif not booking:
            return {"error":"Booking does not exist"},401
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        elif booking not in user.bookings:
            return {"error":"Unauthorized to perform this action."},401
        return {  
                "booking_id":booking.id,
                "user_id":booking.user_id,
                "bus_id":booking.bus_id,
                "seat_number":booking.seat_number,
                "departure_time":Bus.query.filter_by(id=booking.bus_id).first().departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                # "departure_time":booking.departure_time.strftime('%Y-%M-%d %H:%M:%S'),
                # "return_time":booking.return_time.strftime('%Y-%M-%d %H:%M:%S') if booking.return_time else None,
                "is_confirmed":booking.is_confirmed
        },200
    
    @jwt_required()
    def put(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        booking=Booking.query.filter_by(id=id).first()
        if not (user.user_type == "Customer"):
            return {"Error":"Only Customers Can Access this Page"},403
        elif not booking:
            return {"error":"Booking does not exist"},401
        elif user_id in blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        elif booking not in user.bookings:
            return {"error":"Unauthorized to perform this action."},401
        else:
            try:
                
                data=request.get_json()
                seat_number=data["seat_number"]
                # is_confirmed=data["is_confirmed"]
                existing_seat=Booking.query.filter_by(bus_id=booking.bus_id,seat_number=seat_number).first()
                if existing_seat:
                    return {"Error":"Seat Has already been booked.."},403
                # # for attr in data:
                # #     setattr(booking,attr,data[attr])
                # for attr in request.get_json():
                #     setattr(booking,attr,request.json[attr])
                booking.seat_number=seat_number
                # booking.is_confirmed=is_confirmed
                # db.session.add(booking)
                db.session.commit()
                return {  
                    "booking_id":booking.id,
                    "user_id":booking.user_id,
                    "bus_id":booking.bus_id,
                    "seat_number":booking.seat_number,
                    "departure_time":Bus.query.filter_by(id=booking.bus_id).first().departure_time.strftime('%Y-%m-%d %H:%M:%S '),
                    # "departure_time":booking.departure_time.strftime('%Y-%M-%d %H:%M:%S'),
                    # "return_time":booking.return_time.strftime('%Y-%M-%d %H:%M:%S') if booking.return_time else None,
                    "is_confirmed":booking.is_confirmed
            },200
            except Exception as e:
                return ({"Error":str(e)}),401
    @jwt_required()
    def delete(self,id):
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()
        booking=Booking.query.filter_by(id=id).first()
        if not (user.user_type == "Customer"):
            return {"Error":"Only Customers Can Access this Page"},403
        elif not booking:
            return {"error":"Booking does not exist"},401
        elif user_id in  blacklisted_tokens:
            return {"Error":"Unauthorized!!"},400
        elif booking not in user.bookings:
            return {"error":"Unauthorized to perform this action."},401
        db.session.delete(booking)
        db.session.commit()
        bus=Bus.query.filter_by(id=booking.bus_id).first()
        bus.available_seats+=1
        db.session.commit()
        return {"message":"Booking deleted Successfully!!"},200
        
        
api.add_resource(Home,'/',endpoint='/')
api.add_resource(SignUp,'/sign_up',endpoint='/sign_up')
api.add_resource(Login,'/login',endpoint='/login')
api.add_resource(Logout,'/logout',endpoint='/logout')
api.add_resource(Routes,'/routes',endpoint='/routes')
api.add_resource(Users,'/users',endpoint='/users')
api.add_resource(UsersById,'/users/<int:id>',endpoint='/users/<int:id>')
api.add_resource(Buses,'/buses',endpoint='/buses')
api.add_resource(BusesById,'/buses/<int:id>',endpoint='/buses/<int:id>')
api.add_resource(RoutesById,'/routes/<int:id>',endpoint='/routes/<int:id>')
api.add_resource(BookingList,'/bookings',endpoint='/bookings')
api.add_resource(BookingById,'/bookings/<int:id>',endpoint='/bookings/<int:id>')
api.add_resource(FilteredRoutes,'/routes/',endpoint='/routes/')
api.add_resource(ConfirmBooking,'/confirm_booking',endpoint='/confirm_booking')
    

if __name__ == "__main__":
    app.run(port=5500,debug=True)