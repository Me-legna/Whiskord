from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Server

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def get_user_servers():
    """
    Get all Servers the Current User is a member
    """
    servers = Server.query.filter(Server.members.any(id=current_user.id)).all()
    return jsonify({'Servers': [server.to_dict() for server in servers]})

@server_routes.route('/private')
@login_required
def get_user_private_servers():
    """
    Get all private servers where the current user is a member
    """
    servers = Server.query.filter(Server.members.any(id=current_user.id), Server.is_private == True).all()
    return jsonify({'Servers': [server.to_dict() for server in servers]})

@server_routes.route('/public')
@login_required
def get_user_public_servers():
    """
    Get all public servers where the current user is a member
    """
    servers = Server.query.filter(Server.members.any(id=current_user.id), Server.is_private == False, Server.is_dm == False).all()
    return jsonify({'Servers': [server.to_dict() for server in servers]})


@server_routes.route('/<int:server_id>', methods=['GET'])
@login_required
def get_server(server_id):
    """
    Returns the details of a server specified by its id.
    """
    server = Server.query.get(server_id)
    if server is None:
        return jsonify({'message': "Server couldn't be found", 'statusCode': 404}), 404

    members = [user.to_dict() for user in server.members]
    channels = [channel.to_dict() for channel in server.channels]

    return jsonify({
        'Server': {
            'id': server.id,
            'name': server.name,
            'owner_id': server.owner_id,
            'image_url': server.image_url,
            'is_private': server.is_private,
            'is_dm': server.is_dm,
            'capacity': server.capacity,
            'Members': members,
            'Channels': channels
        }
    })

