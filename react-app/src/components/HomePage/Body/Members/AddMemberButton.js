import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";

// export default function AddMemberButton() {
//     const user = useSelector((state) => state.session.user);
//     const serverOwner = useSelector((state) => state.singleServer.owner_id);

//     return (
//         <div>
//         {user && user.id === serverOwner ? (
//             <div className='button'>{<OpenModalButton
//                 modalComponent={<DeleteChannelForm />}
//                 buttonText="Delete Channel" />}
//             </div>
//         ): (<div></div>)}
//         </div>
//     );
//     }
