from flask_wtf import FlaskForm
from wtforms.fields import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length, url


class ServerForm(FlaskForm):
    name = StringField('Server Name', validators=[
                       DataRequired(), Length(min=2, max=100)])
    image_url = StringField('Server Image URL', validators=[])
    is_private = BooleanField('Server Privacy', validators=[])
    is_dm = BooleanField('Server Type', validators=[])
    capacity = IntegerField('Server Capacity', validators=[])
