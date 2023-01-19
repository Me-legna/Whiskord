import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Channels from "./Channels";
import Members from "./Members";
import ServerList from "./ServerComps/ServerList";
import SingleServer from "./ServerComps/SingleServer";
import { getChannelDetails } from "../../../store/channel";
import { getChannels } from "../../../store/channel";
import AllChannels from "./Channels/AllChannels";
import ChannelMembers from "./Channels/ChannelMembers";
import SingleChannel from "./Channels/SingleChannel";
import Chat from "../../Chat/Chat";
import Header from "../Header";
import "../HomePage.css";

function Body({ variable }) {
    const dispatch = useDispatch();

    
    //   const [channel, setChannel] = useState({});
    //   const handleSetChannel = (channel) => {
    //     setChannel(channel);
    //   };
    
    //   const { serverId, channelId } = useParams();

    const state = useSelector((state) => state);

    const serverId = useSelector((state) => state?.servers?.singleServer.id);   
    
    const channelId = useSelector((state) => state?.channel?.channelDetails?.id);


    const singleServer = useSelector((state) => state?.servers?.singleServer);

    const allChannels = useSelector((state) => state?.channel?.allChannels);

    const channelDetails = useSelector((state) => state?.channel?.channelDetails);
    
     // grab the channel/server from the redux store.
 const myServer = useSelector(state => state.servers.singleServer)

 //setting current user and server owner
 const currentUser = useSelector(state => state.session.user);
 const serverOwner = myServer.owner_id;



    const channelName = channelDetails?.name;

    useEffect(() => {
        if(channelId){
            dispatch(getChannelDetails(channelId));
        }
        if(serverId){
            dispatch(getChannels(serverId));
        }
        }, [dispatch, channelId, serverId]);



    // console.log('channelId', channelId)
    // console.log('channel', channel)
    // console.log('channels', channels)
    // console.log('channelDetails', channelDetails)
    // console.log('singleServer--------', singleServer)
    // console.log('state', state)

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
            { (singleServer) && 
                <AllChannels channels={allChannels} />
            }
            {/* <Channels handleSetChannel={handleSetChannel} /> */}
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
            {currentUser && currentUser?.id === serverOwner ? (
          <div>
            <EditChannelForm channel={channel} />
            <CreateChannel channel={channel} />
            <DeleteChannelForm /> 
          </div>
        ) : (<div></div>)}
            {(channelDetails && channelName) &&
            <div>
                <SingleChannel channel={channelDetails} />
                <Chat />
            </div>
            }
            {/* Messages */}
            {/* <Messages /> */}
        </div>
        <div className="member-list-container">
            {/*if Channel Private- Channel Members
                    else Server Members
                */}

            { (channelDetails.Members) &&
                <div>
                    
                    <h3>
                        <i className="fa-solid fa-user-group"></i>
                        &nbsp;
                        Members
                    </h3>
                    <ChannelMembers channel={channelDetails} />
                </div>
            }
        </div>
        </div>
    );

}

export default Body;
