from app.models import db, User, Server, environment, SCHEMA
# from .users import demo, marnie, bobbie, test
# import users


# Adds a demo user, you can add other users here if you want
def seed_servers():
    demo_server = Server(
        name='Demo Server', owner_id=1, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=False, is_dm=False, capacity=100)

    marnie_server = Server(
        name='Marnie Server', owner_id=2, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=True, is_dm=False, capacity=100)

    bobbie_server = Server(
        name='Bobbie Server', owner_id=3, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=True, is_dm=True, capacity=100)

    db.session.add(demo_server)
    db.session.add(marnie_server)
    db.session.add(bobbie_server)

    user_1 = User.query.get(1)
    user_2 = User.query.get(2)

    demo_server.members.append(user_1)
    marnie_server.members.append(user_2)
    bobbie_server.members.append(user_2)

    # demo_server.members.append(users.demo)
    # marnie_server.members.append(users.marnie)
    # marnie_server.members.append(users.bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.server_members RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM server_members")
        db.session.execute("DELETE FROM servers")

    db.session.commit()
