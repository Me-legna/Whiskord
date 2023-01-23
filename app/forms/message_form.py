from flask_wtf import FlaskForm
from wtforms.fields import StringField, BooleanField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length

class MessageForm(FlaskForm):
    content = StringField('Message Content', validators=[DataRequired(), Length(min=1, max=255)])
    channel_id = IntegerField('Channel ID', validators=[DataRequired()])
    user_id = IntegerField('User ID', validators=[DataRequired()])
    is_edited = BooleanField('Message Edited', validators=[DataRequired()])