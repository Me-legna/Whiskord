//render list of servers where is_private == true
import React, { useEffect } from "react";
import {
    privateServers,
    publicServers,
    resetServerDetails,
    serverDetails,
} from "../../../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import Icon from "../../../Icon"
import { resetMessageState, getChannelMessages } from "../../../../store/message";
import { resetChannelState, getChannels, getChannelDetails, getChannelMembers } from "../../../../store/channel";

import OpenModalButton from "../../../OpenModalButton";
import CreatePrivateServerForm from "./CreatePrivateServerForm";
import EditServerForm from "./EditServerForm";
import DeleteServerForm from "./DeleteServerForm";
import { useModal } from "../../../../context/Modal";

function PrivateServers() {
    const serversObj = useSelector(
        (state) => state.servers.allPrivateServers.byId
    );
    const servers = Object.values(serversObj);
    const singleServer = useSelector((state) => state.servers.singleServer);
    const channel = useSelector((state) => state.channels.channelDetails);
    const user = useSelector(state => state.session.user)
    const { setModalContent, setOnModalClose } = useModal();

    const channelId = channel.id;

    const dispatch = useDispatch();
    const history = useHistory();


    // useEffect(() => {
    //     (async () => {
    //         // await dispatch(privateServers())
    //         await dispatch(serverDetails(servers[0]?.id))
    //         await dispatch(getChannels(singleServer.id))

    //     })();
    //     // if (servers) {
    //     //     if(singleServer){
    //     //         if (!channelId) {
    //     //         }
    //     //     }
    //     // } else {
    //     // }
    // }, [dispatch]);

    useEffect(() => {
        // console.log('activating useffect')
        dispatch(getChannelMessages(channelId))
        dispatch(getChannelMembers(channelId))
    }, [dispatch, channelId]);

    const privateServerDetails = async (serverId) => {
        // dispatch(resetMessageState())
        // dispatch(resetChannelState())
        // dispatch(resetServerDetails())
        await dispatch(serverDetails(serverId))
        await dispatch(getChannels(serverId))
            .then((channels) => dispatch(getChannelDetails(channels[0]?.id)))
            .then((channel) => history.push(`/home/@me/${channel?.id}`))
        // history.push('/home/me/')
    }
    // if (channelId) history.push(`/home/@me/${channelId}`)

    return (
        <div className="private-servers-list">
            <div className="flex">
                <div className="flex">
                    <h6 style={{ marginBottom: '0px', color: 'white', fontSize: "19px" }}>
                        Direct Messages
                    </h6>
                    <OpenModalButton

                        faIcon={<i style={{color: "white",cursor:'pointer'}}className="fa-solid fa-plus" />}

                        modalComponent={<CreatePrivateServerForm />}
                    />
                </div>
                {/* {
                    Object.keys(singleServer).length ?
                        <div>
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
                } */}
            </div>
            {servers.map((server, idx) => {
                return (
                    <div className="private-server-list-button" key={server.id}>
                        <NavLink to={`/home/@me/${server.Channels[0].id}`}>
                            <button onClick={() => privateServerDetails(server.id)}>
                                <div>
                                    <i className="fa-solid fa-user-group fa-xl"></i>
                                </div>
                                <div className="private-server-name-number">
                                    <div className="private-server-name">
                                        {server.name.length > 12
                                            ? (server.name.slice(0, 12) + '...')
                                            : server.name
                                        }
                                    </div>
                                    <div className="private-server-member-num">
                                        {server.Members.length}
                                        &nbsp;
                                        Members
                                    </div>
                                    {/* {server.name[0]} */}
                                </div>
                                <div className="private-server-action-btns">
                                    <OpenModalButton
                                        faIcon={<i className="fa-solid fa-pen-to-square" />}
                                        modalComponent={<EditServerForm />}
                                    />
                                    {server && server.owner_id === user.id &&
                                        <OpenModalButton
                                            faIcon={<i className="fa-solid fa-trash-can" />}
                                            modalComponent={<DeleteServerForm />}
                                        />
                                    }
                                </div>
                            </button>
                        </NavLink>
                    </div>
                )
            })}
        </div>
        //         {
        //         Object.keys(singleServer).length ? (
        //             <div>
        //                 <button onClick={() => handleEditServerModal()}>
        //                     <i className="fa-solid fa-pen-to-square" />
        //                 </button>
        //                 <button onClick={() => handleDeleteServerModal(singleServer)}>
        //                     <i className="fa-solid fa-trash-can" />
        //                 </button>
        //                 {/* <OpenModalButton
        //               faIcon={<i className="fa-solid fa-pen-to-square" />}
        //               modalComponent={
        //                 <EditServerForm onClose={handleEditServerModal} />
        //               }
        //             />
        //             <OpenModalButton
        //               faIcon={<i className="fa-solid fa-trash-can" />}
        //               modalComponent={<DeleteServerForm />}
        //             /> */}
        //             </div>
        //         ) : (
        //         <></>
        //     )
        //     }
    );
}

export default PrivateServers;
