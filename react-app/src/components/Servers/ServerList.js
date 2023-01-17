import React, { useState, useEffect} from 'react';
import { publicServers } from '../../store/server';
import { useDispatch, useSelector } from 'react-redux';


export default function ServerList() {
    const [servers, setServers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(publicServers())
    }, [dispatch])

    // const toggleMenu = (server) => {
    //     setSelectedServer(server);
    //     setShowMenu((prev) => !prev);
    // }

  return (
    <div className='server-list'>
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
