import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails } from "../../store/channel";


export default function SingleChannel({ channel }) {
  const dispatch = useDispatch();
  const singleChannel = useSelector((state) => state.channelDetails);

  useEffect(() => {
    dispatch(getChannelDetails(channel.id));
  }, [dispatch, channel.id]);

  return (
    <div>
      <h1>{singleChannel.name}</h1>
      <p>{singleChannel.description}</p>
    </div>
  );
}
