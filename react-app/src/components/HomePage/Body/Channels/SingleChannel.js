import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails } from "../../../../store/channel";

export default function SingleChannel({ channel }) {
  const dispatch = useDispatch();
  const singleChannel = useSelector((state) => state.channels.channelDetails);
  // const state = useSelector((state) => state);
  // console.log("singleChannel", state.channels)
  // useEffect(() => {
  //   // if (singleChannel) dispatch(getChannelDetails(channel.id));

  // }, [dispatch, channel.id]);

  console.log(singleChannel);
  return (
    <>
      {/* <h1>{singleChannel?.name}</h1> */}
      {/* <p>{singleChannel?.description}</p> */}
    </>
  );
}
