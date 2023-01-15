from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired, Length


class ChannelForm(FlaskForm):
    name = StringField('Channel name', validators=[DataRequired(), Length(min=1, max=500)])
