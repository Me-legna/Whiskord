from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship, validates
from .channels import Channel
from .user import User




class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    is_private = db.Column(db.Boolean, default=False, nullable=False)
    is_dm = db.Column(db.Boolean, default=False, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)

    members = db.relationship('User', secondary=server_members, backpopulates='servers')
    channels = db.relationship('Channel', backpopulates='server')
