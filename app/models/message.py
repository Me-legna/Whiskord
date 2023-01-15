from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(2000), nullable=False)
    is_edited = db.Column(db.Boolean, default=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_popualates='messages')
    channel = db.relationship('Channel', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'is_edited': self.is_edited,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'created_at': self.created_at
        }


#  -------------------------------------------------------


# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.schema import Column, ForeignKey
# from sqlalchemy.types import Integer, Boolean, DateTime, Text
# from sqlalchemy.orm import relationship

# base = declarative_base()

# class Message(base):
#     __tablename__ = 'messages'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = Column(Integer, primary_key=True)
#     content = Column(Text(2000), nullable=False)
#     is_edited = db.Column(Boolean, default=False, nullable=False)
#     user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     channel_id = Column(Integer, ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
#     created_at = Column(DateTime, default=datetime.now())

#     user = relationship('User', back_popualates='messages')
#     channel = relationship('Channel', back_populates='messages')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'content': self.content,
#             'is_edited': self.is_edited,
#             'user_id': self.user_id,
#             'channel_id': self.channel_id,
#             'created_at': self.created_at
#         }