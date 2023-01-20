from app.models import db, Channel, User, environment, SCHEMA
# from .users import demo, marnie, bobbie


# Adds a demo user, you can add other users here if you want
def seed_channels():
    thor_channel = Channel(
        name='channel1',
        server_id=1,
        type='Text',
        is_private=True
    )
    flash_channel = Channel(
        name='channel2',
        server_id=2,
        type='Text',
        is_private=True
    )
    avenger_channel = Channel(
        name='channel3',
        server_id=3,
        type='Text',
        is_private=True
    )
    superman_channel = Channel(
        name='The Room',
        server_id=4,
        type='Text',
        is_private=False
    )
    zenith_channel = Channel(
        name='Cool Room',
        server_id=5,
        type='Text',
        is_private=False
    )
    hulk_channel = Channel(
        name='Gamegod Lounge',
        server_id=6,
        type='Text',
        is_private=False
    )
    blackpanther_channel = Channel(
        name='Smarty pants',
        server_id=7,
        type='Text',
        is_private=False
    )
    wanda_channel = Channel(
        name='CStrikers',
        server_id=8,
        type='Text',
        is_private=False
    )
    spiderman_channel = Channel(
        name='minecraft legends',
        server_id=9,
        type='Text',
        is_private=False
    )
    batman_channel = Channel(
        name='Garbo',
        server_id=10,
        type='Text',
        is_private=False
    )
    thor2_channel = Channel(
        name='Callback Cats',
        server_id=1,
        type='Text',
        is_private=True
    )
    flash2_channel = Channel(
        name='Babaganoush',
        server_id=2,
        type='Text',
        is_private=True
    )
    avenger2_channel = Channel(
        name='hex clans ',
        server_id=3,
        type='Text',
        is_private=True
    )
    superman2_channel = Channel(
        name='Data privates',
        server_id=4,
        type='Text',
        is_private=False
    )
    zenith2_channel = Channel(
        name='SCRUBBY DUBBY',
        server_id=5,
        type='Text',
        is_private=False
    )
    hulk2_channel = Channel(
        name='Command C gods ',
        server_id=6,
        type='Text',
        is_private=False
    )
    blackpanther2_channel = Channel(
        name='Command V gods ',
        server_id=7,
        type='Text',
        is_private=False
    )
    wanda2_channel = Channel(
        name='CStrikers',
        server_id=8,
        type='Text',
        is_private=False
    )
    spiderman2_channel = Channel(
        name='Brogrammers ',
        server_id=9,
        type='Text',
        is_private=False
    )
    batman2_channel = Channel(
        name='ByteMe',
        server_id=10,
        type='Text',
        is_private=False
    )
    thor3_channel = Channel(
        name='404 brain not found ',
        server_id=1,
        type='Text',
        is_private=True
    )
    flash3_channel = Channel(
        name='game of threads ',
        server_id=2,
        type='Text',
        is_private=True
    )
    avenger3_channel = Channel(
        name='return to sleep ',
        server_id=3,
        type='Text',
        is_private=True
    )
    superman3_channel = Channel(
        name='it worked on local',
        server_id=4,
        type='Text',
        is_private=False
    )
    zenith3_channel = Channel(
        name='Crash test dummies',
        server_id=5,
        type='Text',
        is_private=False
    )
    hulk3_channel = Channel(
        name='free lunch',
        server_id=6,
        type='Text',
        is_private=False
    )
    blackpanther3_channel = Channel(
        name='1 render error away ',
        server_id=7,
        type='Text',
        is_private=False
    )
    wanda3_channel = Channel(
        name='Hackstreet boys',
        server_id=8,
        type='Text',
        is_private=False
    )
    spiderman3_channel = Channel(
        name='system error',
        server_id=9,
        type='Text',
        is_private=False
    )
    batman3_channel = Channel(
        name='jARGON',
        server_id=10,
        type='Text',
        is_private=False
    )
    thor4_channel = Channel(
        name='Chronic procrastinators ',
        server_id=1,
        type='Text',
        is_private=True
    )
    flash4_channel = Channel(
        name='Reboot ',
        server_id=2,
        type='Text',
        is_private=True
    )
    avenger4_channel = Channel(
        name='Scared to deploy  ',
        server_id=3,
        type='Text',
        is_private=True
    )
    superman4_channel = Channel(
        name='Code of duty ',
        server_id=4,
        type='Text',
        is_private=False
    )
    zenith4_channel = Channel(
        name='Error makers ',
        server_id=5,
        type='Text',
        is_private=False
    )
    hulk4_channel = Channel(
        name='developed by developers',
        server_id=6,
        type='Text',
        is_private=False
    )
    blackpanther4_channel = Channel(
        name='Bit by bit ',
        server_id=7,
        type='Text',
        is_private=False
    )
    wanda4_channel = Channel(
        name='Sore eyes and tired fingers',
        server_id=8,
        type='Text',
        is_private=False
    )
    spiderman4_channel = Channel(
        name='digital nomads',
        server_id=9,
        type='Text',
        is_private=False
    )
    batman4_channel = Channel(
        name='surviving with google',
        server_id=10,
        type='Text',
        is_private=False
    )

    db.session.add(thor_channel)
    db.session.add(thor2_channel)
    db.session.add(thor3_channel)
    db.session.add(thor4_channel)
    db.session.add(flash_channel)
    db.session.add(flash2_channel)
    db.session.add(flash3_channel)
    db.session.add(flash4_channel)
    db.session.add(avenger_channel)
    db.session.add(avenger2_channel)
    db.session.add(avenger3_channel)
    db.session.add(avenger4_channel)
    db.session.add(superman_channel)
    db.session.add(superman2_channel)
    db.session.add(superman3_channel)
    db.session.add(superman4_channel)
    db.session.add(zenith_channel)
    db.session.add(zenith2_channel)
    db.session.add(zenith3_channel)
    db.session.add(zenith4_channel)
    db.session.add(hulk_channel)
    db.session.add(hulk2_channel)
    db.session.add(hulk3_channel)
    db.session.add(hulk4_channel)
    db.session.add(blackpanther_channel)
    db.session.add(blackpanther2_channel)
    db.session.add(blackpanther3_channel)
    db.session.add(blackpanther4_channel)
    db.session.add(wanda_channel)
    db.session.add(wanda2_channel)
    db.session.add(wanda3_channel)
    db.session.add(wanda4_channel)
    db.session.add(spiderman_channel)
    db.session.add(spiderman2_channel)
    db.session.add(spiderman3_channel)
    db.session.add(spiderman4_channel)
    db.session.add(batman_channel)
    db.session.add(batman2_channel)
    db.session.add(batman3_channel)
    db.session.add(batman4_channel)





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

    # thor_channel.members.append(user_1,user_2,user_3)
    # flash_channel.members.append(user_4,user_5,user_6)
    # avenger_channel.members.append(user_7,user_8,user_9)
    # superman_channel.members.append(user_10,user_1,user_2)
    # zenith_channel.members.append(user_3,user_4,user_5)
    # hulk_channel.members.append(user_6,user_7,user_8)
    # blackpanther_channel.members.append(user_9,user_10,user_1)
    # wanda_channel.members.append(user_2,user_3,user_4)
    # spiderman_channel.members.append(user_5,user_6,user_7)
    # batman_channel.members.append(user_8,user_9,user_10)
    # thor2_channel.members.append(user_1,user_2,user_3)
    # flash2_channel.members.append(user_4,user_5,user_6)
    # avenger2_channel.members.append(user_7,user_8,user_9)
    # superman2_channel.members.append(user_10,user_1,user_2)
    # zenith2_channel.members.append(user_3,user_4,user_5)
    # hulk2_channel.members.append(user_6,user_7,user_8)
    # blackpanther2_channel.members.append(user_9,user_10,user_1)
    # wanda2_channel.members.append(user_2,user_3,user_4)
    # spiderman2_channel.members.append(user_5,user_6,user_7)
    # batman2_channel.members.append(user_8,user_9,user_10)
    # thor3_channel.members.append(user_1,user_2,user_3)
    # flash3_channel.members.append(user_4,user_5,user_6)
    # avenger3_channel.members.append(user_7,user_8,user_9)
    # superman3_channel.members.append(user_10,user_1,user_2)
    # zenith3_channel.members.append(user_3,user_4,user_5)
    # hulk3_channel.members.append(user_6,user_7,user_8)
    # blackpanther3_channel.members.append(user_9,user_10,user_1)
    # wanda3_channel.members.append(user_2,user_3,user_4)
    # spiderman3_channel.members.append(user_5,user_6,user_7)
    # batman3_channel.members.append(user_8,user_9,user_10)
    # thor4_channel.members.append(user_1,user_2,user_3)
    # flash4_channel.members.append(user_4,user_5,user_6)
    # avenger4_channel.members.append(user_7,user_8,user_9)
    # superman4_channel.members.append(user_10,user_1,user_2)
    # zenith4_channel.members.append(user_3,user_4,user_5)
    # hulk4_channel.members.append(user_6,user_7,user_8)
    # blackpanther4_channel.members.append(user_9,user_10,user_1)
    # wanda4_channel.members.append(user_2,user_3,user_4)
    # spiderman4_channel.members.append(user_5,user_6,user_7)
    # batman4_channel.members.append(user_8,user_9,user_10)

    thor_channel.members.extend([user_1,user_2,user_3])
    flash_channel.members.extend([user_4,user_5,user_6])
    avenger_channel.members.extend([user_7,user_8,user_9])
    superman_channel.members.extend([user_10,user_1,user_2])
    zenith_channel.members.extend([user_3,user_4,user_5])
    hulk_channel.members.extend([user_6,user_7,user_8])
    blackpanther_channel.members.extend([user_9,user_10,user_1])
    wanda_channel.members.extend([user_2,user_3,user_4])
    spiderman_channel.members.extend([user_5,user_6,user_7])
    batman_channel.members.extend([user_8,user_9,user_10])
    thor2_channel.members.extend([user_1,user_2,user_3])
    flash2_channel.members.extend([user_4,user_5,user_6])
    avenger2_channel.members.extend([user_7,user_8,user_9])
    superman2_channel.members.extend([user_10,user_1,user_2])
    zenith2_channel.members.extend([user_3,user_4,user_5])
    hulk2_channel.members.extend([user_6,user_7,user_8])
    blackpanther2_channel.members.extend([user_9,user_10,user_1])
    wanda2_channel.members.extend([user_2,user_3,user_4])
    spiderman2_channel.members.extend([user_5,user_6,user_7])
    batman2_channel.members.extend([user_8,user_9,user_10])
    thor3_channel.members.extend([user_1,user_2,user_3])
    flash3_channel.members.extend([user_4,user_5,user_6])
    avenger3_channel.members.extend([user_7,user_8,user_9])
    superman3_channel.members.extend([user_10,user_1,user_2])
    zenith3_channel.members.extend([user_3,user_4,user_5])
    hulk3_channel.members.extend([user_6,user_7,user_8])
    blackpanther3_channel.members.extend([user_9,user_10,user_1])
    wanda3_channel.members.extend([user_2,user_3,user_4])
    spiderman3_channel.members.extend([user_5,user_6,user_7])
    batman3_channel.members.extend([user_8,user_9,user_10])
    thor4_channel.members.extend([user_1,user_2,user_3])
    flash4_channel.members.extend([user_4,user_5,user_6])
    avenger4_channel.members.extend([user_7,user_8,user_9])
    superman4_channel.members.extend([user_10,user_1,user_2])
    zenith4_channel.members.extend([user_3,user_4,user_5])
    hulk4_channel.members.extend([user_6,user_7,user_8])
    blackpanther4_channel.members.extend([user_9,user_10,user_1])
    wanda4_channel.members.extend([user_2,user_3,user_4])
    spiderman4_channel.members.extend([user_5,user_6,user_7])
    batman4_channel.members.extend([user_8,user_9,user_10])




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
