import React, { useState, useEffect} from 'react';


export default function ServerList() {
    const [servers, setServers] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedServer, setSelectedServer] = useState(null);


    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/servers/');
            const data = await res.json();
            setServers(data.servers);
        }
        fetchData();
    }, [])

    const toggleMenu = (server) => {
        setSelectedServer(server);
        setShowMenu((prev) => !prev);
    }

  return (
    <div className='server-list'>
      <h1>Server List</h1>
      <ul>
        {servers.map(server => (
          <li className='server-list-dropdown' key={server.id}>
            {server.name}
          </li>
        ))}
      </ul>
      {showMenu && (
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
      )}

    </div>
  );
}
