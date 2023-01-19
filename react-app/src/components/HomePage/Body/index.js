import React, { useEffect, useState } from "react";
import Channels from "./Channels";
import Members from "./Members";
import ServerList from "./ServerComps/ServerList";
import SingleServer from "./ServerComps/SingleServer";
import ChannelMembers from "./Channels/ChannelMembers";
import SingleChannel from "./Channels/SingleChannel";
import Header from "../Header";
import "../HomePage.css";
import Icon from "../../Icon";
import PrivateServers from "./ServerComps/PrivateServers";
import { useDispatch } from "react-redux";
import { privateServers, serverDetails } from "../../../store/server";
import { getChannels } from "../../../store/channel";
import { useHistory } from "react-router-dom";

function Body() {
  const [channel, setChannel] = useState({});
  const [isPrivate, setIsPrivate] = useState(true)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSetChannel = (channel) => {
    setChannel(channel);
  };

  const publicServerDetails = (serverId) => {
    setIsPrivate(false)
    dispatch(serverDetails(serverId)).then(() => history.push(`/home/channels/${serverId}`))
  }


  useEffect(() => {
    if(isPrivate){
      dispatch(privateServers())
    }
    else dispatch(getChannels())
  },[dispatch])


  return (
    <div className="main-body">
      {/* Main Div */}
      <div className="server-list-container">
        <Icon faIcon="fa-solid fa-shield-cat" isServer={true} clickEvent={() => setIsPrivate(!isPrivate)}/>
        <ServerList clickHandler={publicServerDetails}/>
        <Icon faIcon="fa-solid fa-plus" isServer={true} />
      </div>
      {/* <Header server={singleServerDetails} /> */}
      {/* <div><SingleServer /></div> */}
      <div className="channel-list-container">
        {/* Channels / Private Servers */}


        {/* History.push(/home/@me) private */}
        {/* History.push(/home/channels) channels*/}
        {isPrivate
          ? <PrivateServers />
          : <Channels />
        }
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
