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
import Icon from "../../../Icon";
import { resetMessageState } from "../../../../store/message";
import { resetChannelState, getChannels } from "../../../../store/channel";
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
  const { setModalContent, setOnModalClose } = useModal();

  const channelId = channel.id;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await dispatch(privateServers());
      if(servers[0]) await dispatch(serverDetails(servers[0]?.id));
      await dispatch(getChannels(singleServer.id));
    })();
    // if (servers) {
    //     if(singleServer){
    //         if (!channelId) {
    //         }
    //     }
    // } else {
    // }
  }, [dispatch]);

  const privateServerDetails = (serverId) => {
    dispatch(resetMessageState());
    dispatch(resetChannelState());
    dispatch(resetServerDetails());
    dispatch(getChannels(serverId));
    dispatch(serverDetails(serverId));
    // history.push('/home/me/')
  };
  const handlePrivateServerModal = () => {
    setModalContent(<CreatePrivateServerForm />);
  };

  const handleEditServerModal = () => {
    setModalContent(<EditServerForm />);
  };
  const handleDeleteServerModal = (singleServer) => {
    setModalContent(<DeleteServerForm server={singleServer} />);
  };

  if (channelId) history.push(`/home/@me/${channelId}`);

  return (
    <div className="private-servers-list">
      <div className="flex">
        <div className="flex">
          <h6>Direct Messages</h6>
          <button onClick={() => handlePrivateServerModal()}>
            <i className="fa-solid fa-plus" />
          </button>
          {/* <OpenModalButton
            faIcon={<i className="fa-solid fa-plus" />}
            modalComponent={
              <CreatePrivateServerForm onClose={handlePrivateServerModal} />
            }
          /> */}
        </div>
        {Object.keys(singleServer).length ? (
          <div>
            <button onClick={() => handleEditServerModal()}>
              <i className="fa-solid fa-pen-to-square" />
            </button>
            <button onClick={() => handleDeleteServerModal(singleServer)}>
              <i className="fa-solid fa-trash-can" />
            </button>
            {/* <OpenModalButton
              faIcon={<i className="fa-solid fa-pen-to-square" />}
              modalComponent={
                <EditServerForm onClose={handleEditServerModal} />
              }
            />
            <OpenModalButton
              faIcon={<i className="fa-solid fa-trash-can" />}
              modalComponent={<DeleteServerForm />}
            /> */}
          </div>
        ) : (
          <></>
        )}
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
        );
      })}
    </div>
  );
}

export default PrivateServers;
