import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userParams, NavLink, useParams } from "react-router-dom";
import { serverDetails } from "../../../../store/server";
import ServerList from "./ServerList";
// import delete and edit channel form
// import delete and edit server form
// import OpenModalButton from "../OpenModalButton";
// import members list component
// import member form

export default function SingleServer() {
  const { serverId } = useParams();
  const serverName = useSelector((state) => console.log(state));
  // const channelName = useSelector((state) => state.channels.id);
  // const serverChannels = useSelector((state) => state.channels.server);
  // const serverChannelsArr = Object.values(serverChannels);
  const user = useSelector((state) => state.session.user);
  // const serverOwner = useSelector((state) => state.singleServer.owner_id);
  const dispatch = useDispatch();
  // const channelMessages = useSelector((state) => state.messages.channel);
  // const channelMessagesArr = Object.values(channelMessages);
  // const membersList = useSelector((state) => state.members.server);
  // const membersArr = Object.values(membersList);
  const history = useHistory();

  useEffect(() => {
    dispatch(serverDetails(serverId));
    // need to add channels, messages, members thunk
  }, [dispatch, serverId]);
    return (
      <h1>hello</h1>
    )
  }
//   return (
//     <div className="server-main-page-div">
//       <div className="server-main-page-header">
//         <div className="server-name">{serverName} </div>
//         <div className="channel-name">{channelName} </div>
//       </div>
//       <div className="server-body">
//         <div className="sever-list-and-dm-div">
//           {/* <div className='logo'>"logo here"</div> ?? should be logo or dm link? */}
//           {/* sohini's component */}
//           <ServerList />
//           {/* will need to grab the server id here.  */}
//           <div
//             className="single-server-button"
//             key={serverId}
//             onClick={() => history.push(`/servers/${serverId}`)}
//           >
//             {serverName}
//           </div>
//         </div>
//         <div className="channels-list">
//           {serverChannelsArr.map(({ id }) => (
//             <div
//               className="single-channel"
//               onClick={() => history.push(`/channels/${id}`)}
//             >
//               {channelName}
//             </div>
//           ))}
//         </div>
//         {/* edit and delete buttons for server and channels */}
//         {user && user?.id === serverOwner ? (
//           <div>
//             {/* <div className='button'>{<OpenModalButton
//                             modalComponent={<DeleteChannelForm />}
//                             buttonText="Delete Channel" />}
//                         </div>
//                         <div className='button'>{<OpenModalButton
//                             modalComponent={<EditChannelForm />}
//                             buttonText="Edit Channel" />}
//                         </div> */}
//             {/* <div className="button">
//               {
//                 <OpenModalButton
//                   modalComponent={<EditServerForm />}
//                   buttonText="Edit Sever"
//                 />
//               }
//             </div>
//             <div className="button">
//               {
//                 <OpenModalButton
//                   modalComponent={<DeleteServerForm />}
//                   buttonText="Delete Server"
//                 />
//               }
//             </div> */}
//           </div>
//         ) : null}
//       </div>

//       <div className="server-feed-div">
//         <div className="server-feed-block">
//           {" "}
//           {channelMessagesArr.map(({ user, created_at, message }) => (
//             <div className="feed-block-content">
//               <div className="user-message-creation-header">
//                 <div className="feed-user">{user}</div>
//                 <div className="feed-message-create-time">{created_at}</div>
//               </div>
//               <div className="feed-message">{message}</div>
//               {/* messages have to be in chronological order? */}
//             </div>
//           ))}
//           <div className="post-server-message">live chat feature here</div>
//         </div>
//       </div>

//       {/* <div className="members-list">
//         {membersArr.map(({ username }) => (
//           <div className="button">
//             {
//               <OpenModalButton
//                 modalComponent={<MemberForm />}
//                 buttonText={username}
//               />
//             }
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// }
