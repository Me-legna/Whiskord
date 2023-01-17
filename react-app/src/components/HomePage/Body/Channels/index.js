import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannels } from "../../../../store/channel";
import AllChannels from "./AllChannels";
import SingleChannel from "./SingleChannel";
import ChannelMembers from "./ChannelMembers";

export default function Channels() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

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
