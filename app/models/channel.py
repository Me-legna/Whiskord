from .db import db, environment, SCHEMA, add_prefix_for_prod


channel_members = db.Table(
    "channel_members",
    db.Model.metadata,
    db.Column("users", db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("channels", db.Integer, db.ForeignKey(
        add_prefix_for_prod('channels.id')), primary_key=True),
        extend_existing=True
)

if environment == "production":
    channel_members.schema = SCHEMA

class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), nullable=False)
    type = db.Column(db.Enum('Text', 'Voice', name='channel_types', create_type=False), nullable=False)
    is_private = db.Column(db.Boolean, nullable=False)

    server = db.relationship("Server", back_populates="channels")
    messages = db.relationship("Message", back_populates="channel", cascade="all, delete")
    members = db.relationship("User", secondary=channel_members, back_populates="channels")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'type': self.type,
            'is_private': self.is_private
        }



# --------------------------------------------------------------


# from sqlalchemy import Column, Integer, String, Boolean, Enum, ForeignKey, DateTime
# from datetime import datetime
# from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base

# base = declarative_base()


# class Channel(base):
#     __tablename__ = "channels"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = Column(Integer, primary_key=True)
#     name = Column(String(255), nullable=False)
#     server_id = Column(Integer, ForeignKey(add_prefix_for_prod("servers.id")), nullable=False)
#     type = Column(Enum('Text', 'Voice'), nullable=False)
#     is_private = Column(Boolean, nullable=False)
#     createdAt = Column(DateTime, default=datetime.now())
#     updatedAt = Column(DateTime, default=datetime.now())

#     server = relationship("Server", back_populates="channels")
#     message = relationship("Message", back_populates="channels", cascade="all, delete")
#     channel_members = relationship("ChannelMember", back_populates="channels")

# def to_dict(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'ownerId': self.ownerId,
#             'image_url': self.image_url,
#             'is_private': self.is_private,
#             'is_dm': self.is_dm,
#             'capacity' :self.capacity
#         }

# class ChannelMember(base):
#     __tablename__ = "channel_members"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = Column(Integer, primary_key=True)
#     channel_id = Column(Integer, ForeignKey(add_prefix_for_prod("channels.id")), nullable=False)
#     user_id=Column(Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     createdAt = Column(DateTime, default=datetime.now())
#     updatedAt = Column(DateTime, default=datetime.now())
