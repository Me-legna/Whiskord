import React, { useEffect } from "react";
import { publicServers, serverDetails } from "../../../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Icon from "../../../Icon"

export default function ServerList({ clickHandler }) {
  const serversObj = useSelector((state) => state.servers.allPublicServers.byId);
  const servers = Object.values(serversObj);

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(publicServers());
  }, [dispatch]);

  // const publicServerDetails = (serverId) => {
  //   dispatch(serverDetails(serverId)).then(() => history.push(`/home/channels/${serverId}`))
  // }

  return (
    <div className="server-list">
      {servers.map((server, idx) => {
        // if(!idx) dispatch(serverDetails(server.id))
        // console.log('public', server)
        return (
          <div key={server.id}>
            <Icon
              // imageUrl={server.img_url}
              faIcon={`fa-solid fa-circle-${server.name[0].toLowerCase()}`}
              isServer={true}
              clickEvent={() => clickHandler(server.id)}
            />
            {/* <NavLink to={`/home/${server.id}`}>{server.name}</NavLink> */}
          </div>
        )})}
    </div>
  );
}
