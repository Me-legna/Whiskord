import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Channels from "./Channels";
import Members from "./Members";
import ServerList from "./ServerComps/ServerList";
import SingleServer from "./ServerComps/SingleServer";
import { getChannelDetails } from "../../../store/channel";
import ChannelMembers from "./Channels/ChannelMembers";
import SingleChannel from "./Channels/SingleChannel";
import Header from "../Header";
import "../HomePage.css";

function Body({ variable }) {
    const dispatch = useDispatch();

  const [channel, setChannel] = useState({});
  const handleSetChannel = (channel) => {
    setChannel(channel);
  };

  const { serverId, channelId } = useParams();

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    }, [dispatch, channelId, serverId]);

  const state = useSelector((state) => state);

  const singleServer = useSelector((state) => state.servers.singleServer);

  const channelDetails = useSelector((state) => state?.channel?.channelDetails);

  const channelName = channelDetails?.name;


    console.log('channelId', channelId)
  console.log('channelDetails', channelDetails)
  console.log('state', state)

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
        <h3>{singleServer.name}</h3>
        <Channels handleSetChannel={handleSetChannel} />
      </div>
      <div className="messages-container">
        { (channelDetails && channelName) ?
            <div>
                <h3>
                    <i className="fa-regular fa-hashtag" ></i>
                    &nbsp;
                    {channelName}
                </h3>
            </div>
            :
            <h3>{singleServer.name}</h3>
        }
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
