from app.models import db, environment, SCHEMA
from ..models.message import Message
# Adds a demo user, you can add other users here if you want
def seed_messages():
    demo_message = Message(
        content = "This is my message 1",
        user_id = 1,
        channel_id = 1
        )
    marnie_message = Message(
        content = "This is my message 2",
        user_id = 2,
        channel_id = 2
        )
    bobbie_message = Message(
        content = "This is my message 3",
        user_id = 3,
        channel_id = 3
        )

    db.session.add(demo_message)
    db.session.add(marnie_message)
    db.session.add(bobbie_message)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
