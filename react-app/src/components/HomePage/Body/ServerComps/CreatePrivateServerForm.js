import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addServer, appendServerMember, serverDetails } from "../../../../store/server";
import { addChannelMember, createNewChannel } from "../../../../store/channel";

function CreatePrivateServerForm() {
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('');
    const [isDM, setIsDM] = useState(false)
    const [capacity, setCapacity] = useState(2)
    const [numSelected, setNumSelected] = useState(0)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedUserIds, setSelectedUserIds] = useState([])
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()
    // setAllUsers(users)



    const createServer = async (e) => {
        const ownerId = user.id
        e.preventDefault()

        const newServer = {
            name,
            ownerId,
            image_url: 'https://bit.ly/3CZn1ML',
            is_private: true,
            is_dm: isDM,
            capacity
        }

        const server = await dispatch(addServer(newServer))

        const newChannel = {
            name,
            server_id: server.id,
            type: 'Text',
            is_private: 'False',
            server: newServer
        }

        const channel = await dispatch(createNewChannel(server.id, newChannel))

        selectedUserIds.forEach(async userId => {
            await dispatch(appendServerMember(server.id, userId))
            await dispatch(addChannelMember(channel.id, userId))
        })

        await dispatch(serverDetails(server.id))
            .then(() => history.push(`/home/@me/${channel.id}`))


        console.log('newServer', server)
        // console.log('newChannel', channel)

    }

    useEffect(() => {
        if (numSelected === 0) setName('Unnamed')
        else {
            let groupName = ''

            selectedUsers.forEach(user => groupName += `${user}, `)
            setName(groupName)
        }
        if (numSelected === 1) setIsDM(true)
        else setIsDM(false)

        if (isDM) setCapacity(2)
        else setCapacity(10)
    }, [numSelected, selectedUsers,isDM])

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
            selectedUsers.push(user.username)
            selectedUserIds.push(user.id)
            setNumSelected(numSelected + 1)
        } else {
            setSelectedUsers(selectedUsers.filter(username => username !== user.username))
            setSelectedUserIds(selectedUserIds.filter(id => id !== user.id))
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
                <button type="submit" disabled={numSelected >= 9}>{numSelected === 1 ? 'Create DM' : 'Create Group'}</button>
            </form>
        </div>
    )
}

export default CreatePrivateServerForm
