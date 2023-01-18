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
        dispatch(serverDetails()).then(()=> history.push('/home/@me'))

    }

    return (
        <div className="private-servers-list">
            {servers.map((server, idx) => {
                // if(!idx) dispatch(serverDetails(server.id))
                return (
                    <div>
                        <Icon
                            imageUrl={server.img_url}
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
