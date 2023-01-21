//render list of servers where is_private == true
import React, { useEffect } from "react";
import { privateServers, publicServers, resetServerDetails, serverDetails } from "../../../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Icon from "../../../Icon"
import { resetMessageState } from "../../../../store/message";
import { resetChannelState, getChannels } from "../../../../store/channel";
import OpenModalButton from "../../../OpenModalButton";
import CreatePrivateServerForm from "./CreatePrivateServerForm";
import EditServerForm from "./EditServerForm";
import DeleteServerForm from "./DeleteServerForm";



function PrivateServers() {
    const serversObj = useSelector((state) => state.servers.allPrivateServers.byId);
    const servers = Object.values(serversObj);
    const singleServer = useSelector(state => state.servers.singleServer)
    const channelId = useSelector(state => state.channels.allChannels.allIds[0])

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        if (servers) {
            if (!channelId) {
                dispatch(getChannels(servers[0]?.id))
            }
        } else {
            dispatch(privateServers());
        }
    }, [dispatch, servers, channelId]);

    const privateServerDetails = (serverId) => {
        dispatch(resetMessageState())
        dispatch(resetChannelState())
        dispatch(resetServerDetails())
        dispatch(getChannels(serverId))
        dispatch(serverDetails(serverId))
        // history.push('/home/me/')
    }
    if (channelId) history.push(`/home/@me/${channelId}`)

    return (
        <div className="private-servers-list">
            <div className="flex">
                <h6>
                    Direct Messages
                </h6>
                {
                    Object.keys(singleServer).length ?
                    <div>
                        <OpenModalButton
                            faIcon={<i className="fa-solid fa-plus" />}
                            modalComponent={<CreatePrivateServerForm />}
                        />
                        <OpenModalButton
                            faIcon={<i className="fa-solid fa-pen-to-square" />}
                            modalComponent={<EditServerForm />}
                        />
                        <OpenModalButton
                            faIcon={<i className="fa-solid fa-trash-can" />}
                            modalComponent={<DeleteServerForm />}
                        />
                    </div>
                    : <></>
                }
            </div>
            {servers.map((server, idx) => {
                return (
                    <div className="server-list-button" key={server.id}>
                        <NavLink to={`/home/@me/${server.id}`}>
                            <button onClick={() => privateServerDetails(server.id)}>
                                {server.name[0]}
                            </button>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default PrivateServers
