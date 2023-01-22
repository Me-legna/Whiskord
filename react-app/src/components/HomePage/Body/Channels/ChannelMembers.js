import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelMembers } from "../../../../store/channel";

export default function ChannelMembers({ channel }) {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.channels.members);
  const serverId = useSelector((state) => state?.servers?.singleServer?.id);

  // useEffect(() => {
  //   dispatch(getChannelMembers(channel.id));
  // }, [dispatch, channel.id]);

  return (
    <div>
        {members?.allIds?.map((member) => {
          const memberId = member.id;
          return (
          <div key={member.id} className='members-individual-container'>

              <i className="fa-solid fa-circle-user"></i>
              &nbsp;
              &nbsp;
              {member.username}

          </div>
          )
        })}
    </div>
  );
}
