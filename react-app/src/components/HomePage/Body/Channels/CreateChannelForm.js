import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import "../Channels/channels.css";
import { useHistory } from 'react-router-dom';
import { createNewChannel } from '../../../../store/channel';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

export default function CreateChannel(){
    const dispatch= useDispatch();
    const history = useHistory();
    const {serverId} = useParams();

    const [name, setName] = useState('');
    const [type, setType] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);

    const enterName= (e) => setName(e.target.value);

    //errors
    const [errors, setErrors] = useState([]);

    // drop down menu setup
    const [selectedType,setSelectedType] = useState('');
    const types = [
        {value:'text', label:'Text'},
        {value:'voice', label:'Voice'}
    ];

    const [selectedOption, setSelectedOption] = useState('');
    const options = [
        {value:'true', label:'Private'},
        {value:'false', label:'Public'}
    ];

    useEffect(() => {
        const errors = [];

        if (name.length === 0) errors.push('Please provide a name for your channel.');
        if (!serverId) errors.push('Please provide a server id for your channel.');

        setErrors(errors);
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            type,
            isPrivate
        }
        return dispatch(createNewChannel(serverId, payload))
            .then(() => history.push(`/servers/${serverId}/channels`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };


    return (
        <>
            <div className="create-channel-form-header">
                <h1>Create a Channel</h1>
            </div>

            <section className='channel-form-container'>
                <ul>{errors.map((error)=>(
                    <li key={error}>{error}</li>
                ))}</ul>
                <form className='channel-form-body' onSubmit={handleSubmit}>
                    <label>Enter channel name </label>
                        <input className='channel-form-input'
                            type="text"
                            placeholder="Channel Name"
                            required
                            value={name}
                            onChange={enterName}
                        />
                    <label>Server</label>
                        <input className='channel-form-input'
                            type="text"
                            // placeholder={`Server #: ${serverId}`}
                            value={serverId}
                        />
                    <label>Channel Type</label>
                        <Select
                        type = {types}
                        placeholder="Select Channel Type"
                        value={selectedType}
                        onchange={(selectedType)=>setSelectedType(selectedType)}
                        />
                    <label>Channel Privacy Status</label>
                        <Select
                        type = {options}
                        placeholder="Select Channel Privacy Status"
                        value={selectedOption}
                        onchange={(selectedOption)=>setSelectedOption(selectedOption)}
                        />
                </form>
            </section>

        </>

    )
}
