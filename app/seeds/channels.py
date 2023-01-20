from app.models import db, Channel, User, environment, SCHEMA
# from .users import demo, marnie, bobbie


# Adds a demo user, you can add other users here if you want
def seed_channels():
    demo_channel = Channel(
        name='channel1',
        server_id=1,
        type='Text',
        is_private=True
    )
    marnie_channel = Channel(
        name='channel2',
        server_id=2,
        type='Text',
        is_private=True
    )
    bobbie_channel = Channel(
        name='channel3',
        server_id=3,
        type='Text',
        is_private=True
    )
    batman_channel = Channel(
        name='The Room',
        server_id=4,
        type='Text',
        is_private=False
    )
    superman_channel = Channel(
        name='Cool Room',
        server_id=5,
        type='Text',
        is_private=False
    )
    spiderman_channel = Channel(
        name='Gamegod Lounge',
        server_id=6,
        type='Text',
        is_private=False
    )
    ironman_channel = Channel(
        name='Smarty pants',
        server_id=7,
        type='Text',
        is_private=False
    )
    wolverine_channel = Channel(
        name='CStrikers',
        server_id=8,
        type='Text',
        is_private=False
    )
    captain_channel = Channel(
        name='minecraft legends',
        server_id=9,
        type='Text',
        is_private=False
    )
    thor_channel = Channel(
        name='Garbo',
        server_id=10,
        type='Text',
        is_private=False
    )
    demo_channel = Channel(
        name='Callback Cats',
        server_id=1,
        type='Text',
        is_private=True
    )
    marnie_channel = Channel(
        name='Babaganoush',
        server_id=2,
        type='Text',
        is_private=True
    )
    bobbie_channel = Channel(
        name='hex clans ',
        server_id=3,
        type='Text',
        is_private=True
    )
    batman_channel = Channel(
        name='Data privates',
        server_id=4,
        type='Text',
        is_private=False
    )
    superman_channel = Channel(
        name='SCRUBBY DUBBY',
        server_id=5,
        type='Text',
        is_private=False
    )
    spiderman_channel = Channel(
        name='Command C gods ',
        server_id=6,
        type='Text',
        is_private=False
    )
    ironman_channel = Channel(
        name='Command V gods ',
        server_id=7,
        type='Text',
        is_private=False
    )
    wolverine_channel = Channel(
        name='CStrikers',
        server_id=8,
        type='Text',
        is_private=False
    )
    captain_channel = Channel(
        name='Brogrammers ',
        server_id=9,
        type='Text',
        is_private=False
    )
    thor_channel = Channel(
        name='ByteMe',
        server_id=10,
        type='Text',
        is_private=False
    )
    demo_channel2 = Channel(
        name='404 brain not found ',
        server_id=1,
        type='Text',
        is_private=True
    )
    marnie_channel2 = Channel(
        name='game of threads ',
        server_id=2,
        type='Text',
        is_private=True
    )
    bobbie_channel2 = Channel(
        name='return to sleep ',
        server_id=3,
        type='Text',
        is_private=True
    )
    batman_channel2 = Channel(
        name='it worked on local',
        server_id=4,
        type='Text',
        is_private=False
    )
    superman_channel2 = Channel(
        name='Crash test dummies',
        server_id=5,
        type='Text',
        is_private=False
    )
    spiderman_channel2 = Channel(
        name='free lunch',
        server_id=6,
        type='Text',
        is_private=False
    )
    ironman_channel2 = Channel(
        name='1 render error away ',
        server_id=7,
        type='Text',
        is_private=False
    )
    wolverine_channel2 = Channel(
        name='Hackstreet boys',
        server_id=8,
        type='Text',
        is_private=False
    )
    captain_channel2 = Channel(
        name='system error',
        server_id=9,
        type='Text',
        is_private=False
    )
    thor_channel2 = Channel(
        name='jARGON',
        server_id=10,
        type='Text',
        is_private=False
    )
    demo_channel3 = Channel(
        name='Chronic procrastinators ',
        server_id=1,
        type='Text',
        is_private=True
    )
    marnie_channel3 = Channel(
        name='Reboot ',
        server_id=2,
        type='Text',
        is_private=True
    )
    bobbie_channel3 = Channel(
        name='Scared to deploy  ',
        server_id=3,
        type='Text',
        is_private=True
    )
    batman_channel3 = Channel(
        name='Code of duty ',
        server_id=4,
        type='Text',
        is_private=False
    )
    superman_channel3 = Channel(
        name='Error makers ',
        server_id=5,
        type='Text',
        is_private=False
    )
    spiderman_channel3 = Channel(
        name='developed by developers',
        server_id=6,
        type='Text',
        is_private=False
    )
    ironman_channel3 = Channel(
        name='Bit by bit ',
        server_id=7,
        type='Text',
        is_private=False
    )
    wolverine_channel3 = Channel(
        name='Sore eyes and tired fingers',
        server_id=8,
        type='Text',
        is_private=False
    )
    captain_channel3 = Channel(
        name='digital nomads',
        server_id=9,
        type='Text',
        is_private=False
    )
    thor_channel3 = Channel(
        name='surviving with google',
        server_id=10,
        type='Text',
        is_private=False
    )

    db.session.add(demo_channel)
    db.sesson.add(demo_channel2)
    db.session.add(demo_channel3)
    db.session.add(marnie_channel)
    db.session.add(marnie_channel2)
    db.session.add(marnie_channel3)
    db.session.add(bobbie_channel)
    db.session.add(bobbie_channel2)
    db.session.add(bobbie_channel3)
    db.session.add(batman_channel)
    db.session.add(batman_channel2)
    db.session.add(batman_channel3)
    db.session.add(superman_channel)
    db.session.add(superman_channel2)
    db.session.add(superman_channel3)
    db.session.add(spiderman_channel)
    db.session.add(spiderman_channel2)
    db.session.add(spiderman_channel3)
    db.session.add(ironman_channel)
    db.session.add(ironman_channel2)
    db.session.add(ironman_channel3)
    db.session.add(wolverine_channel)
    db.session.add(wolverine_channel2)
    db.session.add(wolverine_channel3)
    db.session.add(captain_channel)
    db.session.add(captain_channel2)
    db.session.add(captain_channel3)
    db.session.add(thor_channel)
    db.session.add(thor_channel2)
    db.session.add(thor_channel3)



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


    demo_channel.members.append(user_1,user_2,user_3)
    marnie_channel.members.append(user_2,user_10,user_3)
    bobbie_channel.members.append(user_3,user_7,user_1,user_2)
    batman_channel.members.append(user_1,user_5,user_3,user_2)
    superman_channel.members.append(user_2,user_4,user_3,user_1)
    spiderman_channel.members.append(user_3,user_6,user_1,user_2)
    ironman_channel.members.append(user_1,user_8,user_3,user_2)
    wolverine_channel.members.append(user_2,user_9,user_3,user_1)
    captain_channel.members.append(user_3,user_10,user_1,user_2)
    thor_channel.members.append(user_1,user_7,user_3,user_2)
    demo_channel2.members.append(user_2, user_3)
    marnie_channel2.members.append(user_3, user_1, user_2)
    bobbie_channel2.members.append(user_1, user_2, user_3, user_4)
    batman_channel2.members.append(user_2, user_3, user_4, user_5)
    superman_channel2.members.append(user_3, user_4, user_5, user_6,user_10)
    spiderman_channel2.members.append(user_1, user_2, user_3, user_4, user_5,user_8)
    ironman_channel2.members.append(user_2,user_8,user_3,user_4,user_5,user_6)
    wolverine_channel2.members.append(user_3,user_9,user_1,user_2,user_4,user_5)
    captain_channel2.members.append(user_1,user_10,user_2,user_3,user_4,user_5)
    thor_channel2.members.append(user_2,user_7,user_1,user_3,user_4,user_5)
    demo_channel3.members.append(user_3, user_1)
    marnie_channel3.members.append(user_1, user_2, user_3)
    bobbie_channel3.members.append(user_2,user_4)
    batman_channel3.members.append(user_3,user_7)
    superman_channel3.members.append(user_1,user_5)
    spiderman_channel3.members.append(user_2,user_6,user_10)
    ironman_channel3.members.append(user_3,user_8)
    wolverine_channel3.members.append(user_1,user_9)
    captain_channel3.members.append(user_2,user_10)
    thor_channel3.members.append(user_3,user_7,user_1,user_2,user_4,user_5)


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

    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_members RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channel_members")
        db.session.execute("DELETE FROM channels")

    db.session.commit()
