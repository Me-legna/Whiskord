import React, { useState, useEffect } from "react";
import { publicServers } from "../../../../store/server";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../../Icon"

export default function ServerList({clickHandler}) {
  // const serversObj = useSelector((state) => console.log(state.servers.allPublicServers.byId));
  // const serversObj = useSelector((state) => state.servers.allPublicServers.byId);
  // const servers = Object.values(serversObj);
  // console.log("servers", serversObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(publicServers());
  }, [dispatch]);

  // const toggleMenu = (server) => {
  //     setSelectedServer(server);
  //     setShowMenu((prev) => !prev);
  // }
  // if (!servers) {
  //   return null
  // }

  return (
    <div className="server-list">
      <h1>Hello</h1>
      {/* {servers.map(server => (
        <Icon
        imageUrl={server.img_url}
        isServer={true}
        clickEvent={clickHandler(server.id)}
        />
      ))} */}
      {/* <ul>
          <li className='server-list' key={server.id}>
            {server.name}
          </li>
          </ul> */}
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
