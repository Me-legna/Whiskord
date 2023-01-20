import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Channels from "./Channels";
import Members from "./Members";
import ServerList from "./ServerComps/ServerList";
import SingleServer from "./ServerComps/SingleServer";
import { getChannelDetails } from "../../../store/channel";
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


function Body() {
  const [channel, setChannel] = useState({});
  const [isPrivate, setIsPrivate] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()


 const state = useSelector((state) => state);

    // const serverId = useSelector((state) => state?.servers?.singleServer.id);
    const { serverId } = useParams();

    const channelId = useSelector((state) => state?.channels?.channelDetails?.id);


    const singleServer = useSelector((state) => state?.servers?.singleServer);

    const allChannels = useSelector((state) => state?.channels?.allChannels);

    const channelDetails = useSelector((state) => state?.channels?.channelDetails);

     // grab the channel/server from the redux store.
    const myServer = useSelector(state => state.servers.singleServer)

    //setting current user and server owner
    const currentUser = useSelector(state => state.session.user);
    const serverOwner = myServer.owner_id;

    const channelName = channelDetails?.name;

    const handleSetChannel = (channel) => {
        setChannel(channel);
    };

    const publicServerDetails = (serverId) => {
        setIsPrivate(false)
        dispatch(serverDetails(serverId)).then(() => history.push(`/home/${serverId}`))
    }

    const logoClick = () => {
        setIsPrivate(!isPrivate)
        history.push('/home/@me')
    }


    useEffect(() => {
        if (isPrivate) {
        dispatch(privateServers())
        }
        else dispatch(getChannels(serverId))
    }, [dispatch, isPrivate, singleServer])

    useEffect(() => {
        if(channelId){
            dispatch(getChannelDetails(channelId));
        }
        if(serverId){
            console.log('GETTING TO HERE (IN DISPATCH CALL')
            dispatch(getChannels(serverId));
        }
        }, [dispatch, channelId, serverId]);
    
    useEffect(() => {
        dispatch(publicServers());
        console.log('publicServers')

    },[dispatch])


    return (
        <div className="main-body">
        {/* Main Div */}
            <div className="server-list-container">
                <Icon faIcon="fa-solid fa-shield-cat" isServer={true} clickEvent={() => logoClick} />
                <ServerList clickHandler={publicServerDetails} />
                {/* <IconModal modalComponent={CreatePublicServerForm} faIcon="fa-solid fa-plus" isServer={true} /> */}
                <IconModal modalComponent={<CreatePublicServerForm />}  />
            </div>
            {/* <Header server={singleServerDetails} /> */}
            {/* <div><SingleServer /></div> */}
            <div className="channel-list-container">
                {/* Channels / Private Servers */}


                {/* History.push(/home/@me) private */}
                {/* History.push(/home/channels) channels*/}
                {isPrivate
                ?
                <div>
                    <IconModal modalComponent={<CreatePrivateServerForm />} />
                    <PrivateServers />
                </div>
                :
                <div>
                    <h3>{singleServer.name}</h3>
                    { (singleServer) && 
                        <AllChannels channels={allChannels} />
                    }
                    {/* <Channels handleSetChannel={handleSetChannel} /> */}
                </div>
                }
            </div>


            <div className="messages-container">

                {currentUser && currentUser?.id === serverOwner ? (
                    <>
                        {/* <EditChannelForm channel={channel} />
                        <CreateChannel channel={channel} />
                        <DeleteChannelForm /> */}
                    </>
                    ) : (<></>)}
                        {(channelDetails && channelName) &&
                        <>
                            <h3>
                                <i className="fa-solid fa-hashtag"></i>
                                &nbsp;
                                {channelName}
                            </h3>
                            <SingleChannel channel={channelDetails} />
                            <Chat />
                        </>
                }
            </div>

            <div className="member-list-container">
                {/*if Channel Private- Channel Members
                        else Server Members
                    */}
                { (channelDetails?.Members) &&
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
