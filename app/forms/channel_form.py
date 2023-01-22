from flask_wtf import FlaskForm
from wtforms.fields import StringField, BooleanField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length


class ChannelForm(FlaskForm):
    name = StringField('Channel Name', validators=[
                       DataRequired(), Length(min=1, max=255)])
    type = SelectField('Channel Type', choices=[
                       ('Text', 'Text'), ('Voice', 'Voice')], validate_choice=False)
    is_private = BooleanField('Channel Privacy', validators=[])
    # server_id = IntegerField('Server ID', validators=[DataRequired()])
