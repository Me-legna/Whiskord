import { useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getChannelDetails } from "../../../../store/channel";

// import { useSelector } from "react-redux";

export default function AllChannels({ channels, handleSetChannel }) {
    const dispatch = useDispatch();

    const state = useSelector(state => state)
    console.log(state)

    const serverId = useSelector((state) => state.servers.singleServer.id);

    const history = useHistory();
  
    const handleRoute = (channelId) =>{ 
      history.push(`/home/${serverId}/${channelId}`);
    }

    const handleClick = (channelId) => {
        dispatch(getChannelDetails(channelId))
        // handleRoute(channelId)
    }
    
  return (
    <div>
      {
        (channels?.allIds?.length > 0) &&
        <h4>Text Channels</h4>
      }
      <ul>
        {channels?.allIds?.map((channelId) => {
          const channel = channels?.byId[channelId];
          console.log({ channel });
          // replace navLink with button
          return (
            <li key={channel.id}>
                <button onClick={() => {
                    handleSetChannel(channel)
                    handleRoute(channelId)
                    handleClick(channelId)
                }}>
                  <i className="fa-regular fa-hashtag"></i>
                  &nbsp;
                  {channel.name}
                </button>
              {/* <NavLink
                to={`/channels/${channel.id}`}
                onClick={() => handleSetChannel(channel)}
              >
                {channel.name}
              </NavLink> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
