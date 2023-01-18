import React, { useEffect, useState } from "react";
import Channels from "./Channels";
import Members from "./Members";
import ServerList from "./ServerComps/ServerList";
import SingleServer from "./ServerComps/SingleServer";
import ChannelMembers from "./Channels/ChannelMembers";
import SingleChannel from "./Channels/SingleChannel";
import Header from "../Header";
import "../HomePage.css";

function Body({ variable }) {
  const [channel, setChannel] = useState({});
  const handleSetChannel = (channel) => {
    setChannel(channel);
  };

  return (
    <div className="main-body">
      {/* Main Div */}
      <div className="server-list-container">
        <ServerList />
      </div>
      {/* <Header server={singleServerDetails} /> */}
      {/* <div><SingleServer /></div> */}
      <div className="channel-list-container">
        {/* Channels / Private Servers */}
        {/*
                (variable)
                History.push(/home/@me)
                ? <PrivateServers />

                History.push(/home/channels)
                    : <Channels />
            */}
            <h3>Channel Name</h3>
        <Channels handleSetChannel={handleSetChannel} />
      </div>
      <div className="messages-container">
        <h3>Messages</h3>
        <SingleChannel channel={channel} />
        {/* Messages */}
        {/* <Messages /> */}
      </div>
      <div className="member-list-container">
        {/*if Channel Private- Channel Members
                else Server Members
            */}
            <h3>Members</h3>
        <ChannelMembers channel={channel} />
      </div>
    </div>
  );
}

export default Body;
