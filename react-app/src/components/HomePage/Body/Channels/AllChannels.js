import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function AllChannels({ channels, handleSetChannel }) {
    // const channels2 = useSelector((state) => state.channels);
  return (
    <ul>
      {channels?.allIds.map((channelId) => {
        const channel = channels.byId[channelId];
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
  );
}
