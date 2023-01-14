from sqlalchemy import Column, Integer, String, Boolean, Enum, ForeignKey, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Channel(Base):
    __tablename__ = "channels"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    server_id = Column(Integer, ForeignKey("servers.id"), nullable=False)
    type = Column(Enum, nullable=False)
    is_private = Column(Boolean, nullable=False)
    createdAt = Column(DateTime, default=datetime.now())
    updatedAt = Column(DateTime, default=datetime.now())

    server = relationship("Server", back_populates="channels")
    message = relationship("Message", back_populates="channels", cascade="all, delete")
    channel_members = relationship("ChannelMember", back_populates="channels")

class ChannelMember(Base):
    __tablename__ = "channel_members"

    id = Column(Integer, primary_key=True)
    channel_id = Column(Integer, ForeignKey("channels.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    createdAt = Column(DateTime, default=datetime.now())
    updatedAt = Column(DateTime, default=datetime.now())
