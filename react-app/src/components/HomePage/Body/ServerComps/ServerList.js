import React, { useEffect } from "react";
import { publicServers, serverDetails } from "../../../../store/server";
import { getChannelDetails, getChannelMembers, getChannels } from "../../../../store/channel";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { resetMessageState } from "../../../../store/message";
import { resetChannelState } from "../../../../store/channel";
import { resetServerDetails } from "../../../../store/server";

export default function ServerList() {
  const serversObj = useSelector((state) => state.servers.allPublicServers.byId);
  const servers = Object.values(serversObj);
  const channelId = useSelector(state => state.channels.allChannels.allIds[0])


  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(publicServers());
  }, [dispatch]);

  const publicServerDetails = async (serverId) => {
    // dispatch(resetMessageState())
    // dispatch(resetChannelState())
    // dispatch(resetServerDetails())
    // console.log('SERVER ID', serverId)
    await dispatch(serverDetails(serverId))
    await dispatch(getChannels(serverId))
    .then((channels) => {
      if(channels.length){
        dispatch(getChannelDetails(channels[0].id))
        .then((channel) => history.push(`/home/${serverId}/${channel.id}`))
      } else {
        history.push(`/home/${serverId}`)
      }
    })

    // dispatch(getChannelMembers(channelId))

  }

  return (
    <div className="server-list">
      {servers.map((server, idx) => {
        return (
          <div className="server-list-button" key={server.id}>
            <NavLink to={`/home/${server.id}`}>
              <button onClick={() => publicServerDetails(server.id)}>
                {server.name[0]}
              </button>
            </NavLink>
          </div>
        )
      })}
    </div>
  );
}
