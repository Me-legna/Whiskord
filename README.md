# Whiskord 🐱

A Discord inspired application built with Flask, React/Redux, SQLAlchemy, and SocketIO. Whiskord is a real-time messaging application that allows users to communicate with each other through servers, channels, and direct messages.


## ✨ Features
- Servers: Create and join servers for different communities.
- User login: Secure user authentication and authorization.
- Channels: Create and join channels for different topics within a server.
- Direct messages: Send direct messages to other users.
- Private servers: Create and join private servers for exclusive communication.

## ⚡ Technologies Used
- Flask: Backend framework for building web applications.
- React: Frontend library for building user interfaces.
- Redux: State management library for React.
- SQLAlchemy: Object-relational mapper for working with databases.
- SocketIO: Library for real-time communication between client and server.

## 🏠 Homepage
- [Whiskord](https://whiskord-htb4.onrender.com)

## 📺 Demo
- add Gif here when complete

## 🚀 Local Installation
1. Clone the repository

HTTPS:
```bash
git clone https://github.com/Me-legna/Whiskord.git
```
SSH:
```bash
git clone git@github.com:Me-legna/Whiskord.git
```

2. Install the dependencies
```bash
pipenv install -r requirements.txt
```

3. Create a .env file based on the example with proper settings for your development environment
```bash
SECRET_KEY= <your secret key>
DATABASE_URL=sqlite:///dev.db
SCHEMA=flask_schema
```

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```bash
pipenv shell
```

```bash
flask db upgrade
```

```bash
flask seed all
```

```bash
flask run
```

5. Change into the react-app directory

```bash
cd react-app
```

6. Install the dependencies
```bash
npm install
```

7. Start the application
```bash
npm start
```

5. Navigate to the application in your browser


## 💻 Usage
To use Whiskord, you need to sign up for an account (or use the demo user). You can then create or join a server. Once you're in a server, you can create or join channels and start communicating with other users.

## 📝 Documentation
- [API Documentation](https://github.com/Me-legna/Whiskord/wiki/API-Documentation)
- [Database Schema](https://github.com/Me-legna/Whiskord/wiki/Database-Schema)

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## ✏️ Authors
- 👤 [sohinib12](https://github.com/sohinib12)
- 👤 [Me-legna](https://github.com/Me-legna)
- 👤 [andrea-green](https://github.com/andrea-green)
- 👤 [andrew-bierman](https://github.com/andrew-bierman)


## 📋 License
Whiskord is released under the MIT License. See [MIT License](https://choosealicense.com/licenses/mit/) for details.
