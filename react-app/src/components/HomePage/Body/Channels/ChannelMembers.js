import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getChannelMembers } from '../../../../store/channel';



export default function ChannelMembers({channel}) {
    const dispatch = useDispatch();
    const members = useSelector((state) => state?.channels?.members);
    const serverId = useSelector((state) => state?.servers?.singleServer?.id);


    useEffect(() => {
        dispatch(getChannelMembers(serverId, channel.id));
    }, [dispatch, channel.id]);

    return (
        <div>
            <ul>
                {members?.allIds?.map((memberId) => {
                    const member = members.byId[memberId];
                    return (
                        <li key={member.id}>
                            {member.username}
                        </li>
                    );
                }
                )}
            </ul>
        </div>
    )

}
