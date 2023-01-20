from app.models import db, environment, SCHEMA
from ..models.message import Message
# Adds a demo user, you can add other users here if you want
def seed_messages():
    thor_message1 = Message(
        content = "I'm not online, I'm just in the 'clouds'",
        user_id = 1,
        channel_id = 1
        )
    thor_message2 = Message(
        content = "Why was the JavaScript developer always calm? He knew how to handle promises.'",
        user_id = 1,
        channel_id = 1
        )
    thor_message3 = Message(
        content = "I told my wife I was a programmer, she said 'Prove it.' So I wrote 'Hello World' on the kitchen whiteboard.",
        user_id = 1,
        channel_id = 1
        )
    flash_message1 = Message(
        content = "Python is an easier language to learn. No brackets, no main. Life changes when you get errors for writing an extra space ????????",
        user_id = 2,
        channel_id = 2
        )
    flash_message2 = Message(
        content = "Why was the computer cold? It left its Windows open",
        user_id = 2,
        channel_id = 2
        )
    flash_message3 = Message(
        content = "Why did the programmer go to the doctor? He had a case of the loops.",
        user_id = 2,
        channel_id = 2
        )
    avenger_message1 = Message(
        content = "What do we want? An end to acronyms. When do we want it? ASAP!",
        user_id = 3,
        channel_id = 3
        )
    avenger_message2 = Message(
        content = "Why did the developer go bankrupt? He used up all his cache.",
        user_id = 3,
        channel_id = 3
        )
    avenger_message3 = Message(
        content = "The developer's favorite hobby? Debugging.",
        user_id = 3,
        channel_id = 3
        )
    superman_message1 = Message(
        content = "Why don't scientists trust atoms? Because they make up everything!",
        user_id = 4,
        channel_id = 4
        )
    superman_message2 = Message(
        content = "What is the best thing about living in Switzerland? I do not know, but the flag is a big plus.",
        user_id = 4,
        channel_id = 4
        )
    superman_message3 = Message(
        content = "What is the difference between a fish and a piano? You cannot tuna fish.",
        user_id = 4,
        channel_id = 4
        )
    zenith_message1 = Message(
        content = "Why did the belt go to jail? For holding up the pants!",
        user_id = 5,
        channel_id = 5
        )
    zenith_message2 = Message(
        content = "A SQL query walks into a bar and sees two tables. He approaches them and asks 'Can I join you?",
        user_id = 5,
        channel_id = 5
        )
    zenith_message3 = Message(
        content = "Coding is just a bunch of if statements and coffee breaks!",
        user_id = 5,
        channel_id = 5
        )
    hulk_message1 = Message(
        content = "How do you explain the movie Inception? when you run a VM inside another VM, inside another VM, inside another VM…, everything runs real slow.",
        user_id = 6,
        channel_id = 6
        )
    hulk_message2 = Message(
        content = "A developer's favorite phrase is 'It works on my machine",
        user_id = 6,
        channel_id = 6
        )
    hulk_message3 = Message(
        content = "Coding is like a game of hide and seek, except you're the one hiding and the bugs are seeking.",
        user_id = 6,
        channel_id = 6
        )
    blackpanther_message1 = Message(
        content = "I'm not a millennial, I'm a member of the 'Zoomer' generation",
        user_id = 7,
        channel_id = 7
        )
    blackpanther_message2 = Message(
        content = "Knock, knock Who is it? very long pause...Java.",
        user_id = 7,
        channel_id = 7
        )
    blackpanther_message3 = Message(
        content = "Why did the two Java methods get a divorce? they had constant arguments.",
        user_id = 7,
        channel_id = 7
        )
    wanda_message1 = Message(
        content = "A good plan today is better than a perfect plan tomorrow.",
        user_id = 8,
        channel_id = 8
        )
    wanda_message2 = Message(
        content = "To understand recursion, you must first understand recursion.",
        user_id = 8,
        channel_id = 8
        )
    wanda_message3 = Message(
        content = "A coder's to-do list is like a never-ending story.",
        user_id = 8,
        channel_id = 8
        )
    spiderman_message1 = Message(
        content = "What is the object-oriented way to become wealthy? Inheritance.",
        user_id = 9,
        channel_id = 9
        )
    spiderman_message2 = Message(
        content = "Why did the developer go to the gym? To get some byte-lifting in.",
        user_id = 9,
        channel_id = 9
        )
    spiderman_message3 = Message(
        content = "Coding is like a science experiment, except the only thing blowing up is my computer.",
        user_id = 9,
        channel_id = 9
        )
    batman_message1 = Message(
        content = "Why did the chicken go to the seance? To talk to the other side!",
        user_id = 10,
        channel_id = 10
        )
    batman_message2 = Message(
        content = "How do you tell HTML from HTML5? Try it out in Internet Explorer. Did it work? No? It is HTML5.",
        user_id = 10,
        channel_id = 10
        )
    batman_message3 = Message(
        content = "Coding is like a puzzle, but with more coffee and less sleep.",
        user_id = 10,
        channel_id = 10
        )



    db.session.add_all([thor_message1, thor_message2, thor_message3])
    db.session.add_all([flash_message1, flash_message2, flash_message3])
    db.session.add_all([avenger_message1, avenger_message2, avenger_message3])
    db.session.add_all([superman_message1, superman_message2, superman_message3])
    db.session.add_all([zenith_message1, zenith_message2, zenith_message3])
    db.session.add_all([hulk_message1, hulk_message2, hulk_message3])
    db.session.add_all([blackpanther_message1, blackpanther_message2, blackpanther_message3])
    db.session.add_all([wanda_message1, wanda_message2, wanda_message3])
    db.session.add_all([spiderman_message1, spiderman_message2, spiderman_message3])
    db.session.add_all([batman_message1, batman_message2, batman_message3])
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
