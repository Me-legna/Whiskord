import React, {useEffect} from 'react'
import { useSelector} from 'react-redux'


export default function Header() {

    const myServer= useSelector(state => state.servers.singleServer)
    const myChannel = useSelector(state => state.channel.channelDetails)
    // const myChannel = useSelector(state => console.log(state))


    useEffect(() => {
    },[myServer,myChannel]);

    return (
        // <h1>Replace This h1</h1>

        <div className='server-main-page-header'>
            <div className='server-name'>{myServer.name}</div>
            {myChannel && <div className='channel-name'>{myChannel.name}</div>}
        </div>
    )
}
