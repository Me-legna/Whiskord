from flask_socketio import SocketIO, emit, join_room, leave_room
import os
from .models import Channel


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://actual-app-url.herokuapp.com',
        'https://actual-app-url.herokuapp.com',
        # Production link
        'https://whiskord-htb4.onrender.com',
        # Development link
        'https://whiskord-hj1o.onrender.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# # handle chat messages
# @socketio.on("chat")
# def handle_chat(data):
#     emit("chat", data, broadcast=True)


@socketio.on("join")
def join(channel_id):
    join_room(channel_id)


@socketio.on("chat")
def handle_chat(data):
    channel_id = data["channel_id"]
    join_room(channel_id)
    emit("chat", data, room=channel_id)


# @socketio.on("edit")
# def handle_edit(data):
#     channel_id = data["channel_id"]
#     join_room(channel_id)
#     emit("edit", data, room=channel_id)


@socketio.on("leave")
def leave(channel_id):
    leave_room(channel_id)
