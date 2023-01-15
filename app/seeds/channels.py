from app.models import db, Channel, User, environment, SCHEMA
# from .users import demo, marnie, bobbie

user_1 = User.query.get(1)
user_2 = User.query.get(2)
user_3 = User.query.get(3)

# Adds a demo user, you can add other users here if you want
def seed_channels():
    demo_channel = Channel(
        name = 'channel1',
        server_id = 1,
        type = 'Text',
        is_private = True
        )
    marnie_channel = Channel(
        name = 'channel2',
        server_id = 2,
        type = 'Text',
        is_private = True
        )
    bobbie_channel = Channel(
        name = 'channel3',
        server_id = 3,
        type = 'Text',
        is_private = True
        )


    db.session.add(demo_channel)
    db.session.add(marnie_channel)
    db.session.add(bobbie_channel)

    demo_channel.members.append(user_1)
    marnie_channel.members.append(user_2)
    bobbie_channel.members.append(user_3)

    # demo_channel.members.append(demo)
    # marnie_channel.members.append(marnie)
    # bobbie_channel.members.append(bobbie)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_channels():
    demo_channel = Channel.query.get(1)
    demo_channel.members.remove(user_1)

    marnie_channel = Channel.query.get(2)
    marnie_channel.members.remove(user_2)
    
    bobbie_channel = Channel.query.get(3)
    bobbie_channel.members.remove(user_3)

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")

    db.session.commit()
