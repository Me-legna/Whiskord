from .db import db, environment, SCHEMA, add_prefix_for_prod
from .channels import channel_members
from .server import server_members
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    servers = db.relationship('Server', secondary=server_members, back_populates='members')
    channels = db.relationship('Channel', secondary=channel_members, back_populates='members')
    messages = db.relationship('Message', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }



#  -------------------------------------------------------

# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.schema import Column, MetaData, Table
# from sqlalchemy.types import Integer, String
# from sqlalchemy.orm import relationship

# base = declarative_base()

# class User(base, UserMixin):
#     __tablename__ = 'users'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = Column(Integer, primary_key=True)
#     username = Column(String(40), nullable=False)
#     email = Column(String(255), nullable=False, unique=True)
#     hashed_password = Column(String(255), nullable=False)

#     servers = relationship('Server', secondary=server_members, back_populates='members')
#     channels = relationship('Channel', secondary=channel_members, back_populates='members')
#     messages = relationship('Message', back_populates='user')

#     @property
#     def password(self):
#         return self.hashed_password

#     @password.setter
#     def password(self, password):
#         self.hashed_password = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'username': self.username,
#             'email': self.email
#         }
