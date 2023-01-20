import React, { useEffect } from "react";
import { publicServers, serverDetails } from "../../../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Icon from "../../../Icon"

export default function ServerList() {
  const serversObj = useSelector((state) => state.servers.allPublicServers.byId);
  const servers = Object.values(serversObj);

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(publicServers());
  }, [dispatch]);

  const publicServerDetails = (serverId) => {
    dispatch(serverDetails(serverId)).then(() => history.push(`/home/${serverId}`))
  }

  return (
    <div className="server-list">
      {servers.map((server, idx) => {
        // if(!idx) dispatch(serverDetails(server.id))
        // console.log('public', server)
        return (
          <div key={server.id}>
            <Icon
              // imageUrl={server.img_url}
              serverLetter={`${server.name[0]}`}
              isServer={true}
              clickEvent={() => publicServerDetails(server.id)}
            />
            <div className="server-list-button">
              <NavLink to={`/home/${server.id}`}>
                <button onClick={() => {
                    // setIsPrivate(false)
                    dispatch(serverDetails(server.id))
                    .then(() => history.push(`/home/${server.id}`))
                }}>
                  {/* <i className={`fa-solid fa-circle-h`}></i> */}
                  {/* {server.name} */}
                  {server.name[0]}
                </button>
              </NavLink>
            </div>
          </div>
        )})}
    </div>
  );
}
