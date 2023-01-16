import React, { useState, useEffect} from 'react';


export default function ServerList() {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/servers/');
            const data = await res.json();
            setServers(data.servers);
        }
        fetchData();
    }, [])
  return (
    <div>
      <h1>Server List</h1>
      <ul>
        {servers.map(server => (
          <li key={server.id}>
            {server.name}
          </li>
        ))}
      </ul>
    </div>
  );
}