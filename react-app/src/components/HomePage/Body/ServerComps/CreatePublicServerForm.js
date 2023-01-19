import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addServer } from "../../../../store/server";
import { addChannelMember, createNewChannel } from "../../../../store/channel";
import { useHistory } from "react-router-dom";

function CreatePublicServerForm() {
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    // setAllUsers(users)

    useEffect(() => {
        const validErrors = []
        if (name.length < 2 || name.length > 100) setErrors('Server name must be between 2 and 100')
        setErrors(validErrors)
    }, [name])

    const createServer = async (e) => {
        const ownerId = user.id
        e.preventDefault()
        console.log('name', name)
        console.log('ownerId', ownerId)
        console.log('imageUrl', imageUrl)

        const newServer = {
            name,
            ownerId,
            image_url: 'https://bit.ly/3CZn1ML',
            is_private: 'False',
            is_dm: 'False',
            capacity: 1000
        }

        const server = await dispatch(addServer(newServer))

        const newChannel = {
            name: 'general',
            server_id: server.id,
            type: 'Text',
            is_private: 'False'
        }
        console.log('server', server)

        const channel = await dispatch(createNewChannel(server.id, newChannel))
        console.log('channel', channel)

        await dispatch(addChannelMember(channel.id, ownerId))
            .then(() => history.push(`/home/channels/${server.id}/${channel.id}`))

    }



    return (
        // <h1>hello</h1>
        <div>
            <h1>Create a Server</h1>
            <form onSubmit={createServer}>
                <label>
                    Server Image
                    <input
                        type="input"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                <ul>
                    {name > 0 && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Server Name
                    <input
                        className="modal-input"
                        type="text"
                        placeholder="Enter a Server Name"
                        minLength={2}
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={name.length < 1}>Create</button>
            </form>
        </div >
    )
}

export default CreatePublicServerForm
