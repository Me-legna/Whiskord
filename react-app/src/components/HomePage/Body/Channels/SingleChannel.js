import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails, getChannelMembers } from "../../../../store/channel";
import { getChannelMessages } from "../../../../store/message";

export default function SingleChannel({ channel }) {
  const dispatch = useDispatch();
  // const singleChannel = useSelector((state) => state.channels.channelDetails);
  const { channelId } = useParams()
  // const state = useSelector((state) => state);
  // console.log("singleChannel", state.channels)

  // useEffect(() => {
  //   dispatch(getChannelMessages(+channelId))
  //   dispatch(getChannelMembers(+channelId))
  // }, [dispatch, channelId]);

  // console.log(singleChannel);
  return (
    <>
      {/* <h1>{singleChannel?.name}</h1> */}
      {/* <p>{singleChannel?.description}</p> */}
    </>
  );
}
