import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails } from "../../../../store/channel";


export default function SingleChannel({ channel }) {
  const dispatch = useDispatch();
  const singleChannel = useSelector((state) => state.channel.channelDetails);
  // const state = useSelector((state) => state);
  // console.log("singleChannel", state.channel)
  useEffect(() => {
    if(singleChannel) dispatch(getChannelDetails(singleChannel.id));
  }, [dispatch, singleChannel.id]);

  return (
    <div>
      {/* <h1>{singleChannel.name}</h1>
      <p>{singleChannel.description}</p> */}
    </div>
  );
}
