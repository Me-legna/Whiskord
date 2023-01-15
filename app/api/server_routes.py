from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Server
from app.models.db import db

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


@server_routes.route("/servers", methods=["POST"])
@login_required
def create_server():
    """
    Creates and returns a new server.
    """
    data = request.get_json()
    name = data.get("name")
    image_url = data.get("image_url")

    owner_id = current_user.id
    is_private = False
    is_dm = False
    capacity = 500000

    # Perform validation on the data, MOVE TO WTF FORMS LATER
    errors = []
    if not name:
        errors.append("Server Name is required")
    elif len(name) < 2 or len(name) > 100:
        errors.append("Name must be between 2 and 100 in length")

    if errors:
        return jsonify({"message": "Validation Error", "statusCode": 400, "errors": errors}), 400

    # Create the new server
    server = Server(name=name, owner_id=owner_id, image_url=image_url, is_private=is_private, is_dm=is_dm, capacity=capacity)
    db.session.add(server)
    db.session.commit()

    return jsonify(server.to_dict()), 201


@server_routes.route("/<int:server_id>", methods=["PUT"])
@login_required
def update_server(server_id):
    server = Server.query.get(server_id)
    if server is None:
        return jsonify({'message': "Server couldn't be found", 'statusCode': 404}), 404

    if server.owner_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401

    data = request.get_json()
    name = data.get("name")
    image_url = data.get("image_url")

    # Perform validation on the data, MOVE TO WTF FORMS LATER
    errors = []
    if not name:
        errors.append("Server Name is required")
    elif len(name) < 2 or len(name) > 100:
        errors.append("Name must be between 2 and 100 in length")

    if errors:
        return jsonify({"message": "Validation Error", "statusCode": 400, "errors": errors}), 400

    # Update the server
    server.name = name
    server.image_url = image_url
    db.session.commit()

    return jsonify(server.to_dict()), 200

@server_routes.route("/<int:server_id>", methods=["DELETE"])
@login_required
def delete_server(server_id):
    server = Server.query.get(server_id)

    # Move to WTForms later
    if server is None:
        return jsonify({'message': "Server couldn't be found", 'statusCode': 404}), 404

    if server.owner_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401

    db.session.delete(server)
    db.session.commit()

    return jsonify({'message': "Successfully deleted", 'statusCode': 200}), 200
