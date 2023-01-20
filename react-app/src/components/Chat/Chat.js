import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import './Chat.css'
import { createMessage, editMessage, destroyMessage, getChannelMessages } from "../../store/message";

let socket;

const Chat = () => {
    const dispatch = useDispatch()

    const [messages, setMessages] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [edittedMessage, setEdittedMessage] = useState("");

    const prevMessages = useSelector(state => state?.channels?.channelDetails?.Messages)

    const dbMessages = useSelector(state => state?.messages?.byId)

    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state?.session?.user)
    const channel_id = useSelector(state => state?.channels?.channelDetails?.id)


    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        // join room for channel
        socket.emit('join', channel_id)
    
        // get previous messages from server
        // ???
    
        socket.on("chat", (chat) => {
            console.log('before sending message', {messages}, {chat})
            setMessages(messages => [...messages, chat])
            console.log('after setting message', {messages}, {chat})
            // dispatch(createMessage(channel_id, chatInput))
        })
        // when component unmounts, leave & disconnect
        return (() => {
            socket.emit('leave', channel_id)
            socket.disconnect()
        })
    }, [])


    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };
    
    const sendChat = (e) => {
        e.preventDefault()
        
        // send message to server/socket and then to other users
        socket.emit("chat", { user: user.username, msg: chatInput, channel_id });

        // on message send, create message in db
        dispatch(createMessage(channel_id, chatInput, user.id))

        // reset chatInput
        setChatInput("")
    }

    const editSubmitHandler = (messageId, messageContent) => {
        dispatch(editMessage(messageId, messageContent))
    }
    

    return (user && (
        <div>
            <div className="previous-messages-container">
            {prevMessages?.map((message, ind) => (
                <div key={ind} className='message-container'>
                    <div className="message-data-all">
                        <h1 className="message-profile-avatar">
                            <i className="fa-solid fa-circle-user"></i>
                        </h1>
                        <div className='message-all-text'>
                            <div className="message-name-and-date">
                                {/* {message.user.username} */}
                                <div className="message-name">
                                    {message.user.username}
                                </div>
                                &nbsp;
                                &nbsp;
                                <div className="message-date">
                                    {new Date(message.created_at).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                                </div>
                            {/* {`${message.user.username}: ${new Date(message.created_at).toLocaleString()}`} */}
                            </div>
                            <div className='message-content'>
                                {/* have isEditing state variable
                                    when true, display input box with submit button
                                    once submitted (on submit), set isEditing to false, send PUT request to server

                                    on cancel, set isEditing to false
                                */}
                                { isEditing ?
                                    <div>
                                        <form onSubmit={editSubmitHandler}>
                                            <input
                                                value={edittedMessage}
                                                onChange={setEdittedMessage}
                                            />
                                            <button type="submit">Send</button>
                                        </form>
                                    </div>
                                :
                                <div>
                                    {message.content}
                                </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div>
                        {user.id && user.id === message.user_id && (
                            <div className="messages-edit-delete-buttons">
                                <button >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                &nbsp;
                                <button>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            </div>

            <div className='new-messages-container'>
                {messages.map((message, ind) => (
                    <div key={ind} className='message-container'>
                        <div className="message-data-all">
                            <h1 className="message-profile-avatar">
                                <i className="fa-solid fa-circle-user"></i>
                            </h1>
                            <div className='message-all-text'>
                                <div className="message-name-and-date">
                                    <div className="message-name">
                                        {message.user}
                                    </div>
                                    &nbsp;
                                    &nbsp;
                                    <div className="message-date">
                                        {new Date().toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                                    </div>
                                    {/* {`${message.user}: ${new Date().toLocaleString()}`} */}
                                </div>
                                <div className='message-content'>
                                    {`${message.msg}`}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className="chat-form">
                <form onSubmit={sendChat}>
                    <input
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
    )
};


export default Chat;
