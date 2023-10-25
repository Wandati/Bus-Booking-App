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
            token = create_access_token(identity=user.username)
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
api.add_resource(Home,'/',endpoint='/')
api.add_resource(SignUp,'/sign_up',endpoint='/sign_up')
api.add_resource(Login,'/login',endpoint='/login')
api.add_resource(Logout,'/logout',endpoint='/logout')
api.add_resource(Routes,'/routes',endpoint='/routes')
    
    

if __name__ == "__main__":
    app.run(port=5500,debug=True)