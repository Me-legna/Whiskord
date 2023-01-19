import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Channels from "./Channels";
import Members from "./Members";
import ServerList from "./ServerComps/ServerList";

import ChannelMembers from "./Channels/ChannelMembers";
import SingleChannel from "./Channels/SingleChannel";
// import Header from "../Header";
import EditChannelForm from "./Channels/EditChannelForm";
import DeleteChannelForm from "./Channels/DeleteChannelForm";
import CreateChannel from "./Channels/CreateChannelForm";

import "../HomePage.css";

function Body({ variable }) {
  const [channel, setChannel] = useState({});
  const handleSetChannel = (channel) => {
    setChannel(channel);
  };

 // grab the channel/server from the redux store.
 const myServer = useSelector(state => state.servers.singleServer)

 //setting current user and server owner
 const currentUser = useSelector(state => state.session.user);
 const serverOwner = myServer.owner_id;

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
        {/* conditional rendering so only server owner can see edit/delete forms */}
        {currentUser && currentUser?.id === serverOwner ? (
          <div>
            <EditChannelForm channel={channel} />
            <CreateChannel channel={channel} />
          </div>
        ) : (<div></div>)}
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
