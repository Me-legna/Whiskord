import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { destroyServer } from "../../../../store/server";

function DeleteServerForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const server = useSelector(state => state.servers.singleServer)
    // const { closeModal } = useModal()
    const [checked, setChecked] = useState(false)
    const [errors, setErrors] = useState([]);

    console.log(server)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        await dispatch(destroyServer(server.id, server.is_private))
        .catch(
            async (res) => {
                const data = await res.json();

                if (data && data.errors) setErrors(data.errors);
            }
            // .then(closeModal)
            );

        history.push(`/home/@me/`)
    };

    return (
        <>
            <div className="modal-header">
                <h1>Delete this Server? {checked ? '😳' : '🤔'}</h1>
            </div>
            <div className="modal-body-container">

                <form onSubmit={handleSubmit} className='modal-body'>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <div>
                        <label>
                            No
                            <input
                                type="radio"
                                name="choice-radio"
                                className="clickable"
                                onChange={(e) => setChecked(false)}
                                checked={checked ? false : true}
                            />
                        </label>
                        <label>
                            Yes
                            <input
                                type="radio"
                                name="choice-radio"
                                className="clickable"
                                onChange={(e) => setChecked(true)}
                                checked={checked}
                            />
                        </label>
                    </div>
                    {/* <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label> */}
                    {checked && (<button type="submit" className="submit-spot clickable" disabled={!checked}>Delete Server</button>)}
                </form>
            </div>
        </>
    )
}

export default DeleteServerForm
