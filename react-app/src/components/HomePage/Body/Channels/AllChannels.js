import { useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getChannelDetails } from "../../../../store/channel";
import { getChannelMessages } from "../../../../store/message";
import { useEffect } from "react";

// import { useSelector } from "react-redux";

export default function AllChannels({ channels }) {
    const dispatch = useDispatch();

    const state = useSelector(state => state)
    // console.log(state)

    const serverId = useSelector((state) => state.servers.singleServer.id);
    const channelId = useSelector((state) => state?.channels?.channelDetails?.id);
    // const {channelId} = useParams()

    const history = useHistory();

    const handleRoute = (channelId) =>{
    }

    // useEffect(()=> {
    //   // dispatch(getChannelMessages(channelId))
    //   history.push(`/home/${serverId}/${channelId}`);
    // }, [dispatch, history, channelId,serverId])

    const handleClick = (channelId) => {
        dispatch(getChannelDetails(channelId))
        dispatch(getChannelMessages(channelId))
        // handleRoute(channelId)
    }

    console.log('ALLCHANNEL channels', channels)

  return (
    <div>
      {
        // (channels?.allIds?.length > 0) &&
        (channels?.length > 0) &&
        <h6>TEXT-CHANNELS</h6>
      }
      {/* <h6>TEXT-CHANNELS</h6> */}
      <div>
        {/* {channels?.allIds?.map((channelId) => { */}
        {channels?.map((channel) => {
          // const channel = channels?.byId[channelId]
          const channelId = channel.id
          console.log({ channel });

          // replace navLink with button
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
