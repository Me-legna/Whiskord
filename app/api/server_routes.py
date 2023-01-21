from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Server, Channel, User, db
# from app.models.db import db
from app.forms import ServerForm, ChannelForm
from .validation_to_error_formatter import validation_errors_to_error_messages

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


@server_routes.route("/", methods=["POST"])
@login_required
def create_server():
    """
    Creates and returns a new server.
    """
    # data = request.get_json()
    memberIds = request.json['members']
    print('memberIds', memberIds)
    users = User.query.filter(User.id.in_(memberIds)).all()
    print('users', users)
    # members = request.json['members']
    # members = data.get('members')
    # name = data.get("name")
    # image_url = data.get("image_url")

    # owner_id = current_user.id
    # is_private = False
    # is_dm = False
    # capacity = 500000

    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server(
            name=form.data['name'],
            owner_id=current_user.id,
            image_url=form.data['image_url'],
            is_private=form.data['is_private'],
            is_dm=form.data['is_dm'],
            capacity=form.data['capacity'],
            members=[current_user]
        )
        if form.data['is_private'] == True:
            channel = Channel(
                name=form.data['name'],
                type='Text',
                is_private=False,
                server=server,
                members=[current_user]
            )
        else:
            channel = Channel(
                name='general',
                type='Text',
                is_private=False,
                server=server,
                members=[current_user]
            )
        db.session.add(server)
        server.members.extend(users)
        channel.members.extend(users)
        db.session.commit()
        return server.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # # Perform validation on the data, MOVE TO WTF FORMS LATER
    # errors = []
    # if not name:
    #     errors.append("Server Name is required")
    # elif len(name) < 2 or len(name) > 100:
    #     errors.append("Name must be between 2 and 100 in length")

    # if errors:
    #     return jsonify({"message": "Validation Error", "statusCode": 400, "errors": errors}), 400

    # # Create the new server
    # server = Server(name=name, owner_id=owner_id, image_url=image_url, is_private=is_private, is_dm=is_dm, capacity=capacity)
    # db.session.add(server)
    # db.session.commit()

    # return jsonify(server.to_dict()), 201


@server_routes.route("/<int:server_id>", methods=["PUT"])
@login_required
def update_server(server_id):
    server = Server.query.get(server_id)
    if server is None:
        return jsonify({'message': "Server couldn't be found", 'statusCode': 404}), 404

    if server.owner_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401

    # data = request.get_json()
    # name = data.get("name")
    # image_url = data.get("image_url")

    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server.name = form.data['name']
        server.image_url = form.data['image_url'],
        server.is_private = form.data['is_private']
        server.is_dm = form.data['is_dm']
        server.capacity = form.data['capacity']
        db.session.commit()
        return server.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # # Perform validation on the data, MOVE TO WTF FORMS LATER
    # errors = []
    # if not name:
    #     errors.append("Server Name is required")
    # elif len(name) < 2 or len(name) > 100:
    #     errors.append("Name must be between 2 and 100 in length")

    # if errors:
    #     return jsonify({"message": "Validation Error", "statusCode": 400, "errors": errors}), 400

    # # Update the server
    # server.name = name
    # server.image_url = image_url
    # db.session.commit()

    # return jsonify(server.to_dict()), 200

@server_routes.route("/<int:server_id>", methods=["DELETE"])
@login_required
def delete_server(server_id):
    server = Server.query.get(server_id)

    if server is None:
        return jsonify({'message': "Server couldn't be found", 'statusCode': 404}), 404

    if server.owner_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401

    db.session.delete(server)
    db.session.commit()

    return jsonify({'message': "Successfully deleted", 'statusCode': 200}), 200


@server_routes.route('/<int:server_id>/members', methods=['POST'])
@login_required
def add_member(server_id):
    """
    Add a member to the server
    """
    server = Server.query.get(server_id)

    # check if server exists
    if server is None:
        return jsonify({'message': "Server couldn't be found", 'statusCode': 404}), 404

    data = request.get_json()
    user_id = data.get("user_id")

    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': "User couldn't be found", 'statusCode': 404}), 404

    # check if user is already a member
    if user in server.members:
        return jsonify({'message': "User is already a member of this server", 'statusCode': 400}), 400

    # Check if the current user is authorized to edit members in the server
    if server.owner_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401

    server.members.append(user)
    db.session.commit()
    members = [user.to_dict for user in server.members]

    return members, 200

@server_routes.route('/<int:server_id>/members', methods=['DELETE'])
@login_required
def remove_member(server_id):
    """
    Remove a member from the server
    """
    server = Server.query.get(server_id)

    data = request.get_json()
    user_id = data.get("user_id")

    # check if server exists
    if server is None:
        return jsonify({'message': "Server couldn't be found", 'statusCode': 404}), 404

    # Check if the current user is authorized to edit members in the server
    if server.owner_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401

    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': "User couldn't be found", 'statusCode': 404}), 404

    # check if user is a member
    if user not in server.members:
        return jsonify({'message': "User is not a member of this server", 'statusCode': 400}), 400

    server.members.remove(user)
    db.session.commit()

    return jsonify({'message': "Successfully removed member", 'statusCode': 200}), 200


@server_routes.route('/<int:server_id>/channels', methods=['GET'])
@login_required
def get_server_channels(server_id):
    """
    Get all Channels the Current Server that Current User is a member
    """
    server = Server.query.get(server_id)

    # check if server exists
    if server is None:
        return jsonify({'message': "Server couldn't be found", 'statusCode': 404}), 404

    # check if user is a member of server
    if current_user not in server.members:
        return jsonify({'message': "User is not a member of this server", 'statusCode': 403}), 403

    channels = [channel.to_dict() for channel in server.channels]

    return jsonify({'Channels': channels})


@server_routes.route("/<int:server_id>/channels", methods=["POST"])
@login_required
def create_channel(server_id):
    """
    Creates and returns a new channel.
    """
    # data = request.get_json()
    # name = data.get("name")
    # type = data.get("type")
    # is_private = data.get("is_private")

    # # Perform validation on the data, maybe move to WTForms
    # errors = []
    # if not name:
    #     errors.append("Channel Name is required")
    # elif len(name) < 1 or len(name) > 100:
    #     errors.append("Name must be between 1 and 100 in length")

    # if not type:
    #     errors.append("Type is required")

    # if errors:
    #     return jsonify({"message": "Validation Error", "statusCode": 400, "errors": errors}), 400

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel(
            name=form.data['name'],
            server_id=server_id,
            type=form.data['type'],
            is_private=form.data['is_private']
        )
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # # Create the new channel
    # channel = Channel(name=name, type=type, is_private=is_private)
    # db.session.add(channel)
    # db.session.commit()

    # return jsonify(channel.to_dict()), 201
