import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function AllChannels({ channels, handleSetChannel }) {
    // const channels2 = useSelector((state) => state.channels);
  return (
    <div>
      <h2>Channels</h2>
      <ul>
        {channels?.allIds?.map((channelId) => {
          const channel = channels.byId[channelId];
          console.log({channel})
          // replace navLink with button
          return (
            <li key={channel.id}>
              <NavLink
                to={`/channels/${channel.id}`}
                onClick={() => handleSetChannel(channel)}
              >
                {channel.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
