import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelMembers } from "../../../../store/channel";

export default function ChannelMembers({ channel }) {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.channels.members);
  const serverId = useSelector((state) => state?.servers?.singleServer?.id);

  useEffect(() => {
    // dispatch(getChannelMembers(serverId, channel.id));
  }, [dispatch, channel.id, serverId]);

  return (
    <div>
        {members?.allIds?.map((memberId) => {
          const member = members.byId[memberId];
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
