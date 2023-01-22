import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editChannel } from '../../../../store/channel';
import "../Channels/channels.css";
import Select from 'react-select'


export default function EditChannelForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { serverId } = useParams();

    //drop down menu setup
    const [selectedOption, setSelectedOption] = useState('');
    const options = [
        {value:'true', label:'Private'},
        {value:'false', label:'Public'}
    ];

    // grab the channel from the redux store.
    const myChannel = useSelector(state => state?.channels?.channelDetails)

    //hooks
    const [name, setName] = useState(myChannel?.name || '');
    const [is_private, setIsPrivate] = useState(false);

    // setting errors here so that all field are filled out.
    const [errors, setErrors] = useState([]);

    const updateName = (e) => setName(e.target.value);
    const updateIsPrivate = (e) => setIsPrivate(e.target.value);


    // use effect errors
    useEffect(() => {
        const errors = [];
        if (name?.length === 0) errors.push('Please provide a name for your channel.');
        // use params to grab serverId
        setErrors(errors); // set errors to the array of errors
    }, [name])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("my channel", myChannel)
        const modifiedChannel = {
            name,
            // is_private,
        }

        //params grabbed from the referencing the thunk
        await dispatch(editChannel(serverId, myChannel.id, modifiedChannel))
            .then(history.push(`/home/${serverId}/${myChannel.id}`))
            // .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <>
            <div className='edit-channel-form'>
                <h1>Edit your Channel</h1>
            </div>
            <section className='edit-channel-container'>
                <div className='edit-channel-errors'>
                    <ul> {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                </div>

                <form className='edit-channel-form-body' onSubmit={handleSubmit}>
                    <label>Edit Channel Name</label>
                        <input className='edit-channel-form-input'
                            type="text"
                            placeholder={myChannel.name}
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    {/* <label> Channel Privacy Status </label>
                        <Select
                        options={options}
                        placeholder={myChannel.is_private}
                        value={selectedOption}
                        onChange={(selectedOption)=>
                            setSelectedOption(selectedOption)}
                        /> */}
                </form>

            </section>
        </>

    )
}
