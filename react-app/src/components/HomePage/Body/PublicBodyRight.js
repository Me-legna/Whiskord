import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Channels from "./Channels";
import Members from "./Members";
import ServerList from "./ServerComps/ServerList";
import SingleServer from "./ServerComps/SingleServer";
import { getChannelDetails, getChannelMembers } from "../../../store/channel";
import { getChannels } from "../../../store/channel";
import { publicServers, serverDetails, privateServers } from "../../../store/server";
import AllChannels from "./Channels/AllChannels";
import ChannelMembers from "./Channels/ChannelMembers";
import SingleChannel from "./Channels/SingleChannel";
import Chat from "../../Chat/Chat";
import Header from "../Header";
import "../HomePage.css";
import Icon from "../../Icon";
import PrivateServers from "./ServerComps/PrivateServers";
import { editChannel } from "../../../store/channel";
import EditChannelForm from './Channels/EditChannelForm'
import CreateChannel from './Channels/CreateChannelForm'
import DeleteChannelForm from './Channels/DeleteChannelForm'

import { useHistory } from "react-router-dom";
import IconModal from "../../Icon/IconModal";
import CreatePublicServerForm from "./ServerComps/CreatePublicServerForm";
import CreatePrivateServerForm from "./ServerComps/CreatePrivateServerForm";
import { getChannelMessages } from "../../../store/message";

function PublicBody() {

        // const [channel, setChannel] = useState({});
        const [isPrivate, setIsPrivate] = useState(false)

        const dispatch = useDispatch()
        const history = useHistory()
        
        const state = useSelector((state) => state);
    
        // const serverId = useSelector((state) => state?.servers?.singleServer.id);
        const { serverId } = useParams();
      
        const singleServer = useSelector((state) => state?.servers?.singleServer);
    
        const allChannels = useSelector((state) => state?.channels?.allChannels);
        const channelId = allChannels.allIds[0]
    
        const channelDetails = useSelector((state) => state?.channels?.channelDetails);
    
        // grab the channel/server from the redux store.
        const myServer = useSelector(state => state.servers.singleServer)
    
        //setting current user and server owner
        const currentUser = useSelector(state => state.session.user);
        const serverOwner = myServer.owner_id;
    
        const channelName = channelDetails?.name;
    
        // const handleSetChannel = (channel) => {
        //     setChannel(channel);
        // };
    
        // const publicServerDetails = (serverId) => {
    
        //     dispatch(serverDetails(serverId)).then(() => history.push(`/home/${serverId}`))
        // }
    
        const logoClick = () => {
            setIsPrivate(true)
            history.push('/home/@me')
        }
    
    
        useEffect(() => {
            if (isPrivate) {
                dispatch(privateServers())
                // history.push(`/home/@me/$`)
            }
            else {
                console.log('Here we get all channels')
                dispatch(getChannels(serverId))
                dispatch(getChannelDetails(channelId))
                history.push(`/home/${serverId}/${channelId}`)
            }
    
            return (()=>{
                console.log('dismounting body')
            })
        }, [dispatch, history, isPrivate, singleServer, serverId, channelId])
    
        // useEffect(()=> {
        //     dispatch(getChannelDetails(channelId))
        //     history.push(`/home/${serverId}/${channelId}`)
        // },[dispatch,channelId])

        // console.log(currentUser)
    
        useEffect(() => {
            dispatch(publicServers());
            console.log('publicServers')
    
        }, [dispatch])
    

    return (
        <>
        {
            !singleServer.is_private && (
                <>
                    <div className='message-chat app-messages-container'>
                        <div className='chat-header'>
                            {/* channelname header */}
                            <h3>
                                <i className="fa-solid fa-hashtag"></i>
                                &nbsp;
                                {channelName}
                            </h3>
                        </div>
                        <div className='messages-and-input'>
                            {/* Route for chat component */}
                            <Chat />
                        </div>
                    </div>
                    <div className='member-list-container members'>
                        <div className='member-header'>
                            {/* members header */}
                            {(channelDetails?.Members) &&
                            <div>
                                <h3>
                                    <i className="fa-solid fa-user-group"></i>
                                    &nbsp;
                                    Members
                                </h3>
                            </div>
                            }
                        </div>
                        <div className='member-list'>
                            {/* member list */}
                            {(channelDetails?.Members) &&
                            <div>
                                <ChannelMembers channel={channelDetails} />
                            </div>
                            }
                        </div>
                    </div>
                </>

            )

        }
        </>
    )
}

export default PublicBody
