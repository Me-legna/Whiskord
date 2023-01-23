import { useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getChannelDetails, getChannelMembers } from "../../../../store/channel";
import { getChannelMessages } from "../../../../store/message";
import { useEffect } from "react";
import CreateChannel from "./CreateChannelForm";
import OpenModalButton from "../../../OpenModalButton";
import EditChannelForm from "./EditChannelForm";
import DeleteChannelForm from "./DeleteChannelForm";
// import { useParams } from "react-router-dom";
// import '../../../../App.css'


// import { useSelector } from "react-redux";

export default function AllChannels() {
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const singleServer = useSelector((state) => state?.servers?.singleServer);
  const serverId = useSelector((state) => state.servers.singleServer.id);
  // const channelId = useSelector((state) => state?.channels?.channelDetails?.id);
  const channels = useSelector((state) => state?.channels?.allChannels);
  const history = useHistory();
  const { channelId } = useParams()


  useEffect(() => {
    dispatch(getChannelMessages(channelId))
    dispatch(getChannelMembers(channelId))
  }, [dispatch, channelId]);

  const handleRoute = (channelId) => {
    history.push(`/home/${serverId}/${channelId}`);
  }

  // useEffect(()=> {
  //   // dispatch(getChannelMessages(channelId))
  //   history.push(`/home/${serverId}/${channelId}`);
  // }, [dispatch, history, channelId,serverId])


  const handleClick = async (channelId) => {
    await dispatch(getChannelDetails(channelId))
    await dispatch(getChannelMessages(channelId))
    await dispatch(getChannelMembers(channelId))
    // handleRoute(channelId)
  }


  return (
    <div>
      {/* <h3>{singleServer && singleServer.name}</h3> */}
      {
        (Object.values(singleServer).length !== 0 && !singleServer.is_private) &&
        <>
          <div className='channels-and-button'>
            <h6>TEXT-CHANNELS</h6>
            <div className='create-channel-button'>
              <OpenModalButton
                modalComponent={<CreateChannel serverId={serverId} />}
                faIcon={<i className="fa-solid fa-plus"></i>}
              />
            </div>
          </div>
          <div>
            {channels?.allIds?.map((channelId) => {
              // {channels?.map((channel) => {
              const channel = channels?.byId[channelId]
              // const channelId = channel.id

              return (
                <button key={channel.id} onClick={() => {
                  handleClick(channelId)
                  handleRoute(channelId)
                }}>
                  <i className="fa-solid fa-hashtag"></i>
                  &nbsp;
                  {channel.name}
                  <div>
                    <OpenModalButton
                      faIcon={<i className="fa-solid fa-pen-to-square" />}
                      modalComponent={<EditChannelForm />}
                    />
                    <OpenModalButton
                      faIcon={<i className="fa-solid fa-trash-can" />}
                      modalComponent={<DeleteChannelForm />}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </>
      }
    </div>
  );
}
