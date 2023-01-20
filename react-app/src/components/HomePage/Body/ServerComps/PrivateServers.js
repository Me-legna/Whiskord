//render list of servers where is_private == true
import React, { useEffect } from "react";
import { privateServers, publicServers, serverDetails } from "../../../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Icon from "../../../Icon"


function PrivateServers() {
    const serversObj = useSelector((state) => state.servers.allPrivateServers.byId);
    const servers = Object.values(serversObj);

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(privateServers());
    }, [dispatch]);

    const privateServerDetails = async (serverId) => {
        dispatch(serverDetails(serverId)).then(()=> history.push(`/home/@me/${serverId}`))

    }

    return (
        <div className="private-servers-list">
            {servers.map((server, idx) => {
                // if(!idx) dispatch(serverDetails(server.id))
                console.log('private', server)
                return (
                    <div key={server.id}>
                        <Icon
                            // imageUrl={server.img_url}
                            faIcon={`fa-solid fa-circle-${server.name[0].toLowerCase()}`}
                            clickEvent={() => privateServerDetails(server.id)}
                        />
                        {/* <NavLink to={`/home/@me`}>{server.name}</NavLink> */}
                    </div>
                )
            })}
        </div>
    )
}

export default PrivateServers
