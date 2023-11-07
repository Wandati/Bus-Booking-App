from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models.dbconfig import db
from flask_restful import Api


app=Flask(__name__)
app.config["SECRET_KEY"]="5b86bc3b8eb3b59930d5341c"
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///booking.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config["JWT_SECRET_KEY"]="62190fd9e702e1a378952a6a"
migrate=Migrate(app,db)
db.init_app(app)
api=Api(app)
jwt=JWTManager(app)
jwt.init_app(app)
