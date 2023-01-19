import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addServer } from "../../../../store/server";
import { createNewChannel } from "../../../../store/channel";

function CreatePrivateServerForm() {
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('https://bit.ly/3CZn1ML');
    const [isDM, setIsDM] = useState(false)
    const [capacity, setCapacity] = useState(2)
    const [numSelected, setNumSelected] = useState(0)
    const [seclectedUsers, setSeclectedUsers] = useState([])
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()
    // setAllUsers(users)


    const createServer = async (e) => {
        const ownerId = user.id
        e.preventDefault()

        if (numSelected === 0) await setName('Unnamed')
        if (numSelected === 1) await setIsDM(true)
        else await setIsDM(false)

        if (isDM) await setCapacity(2)
        else await setCapacity(10)

        const newServer = {
            name,
            ownerId,
            image_url: imageUrl,
            is_private: false,
            is_dm: false,
            capacity
        }

        const server = await dispatch(addServer(newServer))

        const newChannel = {
            name,
            server_id: server.id,
            type: 'Text',
            is_private: false
        }

        dispatch(createNewChannel(server.id, newChannel))
            .then((channel) => history.push(`/home/channels/${server.id}/${channel.id}`))

        console.log('newServer', newServer)
        console.log('newChannel', newChannel)

    }


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);


    function userSelected(e, user) {
        if (e.target.checked) {
            seclectedUsers.push(user.id)
            setNumSelected(numSelected + 1)
        } else {
            setSeclectedUsers(seclectedUsers.filter(id => id !== user.id))
            setNumSelected(numSelected - 1)
        }
    }

    // if (users) {
    const userComponents = users.map(user => {
        return (
            <label key={user.id}>
                {user.username}
                <input
                    type="checkbox"
                    id={user.id}
                    name={user.username}
                    value={user.username}
                    onChange={(e) => userSelected(e, user)}
                />
            </label>
        )
    })
    // }


    return (
        // <h1>hello</h1>
        <div>
            <h1>Select Friends</h1>
            {numSelected >= 9
                ?
                <h4>This group has a 10 member limit.</h4>
                :
                <h4>{`You can add ${9 - numSelected} more friends.`}</h4>
            }
            <form onSubmit={createServer}>
                <fieldset>
                    {userComponents}
                </fieldset>
                <button type="submit" disabled={numSelected >= 9}></button>
            </form>
        </div>
    )
}

export default CreatePrivateServerForm
