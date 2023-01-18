import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannels } from "../../../../store/channel";
import AllChannels from "./AllChannels";
import SingleChannel from "./SingleChannel";
import ChannelMembers from "./ChannelMembers";

export default function Channels() {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState({});
  
  const serverId = useSelector((state) => state?.servers?.singleServer?.id);
  // const channels = useSelector((state) => state?.servers.singleServer?.channels);
  const channels = useSelector((state) => state?.channel?.channels);

  console.log(channels)

  useEffect(() => {
    dispatch(getChannels(serverId));
  }, [dispatch, serverId, channels]);

  const handleSetChannel = (channel) => {
    setChannel(channel);
  };

  return (
    <div>
      <AllChannels channels={channels} handleSetChannel={handleSetChannel} />
      <SingleChannel channel={channel} />
      <ChannelMembers channel={channel} />
    </div>
  );
}
