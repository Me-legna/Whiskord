import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import './Chat.css'
import { createMessage } from "../../store/message";

let socket;

const Chat = () => {
    const dispatch = useDispatch()

    const [messages, setMessages] = useState([]);
    const prevMessages = useSelector(state => state?.channels?.channelDetails?.Messages)
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
            setMessages(messages => [...messages, chat])
            
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
        
        socket.emit("chat", { user: user.username, msg: chatInput, channel_id });

        // on message send, create message in db
        dispatch(createMessage(channel_id, chatInput))
        setChatInput("")
    }
    

    return (user && (
        <div>
            <div className="previous-messages-container">
            {prevMessages?.map((message, ind) => (
                <div key={ind} className='message-container'>
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
                            {message.content}
                        </div>
                    </div>
                </div>
            ))}
            </div>

            <div className='new-messages-container'>
                {messages.map((message, ind) => (
                    <div key={ind} className='message-container'>
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
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;
