import { useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getChannelDetails, getChannelMembers } from "../../../../store/channel";
import { getChannelMessages } from "../../../../store/message";
import { useEffect } from "react";
import CreateChannel from "./CreateChannelForm";
import OpenModalButton from "../../../OpenModalButton";
// import '../../../../App.css'


// import { useSelector } from "react-redux";

export default function AllChannels({ channels }) {
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const serverId = useSelector((state) => state.servers.singleServer.id);
  const channelId = useSelector((state) => state?.channels?.channelDetails?.id);
  const history = useHistory();

  useEffect(() => {
      dispatch(getChannelMessages(channelId))
      dispatch(getChannelMembers(channelId))
  }, [dispatch, channelId]);

  const handleRoute = (channelId) => {
    history.push(`/home/${serverId}/${channelId}`);
  }

  // useEffect(()=> {
  //   // dispatch(getChannelMessages(channelId))
  //   history.push(`/home/${serverId}/${channelId}`);
  // }, [dispatch, history, channelId,serverId])


  const handleClick = async (channelId) => {
    await dispatch(getChannelDetails(channelId))
    await dispatch(getChannelMessages(channelId))
    await dispatch(getChannelMembers(channelId))
    // handleRoute(channelId)
  }


  return (
    <div>
      {
        (channels?.length > 0) &&
        <div className='channels-and-button'>
          <h6>TEXT-CHANNELS</h6>
          <div className='create-channel-button'>
            <OpenModalButton
              modalComponent={<CreateChannel serverId={serverId}/>}
              faIcon={<i style={{color:"#9d9d9f"}}className="fa-solid fa-plus"></i>}
            />
          </div>
        </div>
      }
      <div>
        {/* {channels?.allIds?.map((channelId) => { */}
        {channels?.map((channel) => {
          // const channel = channels?.byId[channelId]
          const channelId = channel.id


          return (
            // <li key={channel.id}>
            <button onClick={() => {
              handleClick(channelId)
              handleRoute(channelId)
            }}>
              <i className="fa-solid fa-hashtag"></i>
              &nbsp;
              {channel.name}
            </button>

            // </li>
          );
        })}
      </div>
    </div>
  );
}
