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
        name='Bobbie Server', owner_id=3, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=False, is_dm=False, capacity=100)

    batman_server = Server(
        name='Pixie Chicks', owner_id=4, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=True, is_dm=True, capacity=100)

    superman_server = Server(
        name='Stuck Between Pixels ', owner_id=5, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=False, is_dm=False, capacity=100)

    spider_man_server = Server(
        name='Master of Algo Lands', owner_id=6, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=False, is_dm=False, capacity=100)

    iron_man_server = Server(
        name='Tiny Coders', owner_id=7, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=False, is_dm=False, capacity=100)

    wolverine_server = Server(
        name='Caffeinated Fast Fingers', owner_id=8, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=False, is_dm=False, capacity=100)

    captain_america_server = Server(
        name='That IT guy', owner_id=9, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=False, is_dm=False, capacity=100)

    thor_server = Server(
        name='The Kickin Chickens', owner_id=10, image_url='https://cdn.discordapp.com/icons/799118662555099146/8b5d8b0f3b0b3b3b3b3b3b3b3b3b3b3b.png?size=128', is_private=False, is_dm=False, capacity=100)

    db.session.add(demo_server)
    db.session.add(marnie_server)
    db.session.add(bobbie_server)
    db.session.add(batman_server)
    db.session.add(superman_server)
    db.session.add(spider_man_server)
    db.session.add(iron_man_server)
    db.session.add(wolverine_server)
    db.session.add(captain_america_server)
    db.session.add(thor_server)

    user_1 = User.query.get(1)
    user_2 = User.query.get(2)
    user_3 = User.query.get(3)
    user_4 = User.query.get(4)
    user_5 = User.query.get(5)
    user_6 = User.query.get(6)
    user_7 = User.query.get(7)
    user_8 = User.query.get(8)
    user_9 = User.query.get(9)
    user_10 = User.query.get(10)

    demo_server.members.append(user_1,user_5,user_2,user_3,user_4,user_6,user_7,user_8,user_9,user_10)
    marnie_server.members.append(user_2,user_5,user_1,user_3,user_4,user_6,user_7,user_8,user_9,user_10)
    bobbie_server.members.append(user_2,user_5,user_1,user_3,user_4,user_6,user_7,user_8,user_9,user_10)
    batman_server.members.append(user_3,user_1,user_10,user_2,user_5)
    superman_server.members.append(user_4,user_10,user_1)
    spider_man_server.members.append(user_5,user_10)
    iron_man_server.members.append(user_6,user_1)
    wolverine_server.members.append(user_7,user_6)
    captain_america_server.members.append(user_8,user_1)
    thor_server.members.append(user_9,user_6,user_3)


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
