import React, { useEffect } from "react";
import { publicServers, serverDetails } from "../../../../store/server";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../../Icon"

export default function ServerList({ clickHandler }) {
  const serversObj = useSelector((state) => state.servers.allPublicServers.byId);
  const servers = Object.values(serversObj);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(publicServers());
  }, [dispatch]);



  return (
    <div className="server-list">
      {servers.map((server, idx) => {
        if(!idx) dispatch(serverDetails(server.id))
        return (
          <Icon
            imageUrl={server.img_url}
            isServer={true}
            clickEvent={() => clickHandler(server.id)}
          />
        )})}
    </div>
  );
}
