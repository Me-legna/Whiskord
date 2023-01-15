from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Server
from app.models.db import db

server_routes = Blueprint('channels', __name__)

