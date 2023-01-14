from .db import db, environment, SCHEMA, add_prefix_for_prod


server_members = db.Table(
    "server_members",
    db.Model.metadata,
    db.Column("users", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("servers", db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), primary_key=True)
)


class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    image_url = db.Column(db.String)
    is_private = db.Column(db.Boolean, default=False, nullable=False)
    is_dm = db.Column(db.Boolean, default=False, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)

    members = db.relationship('User', secondary=server_members, backpopulates='servers')
    channels = db.relationship('Channel', backpopulates='server')

    @property
    def new_name(self):
        return self.name

    @property
    def new_owner(self):
        return self.ownerId

    @property
    def new_capacity(self):
        return self.capacity

    @property
    def new_image(self):
        return self.image_url

    @new_name.setter
    def new_name(self, name):
        self.name = name

    @new_owner.setter
    def new_owner(self, ownerId):
        self.ownerId = ownerId

    @new_capacity.setter
    def new_capacity(self, capacity):
        self.capacity = capacity

    @new_image.setter
    def new_image(self, image_url):
        self.image_url = image_url

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.ownerId,
            'image_url': self.image_url,
            'is_private': self.is_private,
            'is_dm': self.is_dm,
            'capacity': self.capacity
        }

# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.schema import Column, ForeignKey, MetaData, Table
# from sqlalchemy.types import Integer, String, Float, Boolean
# from sqlalchemy.orm import relationship, validates

# base = declarative_base()

# server_members = Table(
#     "server_members",
#     MetaData,
#     Column("users", Integer, ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
#     Column("servers", Integer, ForeignKey(add_prefix_for_prod('servers.id')), primary_key=True)
# )

# class Server(base):
#     __tablename__ = 'servers'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = Column(db.Integer, primary_key=True)
#     name = Column(String(100), nullable=False)
#     ownerId = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     image_url = Column(String)
#     is_private = Column(Boolean, default=False, nullable=False)
#     is_dm = Column(Boolean, default=False, nullable=False)
#     capacity = Column(Integer, nullable=False)

#     members = relationship('User', secondary=server_members, backpopulates='servers')
#     channels = relationship('Channel', backpopulates='server')

#     @property
#     def new_name(self):
#         return self.name

#     @property
#     def new_owner(self):
#         return self.ownerId

#     @property
#     def new_capacity(self):
#         return self.capacity

#     @property
#     def new_image(self):
#         return self.image_url

#     @new_name.setter
#     def new_name(self, name):
#         self.name = name

#     @new_owner.setter
#     def new_owner(self, ownerId):
#         self.ownerId = ownerId

#     @new_capacity.setter
#     def new_capacity(self, capacity):
#         self.capacity = capacity

#     @new_image.setter
#     def new_image(self, image_url):
#         self.image_url = image_url

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'ownerId': self.ownerId,
#             'image_url': self.image_url,
#             'is_private': self.is_private,
#             'is_dm': self.is_dm,
#             'capacity': self.capacity
#         }
