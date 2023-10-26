from config import jwt,app,db,api
from models.booking import Booking
from models.bus import Bus
from models.user import User
from models.routes import Route
from flask_restful import Resource
from flask_jwt_extended import create_access_token,jwt_required
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
            password=data['password']
            user_type=data['user_type']
            if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
                return {"Error":"Username Already Exists"},401
            else:
                new_user=User(username=username,email=email,password=generate_password_hash(password),user_type=user_type)
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
    
    
api.add_resource(Home,'/',endpoint='/')
api.add_resource(SignUp,'/sign_up',endpoint='/sign_up')
api.add_resource(Login,'/login',endpoint='/login')
api.add_resource(Logout,'/logout',endpoint='/logout')
    
    

if __name__ == "__main__":
    app.run(port=5500,debug=True)