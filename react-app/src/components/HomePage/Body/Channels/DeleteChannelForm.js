import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteChannel } from '../../../../store/channel';

export default function DeleteChannelForm() {
    const dispatch = useDispatch();
    const history = useHistory();


    const myChannel = useSelector(state => state.channels.channelDetails)
    const myServer = useSelector(state => state.servers.singleServer)
    const [errors, setErrors] = useState([]);
    const [boolean, setBoolean] = useState(false);

    const trueBoolean = (e) => setBoolean(true);
    const falseBoolean = (e) => setBoolean(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(deleteChannel(myChannel.id))
            .then(history.push(`/home/${myServer.id}`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }
    return (
        <div>
            <div className='form-header'>
                <h1>Are you sure you want to delete this channel?</h1>
            </div>
            <section className='form-body-container'>
                <div className='delete-errors'>
                    <ul>{errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        No
                        <input className='button'
                            type="radio"
                            required
                            checked={boolean ? false : true}
                            onChange={falseBoolean}
                        />
                    </label>
                    <label>
                        Yes
                        <input className='button'
                            type="radio"
                            required
                            checked={boolean}
                            onChange={trueBoolean}
                        />
                    </label>
                    <button
                        className='button form-button'
                        type="submit"
                        disabled={!boolean}
                    >Confirm</button>
                </form>
            </section>


        </div>

    )
}
