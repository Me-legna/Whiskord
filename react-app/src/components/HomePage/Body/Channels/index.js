// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getChannels } from "../../../../store/channel";
// import AllChannels from "./AllChannels";
// import SingleChannel from "./SingleChannel";
// import ChannelMembers from "./ChannelMembers";


// export default function Channels({ handleSetChannel }) {
//   const dispatch = useDispatch();
//   // const [channel, setChannel] = useState({});
//   const serverId = useSelector((state) => state?.servers?.singleServer.id);
//   // const serverId = useSelector((state) => 1);
//   // const serverName = useSelector((state) => state.servers.singleServer.name);
//   // const channels = useSelector((state) => state?.servers.singleServer?.channels);
//   const channels = useSelector((state) => state?.channel?.allChannels);


//   useEffect(() => {
//     dispatch(getChannels(serverId));
//   }, [dispatch, serverId]);

//   // const handleSetChannel = (channel) => {
//   //   setChannel(channel);
//   // };

//   return (
//     <div>
//       <AllChannels channels={channels} handleSetChannel={handleSetChannel} />
//     </div>
//   );
// }
