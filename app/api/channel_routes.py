from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel
from app.models.message import Message
from app.models.db import db

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:channel_id>', methods=['GET'])
@login_required
def get_channel(channel_id):
    """
    Returns the details of a channel specified by its id.
    """
    channel = Channel.query.get(channel_id)
    if channel is None:
        return jsonify({'message': "Channel couldn't be found", 'statusCode': 404}), 404

    members = [user.to_dict() for user in channel.members]
    messages = [message.to_dict() for message in channel.messages]

    return jsonify({
        'Channels': {
            'id': channel.id,
            'name': channel.name,
            'server': channel.server.to_dict(),
            'type': channel.type,
            'is_private': channel.is_private,
            'Members': members,
            'Messages': messages
        }
    })


@channel_routes.route("/", methods=["POST"])
@login_required
def create_channel():
    """
    Creates and returns a new channel.
    """
    data = request.get_json()
    name = data.get("name")
    type = data.get("type")
    is_private = data.get("is_private")

    # Perform validation on the data, maybe move to WTForms
    errors = []
    if not name:
        errors.append("Channel Name is required")
    elif len(name) < 1 or len(name) > 100:
        errors.append("Name must be between 1 and 100 in length")

    if not type:
        errors.append("Type is required")

    if errors:
        return jsonify({"message": "Validation Error", "statusCode": 400, "errors": errors}), 400

    # Create the new channel
    channel = Channel(name=name, type=type, is_private=is_private)
    db.session.add(channel)
    db.session.commit()

    return jsonify(channel.to_dict()), 201


@channel_routes.route("/<int:channel_id>", methods=["PUT"])
@login_required
def update_channel(channel_id):
    """
    Updates and returns an existing channel.
    """
    channel = Channel.query.get(channel_id)
    if channel is None:
        return jsonify({'message': "Channel couldn't be found", 'statusCode': 404}), 404

    # check if the user is authorized
    if not current_user.id == channel.server.owner_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 401}), 401

    # get json data from request
    data = request.get_json()
    name = data.get("name")
    type = data.get("type")
    is_private = data.get("is_private")

    # Perform validation on the data, MOVE TO WTF FORMS LATER
    errors = []
    if not name:
        errors.append("Channel Name is required")
    elif len(name) < 1 or len(name) > 100:
        errors.append("Name must be between 1 and 100 in length")

    if errors:
        return jsonify({"message": "Validation Error", "statusCode": 400, "errors": errors}), 400

    # update the channel
    channel.name = name
    channel.type = type
    channel.is_private = is_private
    db.session.commit()

    return jsonify({'Channel': channel.to_dict()}), 200


@channel_routes.route("/<int:channel_id>", methods=["DELETE"])
@login_required
def delete_channel(channel_id):
    channel = Channel.query.get(channel_id)
    if channel is None:
        return jsonify({'message': "Channel couldn't be found", 'statusCode': 404}), 404

    # check if the user is authorized
    if not current_user.id == channel.server.owner_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 401}), 401

    db.session.delete(channel)
    db.session.commit()
    return jsonify({'message': "Successfully deleted", 'statusCode': 200}), 200


@channel_routes.route('/<int:channel_id>/messages')
@login_required
def get_channel_messages(channel_id):
    """
    Get all Messages the Current Channel that Current User is a member
    """
    # Get query parameters for pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)

    # Get the channel to ensure the user is a member and the channel exists
    channel = Channel.query.get(channel_id)
    if channel is None:
        return jsonify({'message': "Channel couldn't be found", 'statusCode': 404}), 404

    # Make sure user is a member of the channel
    if current_user not in channel.members:
        return jsonify({'message': "You are not a member of this channel", 'statusCode': 403}), 403

    # Get the messages for the channel
    messages = Message.query.filter(Message.channel_id == channel_id).paginate(page, per_page, False)

    return jsonify({'Messages': [message.to_dict() for message in messages.items]})
