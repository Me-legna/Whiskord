import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function AllChannels({ channels, handleSetChannel }) {

  return (
    <div>
      {
        (channels.allIds.length > 0) &&
        <h4>Channels</h4>
      }
      <ul>
        {channels?.allIds?.map((channelId) => {
          const channel = channels?.byId[channelId];
          console.log({ channel });
          // replace navLink with button
          return (
            <li key={channel.id}>
              <button onClick={() => handleSetChannel(channel)}>
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
