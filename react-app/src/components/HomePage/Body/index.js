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
import Icon from "../../Icon";
import PrivateServers from "./ServerComps/PrivateServers";
import { privateServers, serverDetails } from "../../../store/server";
import { useHistory } from "react-router-dom";
import IconModal from "../../Icon/IconModal";
import CreatePublicServerForm from "./ServerComps/CreatePublicServerForm";
import CreatePrivateServerForm from "./ServerComps/CreatePrivateServerForm";
import EditChannelForm from "./Channels/EditChannelForm";
import DeleteChannelForm from "./Channels/DeleteChannelForm";
import CreateChannel from "./Channels/CreateChannelForm";


function Body() {
  const [channel, setChannel] = useState({});
  const [isPrivate, setIsPrivate] = useState(true)

  const dispatch = useDispatch()
  const history = useHistory()


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

    const handleSetChannel = (channel) => {
    setChannel(channel);
  };

  const publicServerDetails = (serverId) => {
    setIsPrivate(false)
    dispatch(serverDetails(serverId)).then(() => history.push(`/home/channels/${serverId}`))
  }


    useEffect(() => {
    if (isPrivate) {
      dispatch(privateServers())
    }
    else dispatch(getChannels())
  }, [dispatch])

    useEffect(() => {
        if(channelId){
            dispatch(getChannelDetails(channelId));
        }
        if(serverId){
            dispatch(getChannels(serverId));
        }
        }, [dispatch, channelId, serverId]);



  return (
    <div className="main-body">
      {/* Main Div */}
      <div className="server-list-container">
        <Icon faIcon="fa-solid fa-shield-cat" isServer={true} clickEvent={() => setIsPrivate(!isPrivate)} />
        <ServerList clickHandler={publicServerDetails} />
        {/* <IconModal modalComponent={CreatePublicServerForm} faIcon="fa-solid fa-plus" isServer={true} /> */}
        <IconModal modalComponent={<CreatePublicServerForm />} imageUrl='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8BAQGQkJCRkZH8/PwEBATi4uLr6+uHh4dZWVmEhIS1tbWioqKVlZVDQ0OysrLAwMC/v790dHRvb28cHBw5OTno6OhTU1NcXFxGRkZOTk4fHx+lpaXZ2dk3NzecnJz8LEaDAAADdElEQVR4nO3d61abQBRA4cEMhNwIUWPUan3/t+wMpt5CwMgZz4G1P9dq/ZXOXkNIKAw4BwAAAAAAAAAAAAAATnl//Dv+eN2xJOHP/D4h81W5qPb7Q7maaw9FXpiz+j57t6i1RyQrvOmKh9CVf2isnqe0qXq3Dnn5p8Ise9IelhQfLLMToXY5kVkMm2h5Gti40h6bDO+22Zfts5nDsNVmK+3BifDzMzMY3WmPTsR1R+HNFN6Kxdm8uOkWY09sdjOnb8J3pfYIhwqFtx19WXarPcKhvC/adqQfFNpDHMi7unMKs2ynPcSBmu9rndbaQxxs1lM40x7gYFc9heP/5kYhhfZRSKF9FFJoH4UU2kchhfZRSKF9FFJoH4UU2kchhfZRSKF9FFJoH4UU2kchhfb1XTFkrjBel37RFaHdc5hfUOhf1xOldvG/sOmZw02KUQ5T1Our79s89szh42b2TeHF1nXSizXj1lmU3RfEpvenjJFJNtbwovOui9J/z3WiK/y9W2Vxs+q84je9ZgAJ1mn4jpUvvy7JgqIQuNSevQ9y+Wv8vXuKi8+MiAMRX/n2rF11Qnr94oN20Gdhe6pkC2tDb8JGGI7sQtt7a4XBQjJwnhnaz7yRWxHerJE0Jxf93DfzYf/JUrBwoR3TSu6N6F2lHdOqEit0bq8d0+qvYOH05/CgHdPqIFjYck8EdbnovnSlndNqK1jYddMAPYJ3ufEmPxAlv5f2r1fWIHhs4Y+f+Ya+e8sfH8Z7P1g6usjFj/Hj/9NYkmdr6RuieWOficsUZ2nMHELlsgdObywdB2+T3LMvvOTdzcVj6ds9/WT3dXOX8DRisZQ993R5322Z9gRbjNyJnj88bL7/YrOXXXNqLeFtJX+w/+o7B/yzO39YuvXS9K/FoJBC+yik0D4KKbSPQgrto5BC+yik0D4KKbSPQgrto5BC+yik0D4KKbSPQgrto3D8haO7L8bFpj+H0y9Mc9WXHf3P7HrRHuJgu57CsT93resBj6/G/uw8F59/2HWZ7Oiff+jc1J9h6fo209FvpNH12cu582k8S7a5XcGZwGk8D9h3rM9Ms27it/njgqKv85hq5YuOcuqB7d/d1rYWFQxVVP9n7vhn9aw9JGHe1R/XEi/qSc1fI97Qblsu9vvqsFzN0y7tAQAAAAAAAAAAAAAAUPIPR8AudC1NyrEAAAAASUVORK5CYII=' />
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
            <IconModal modalComponent={<CreatePrivateServerForm />} imageUrl='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8BAQGQkJCRkZH8/PwEBATi4uLr6+uHh4dZWVmEhIS1tbWioqKVlZVDQ0OysrLAwMC/v790dHRvb28cHBw5OTno6OhTU1NcXFxGRkZOTk4fHx+lpaXZ2dk3NzecnJz8LEaDAAADdElEQVR4nO3d61abQBRA4cEMhNwIUWPUan3/t+wMpt5CwMgZz4G1P9dq/ZXOXkNIKAw4BwAAAAAAAAAAAAAATnl//Dv+eN2xJOHP/D4h81W5qPb7Q7maaw9FXpiz+j57t6i1RyQrvOmKh9CVf2isnqe0qXq3Dnn5p8Ise9IelhQfLLMToXY5kVkMm2h5Gti40h6bDO+22Zfts5nDsNVmK+3BifDzMzMY3WmPTsR1R+HNFN6Kxdm8uOkWY09sdjOnb8J3pfYIhwqFtx19WXarPcKhvC/adqQfFNpDHMi7unMKs2ynPcSBmu9rndbaQxxs1lM40x7gYFc9heP/5kYhhfZRSKF9FFJoH4UU2kchhfZRSKF9FFJoH4UU2kchhfZRSKF9FFJoH4UU2kchhfb1XTFkrjBel37RFaHdc5hfUOhf1xOldvG/sOmZw02KUQ5T1Our79s89szh42b2TeHF1nXSizXj1lmU3RfEpvenjJFJNtbwovOui9J/z3WiK/y9W2Vxs+q84je9ZgAJ1mn4jpUvvy7JgqIQuNSevQ9y+Wv8vXuKi8+MiAMRX/n2rF11Qnr94oN20Gdhe6pkC2tDb8JGGI7sQtt7a4XBQjJwnhnaz7yRWxHerJE0Jxf93DfzYf/JUrBwoR3TSu6N6F2lHdOqEit0bq8d0+qvYOH05/CgHdPqIFjYck8EdbnovnSlndNqK1jYddMAPYJ3ufEmPxAlv5f2r1fWIHhs4Y+f+Ya+e8sfH8Z7P1g6usjFj/Hj/9NYkmdr6RuieWOficsUZ2nMHELlsgdObywdB2+T3LMvvOTdzcVj6ds9/WT3dXOX8DRisZQ993R5322Z9gRbjNyJnj88bL7/YrOXXXNqLeFtJX+w/+o7B/yzO39YuvXS9K/FoJBC+yik0D4KKbSPQgrto5BC+yik0D4KKbSPQgrto5BC+yik0D4KKbSPQgrto3D8haO7L8bFpj+H0y9Mc9WXHf3P7HrRHuJgu57CsT93resBj6/G/uw8F59/2HWZ7Oiff+jc1J9h6fo209FvpNH12cu582k8S7a5XcGZwGk8D9h3rM9Ms27it/njgqKv85hq5YuOcuqB7d/d1rYWFQxVVP9n7vhn9aw9JGHe1R/XEi/qSc1fI97Qblsu9vvqsFzN0y7tAQAAAAAAAAAAAAAAUPIPR8AudC1NyrEAAAAASUVORK5CYII=' />
            <PrivateServers />
          </div>
          : <Channels />
        }

        <h3>{singleServer.name}</h3>
            { (singleServer) &&
                <AllChannels channels={allChannels} />
            }
            {/* <Channels handleSetChannel={handleSetChannel} /> */}
      </div>

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
