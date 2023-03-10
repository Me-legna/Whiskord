from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message
from app.models.db import db
from app.models.channel import Channel
from app.forms.message_form import MessageForm
from .validation_to_error_formatter import validation_errors_to_error_messages

message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=['POST'])
@login_required
def create_message():
    """
    Create a Message
    """
    # data = request.get_json()
    # message = data.get('message')
    # channel_id = data.get('channel_id')

    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Check if channel exists
        channel_id=form.data['channel_id']
        channel = Channel.query.get(channel_id)
        if channel is None:
            return jsonify({'message': "Channel couldn't be found", 'statusCode': 404}), 404

        new_message = Message(
            content=form.data['content'],
            channel_id=form.data['channel_id'],
            user_id=current_user.id
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


    # # Validate input
    # errors = []
    # if not message:
    #     errors.append("Message is required")
    # if len(message) > 2000:
    #     errors.append("Message must be less than 2000 in length")
    # if errors:
    #     return jsonify({'message': "Validation Error", 'statusCode': 400, 'errors': errors}), 400

    # # Create new message
    # new_message = Message(message=message, channel_id=channel_id, user_id=current_user.id)
    # db.session.add(new_message)
    # db.session.commit()

    # return jsonify({'message': new_message.to_dict()}), 201


@message_routes.route('/<int:message_id>', methods=['PUT'])
@login_required
def edit_message(message_id):
    """
    Edit a Message
    """

    # data = request.get_json()
    # new_message = data.get('message')

    message = Message.query.get(message_id)

    # Check if message exists
    if message is None:
        return jsonify({'message': "Message couldn't be found", 'statusCode': 404}), 404

    # Check if the user is authorized to edit this message
    if message.user_id != current_user.id:
        return jsonify({'message': "You are not authorized to edit this message", 'statusCode': 403}), 403

    # # Validate message data
    # errors = new_message.validate(data)
    # if errors:
    #     return jsonify({'message': 'Validation Error', 'statusCode': 400, 'errors': errors}), 400

    # Validate input
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message.content = form.data['content']
        message.is_edited = True
        db.session.commit()
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


    # message.message = data.get('message')
    # message.is_edited = True
    # db.session.commit()

    # return jsonify(message.to_dict()), 200


@message_routes.route("/<int:message_id>", methods=["DELETE"])
@login_required
def delete_message(message_id):
    message = Message.query.get(message_id)
    if message is None:
        return jsonify({'message': "Message couldn't be found", 'statusCode': 404}), 404

    # check if the user is authorized
    if not current_user.id == message.user_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 401}), 401

    db.session.delete(message)
    db.session.commit()
    return jsonify({'message': "Successfully deleted", 'statusCode': 200}), 200
