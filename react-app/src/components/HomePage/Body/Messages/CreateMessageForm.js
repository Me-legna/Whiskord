import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import "../Messages/messages.css";
import { useHistory } from 'react-router-dom';
import {createMessage} from '../../../../store/message';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

export default function CreateMessage(){
    const dispatch= useDispatch();
    const history = useHistory();
    const { channelId,serverId } = useParams();
    const myChannel = useSelector(state => state.channels.channelDetails)

    const [content, setContent] = useState('');
    const [isEdited, setEdited] = useState(false);
    const [errors, setErrors] = useState([]);

    const enterContent= (e) => setContent(e.target.value);

    const [selectEdit, setSelectEdit] = useState('');
    const choices = [
        {value:'true', label:'Edited'},
        {value:'false', label:'Not Edited'}
    ];

    useEffect(() => {
        const errors = [];

        if (content.length === 0) errors.push('Please provide content for your message.');
        setErrors(errors);
    },[content])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            content,
            isEdited
        }
        return dispatch(createMessage(channelId, payload))
            .then(() => history.push(`/home/${serverId}/${channelId}`))
            .catch(async(res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };
    return (
        <>
            <div className='create-message-form-header'>
                <h1>Leave a message</h1>
           </div>

           <section className="message-form-container">
                <ul> {errors.map((error)=>(
                    <li key={error}>{error}</li>
                ))}</ul>
                <form className='messages-form-body' onSubmit={handleSubmit}>
                    <input className='message-input'
                        type='text'
                        placeholder={`Message ${myChannel.name}`}
                        value={content}
                        onChange={enterContent}
                    />
                    <Select
                        type={choices}
                        placeholder='Select if message is edited'
                        value={selectEdit}
                        onChange={setSelectEdit => setEdited(setSelectEdit)}
                    />
                </form>
           </section>
        </>
    );
}
