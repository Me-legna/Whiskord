import React, { useState, useEffect } from "react";
import { publicServers } from "../../store/server";
import { useDispatch, useSelector } from "react-redux";

export default function ServerList() {
  const serversObj = useSelector((state) => state.servers.allPublicServers.byId
  );
  const servers = Object.values(serversObj);
  // console.log("servers", serversObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(publicServers());
  }, [dispatch]);

  // const toggleMenu = (server) => {
  //     setSelectedServer(server);
  //     setShowMenu((prev) => !prev);
  // }
  if (!servers) {
    return null
  }

  return  (
    <div className="server-list">
      <ul>
        {servers.map(server => (
          <li className='server-list' key={server.id}>
            {server.name}
          </li>
        ))}
      </ul>
      {/* {showMenu && (
        <ul className='server-list-dropdown'>
            <li>Invite People</li>
            <li>Mute Server</li>
            <li>Notification Settings</li>
            <li>Hide Muted Channels</li>
            <li>Server Settings</li>
            <li>Privacy Settings</li>
            <li>Edit server</li>
            <li>Leave Server</li>
            </ul>
      )} */}
    </div>
  );
}
