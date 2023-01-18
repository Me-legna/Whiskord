import { useState, useEffect } from "react"
import { useSelector } from "react-redux";


function CreateServerForm({users, user}) {
    // const user = useSelector(state => state.session.user)
    const [name, setName] = useState(`${user.username}'s Server`);
    const [imageUrl, setImageUrl] = useState('');
    const [isPrivate, setIsPrivate] = useState(false)
    const [isDM, setIsDM] = useState(false)
    const [capacity, setCapacity] = useState(2)
    const [numSelected, setNumSelected] = useState(0)
    const [seclectedUsers, setSeclectedUsers] = useState([])
    const [allUsers, setAllUsers] = useState([]);
    setAllUsers(users)



    const createServer = (e) => {
        const ownerId = user.id
        e.preventDefault()
        if (isDM) setCapacity(2)
        else if (isPrivate) setCapacity(10)
        else setCapacity(500000)

        const server = {
            name,
            ownerId,
            image_url: imageUrl,
            is_private: isPrivate,
            is_dm: isDM,
            capacity
        }


    }


    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('/api/users/');
    //         const responseData = await response.json();
    //         setUsers(responseData.users);
    //     }
    //     fetchData();
    // }, []);


    function userSelected(e, user) {
        if (e.target.checked) {
            seclectedUsers.push(user.id)
        } else {
            setSeclectedUsers(seclectedUsers.filter(id => id !== user.id))
        }
    }

    // if (users) {
    //     const userComponents = users.map(user => {
    //         return (
    //             <input
    //                 disabled={numSelected === 10}
    //                 type="checkbox"
    //                 id={user.id}
    //                 name={user.username}
    //                 value={user.username}
    //                 onChange={userSelected}
    //             />
    //         )
    //     })
    // }


    return (
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
                <label>
                    <input
                        type="checkbox"
                        onChange={() => setIsPrivate(!isPrivate)}
                    />
                </label>
                {isPrivate &&
                <fieldset>
                    <legend>Choose friends</legend>
                    {users && users.map(user => (
                        <label key={user.id}>
                            {user.name}
                            <input
                                disabled={numSelected === 10}
                                type="checkbox"
                                id={user.id}
                                name={user.username}
                                value={user.username}
                                onChange={e => userSelected(e, user)}
                            />
                        </label>
                        )
                    )}
                </fieldset>}

            </form>
        </div>
    )
}

export default CreateServerForm
