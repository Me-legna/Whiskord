from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    thor = User(
        username='Thor', email='thor@aa.io', password='password')
    flash = User(
        username='Flash', email='flash@aa.io', password='password')
    avenger = User(
        username='Avenger', email='avenger@aa.io', password='password')
    superman = User(
        username='Superman', email='superman@aa.io', password='password')
    zenith = User(
        username='Zenith', email='zenith@aa.io', password='password')
    hulk = User(
        username='Hulk', email='hulk@aa.io', password='password')
    blackpanther = User(
        username='BlackPanther', email='panther@aa.io', password='password')
    wanda = User(
        username='Wanda', email='wander@aa.io', password='password')
    spiderman = User(
        username='Spiderman', email='spiderman@aa.io', password='password')
    batman = User(
        username='Batman', email='batman@aa.io', password='password')

    db.session.add(thor)
    db.session.add(flash)
    db.session.add(avenger)
    db.session.add(superman)
    db.session.add(zenith)
    db.session.add(hulk)
    db.session.add(blackpanther)
    db.session.add(wanda)
    db.session.add(spiderman)
    db.session.add(batman)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
