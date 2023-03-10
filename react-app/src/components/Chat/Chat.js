import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import "./Chat.css";
import {
  createMessage,
  editMessage,
  destroyMessage,
  getChannelMessages,
  resetMessageState,
} from "../../store/message";
import { getChannelMembers, resetChannelDetails } from "../../store/channel";
import { useParams } from "react-router-dom";

let socket;

const Chat = () => {
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [isEditing, setIsEditing] = useState("");
  const [edittedMessage, setEdittedMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState("");

  // const prevMessages = useSelector(state => state?.channels?.channelDetails?.Messages)

  const dbMessagesById = useSelector((state) => state?.messages?.byId);
  const dbMessages = Object.values(dbMessagesById);
  // const [testMessages, setTestMessages] = useState(dbMessages)
  console.log("DB MESSAGES -------", dbMessages);

  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state?.session?.user);
  const channel = useSelector((state) => state.channels.channelDetails);
  const channel_id = channel.id;

  // const { channelId } = useParams();
  // const channel_id = channelId

  // console.log('channel_id in func -----', channel_id)

  // useEffect(() => {
  //     dispatch(getChannelMessages(channel_id))
  //     dispatch(getChannelMembers(channel_id))
  // }, [dispatch, channel_id]);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    // join room for channel
    socket.emit("join", channel_id);

    // get previous messages from server
    // ???
    // dispatch(getChannelMessages(channel_id))

    socket.on("chat", (chat) => {
      // setMessages(messages => [...messages, chat])
      // console.log('printing???')
      // console.log('channelid in socket -----', channel_id)
      dispatch(getChannelMessages(channel_id));
    });

    // socket.on("edit", () => {
    //     // setMessages(messages => [...messages, chat])
    //     dispatch(getChannelMessages(channel_id))
    // })

    // when component unmounts, leave & disconnect
    return () => {
      socket.emit("leave", channel_id);
      socket.disconnect();
      // dispatch(resetMessageState())
      // dispatch(resetChannelDetails())
    };
  }, [channel_id, dispatch]);

  // useEffect(() => {
  //     // dispatch(getChannelMessages(channel_id))
  //     // console.log('dbMessages -----', dbMessages)
  //     setTestMessages(dbMessages)
  // }, [dispatch, dbMessages])

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();

    if (!chatInput || !user) return;

    // send message to server/socket and then to other users
    socket.emit("chat", { user: user.username, msg: chatInput, channel_id });

    // on message send, create message in db
    const newChat = await dispatch(
      createMessage(channel_id, chatInput, user.id)
    );

    // reset chatInput
    setChatInput("");
  };

  const editSubmitHandler = (messageId, messageContent) => {
    dispatch(editMessage(messageId, messageContent, channel_id, user.id));
    // setMessages(prevMessages => prevMessages.map(message =>
    //     message.id === messageId ? {...message, content: messageContent} : message
    // ))
    // send message to server/socket and then to other users
    socket.emit("chat", { channel_id });
  };

  const deleteSubmitHandler = (messageId) => {
    // let decision = window.confirm("Are you sure you want to delete this message?")
    // if (!decision) return

    dispatch(destroyMessage(messageId, channel_id, user.id));
    // setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId))
    socket.emit("chat", { channel_id });
  };

  return (
    user && (
      <div className="entire-chat-comp">
        {/* previous messages */}
        <div className="previous-messages-container">
          <div className="previous-messages-container">
            {dbMessages?.map(
              (message, ind) =>
                message.channel_id === channel_id && (
                  <div key={ind} className="message-container">
                    <div className="message-data-all">
                      <h1 className="message-profile-avatar">
                        <i className="fa-solid fa-circle-user"></i>
                      </h1>
                      <div className="message-all-text">
                        <div className="message-name-and-date">
                          {/* {message.user.username} */}
                          <div className="message-name">
                            {message.user.username}
                          </div>
                          &nbsp; &nbsp;
                          <div
                            className="message-date"
                            style={{ fontSize: "0.65em", color: "#a4a6aa" }}
                          >
                            {new Date(message.created_at).toLocaleString([], {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          {/* {`${message.user.username}: ${new Date(message.created_at).toLocaleString()}`} */}
                        </div>
                        <div className="message-content">
                          {/* have isEditing state variable
                                    when true, display input box with submit button
                                    once submitted (on submit), set isEditing to false, send PUT request to server

                                    on cancel, set isEditing to false
                                */}
                          {isEditing === message.id ? (
                            <div className="message-edit-container">
                              {/* {() => setEdittedMessage(message.content)} */}
                              <form
                                className="edit-form"
                                onSubmit={(e) => {
                                  e.preventDefault();

                                  editSubmitHandler(
                                    message.id,
                                    edittedMessage,
                                    channel_id,
                                    user.id
                                  );
                                  setIsEditing("");
                                }}
                              >
                                <input
                                  style={{ height: "25px" }}
                                  value={edittedMessage}
                                  onChange={(e) =>
                                    setEdittedMessage(e.target.value)
                                  }
                                />
                                <button type="submit">Update</button>
                                <button onClick={() => setIsEditing(false)}>
                                  Cancel
                                </button>
                              </form>
                            </div>
                          ) : (
                            <div>{message.content}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ width: "10%" }}>
                      {user.id && user.id === message.user_id && (
                        <div className="messages-edit-delete-buttons">
                          <button
                            onClick={() => {
                              setIsEditing(message.id);
                              setEdittedMessage(message.content);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          &nbsp;
                          {!isDeleting ? (
                            <button onClick={() => setIsDeleting(true)}>
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setIsDeleting(false);
                                  deleteSubmitHandler(message.id);
                                }}
                              >
                                Delete
                              </button>
                              <button onClick={() => setIsDeleting(false)}>
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
          {/*
           */}

          {/* <div className='new-messages-container'>
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
                                </div>
                                <div className='message-content'>
                                    {`${message.msg}`}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            */}
        </div>
        {/* send button */}
        <div className="chat-spacer">
          <div className="chat-form">
            <form className="chat-form-form" onSubmit={sendChat}>
              <input value={chatInput} onChange={updateChatInput} />
              <button className="chat-form-btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Chat;
