

export default function AllChannel ({channels, handleSetChannel}) {
    return (
        <ul>
            {channels.allIds.map((channelId) => {
                const channel = channels.byId[channelId];
                // replace navLink with button
                return (
                    <li key={channel.id}>
                        <NavLink to={`/channels/${channel.id}`} onClick={()=>handleSetChannel(channel)}>
                            {channel.name}
                        </NavLink>
                    </li>
                );
            }
            )}
        </ul>
    )

}
