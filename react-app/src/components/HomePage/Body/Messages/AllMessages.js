import React from "react";
import { useSelector } from "react-redux";
import "./AllMessages.css";


export default function AllMessages ({ messages }) {
    // const messages = useSelector((state) => state.messages.allMessages);
    // console.log(messages)
    
  return (
    <div className="all-messages">
      {messages?.map((message) => (
        <div key={message.id} className="message">
          <div className="message__user">
            <img
              className="message__user__image"
              src={message?.user?.image}
              alt="user"
            />
            <div className="message__user__name">{message?.user?.username}</div>
          </div>
          <div className="message__content">{message?.content}</div>
        </div>
      ))}
    </div>
  );
}
