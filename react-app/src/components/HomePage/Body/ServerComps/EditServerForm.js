import React, { useState } from 'react';

function ServerForm() {

    // get server data from redux store
    const server = useSelector(state => state.servers.singleServer);

    const server_id = server.id;
    const is_private = server.is_private;
    const is_dm = server.is_dm;

    const [formData, setFormData] = useState({
        name: '',
        image_url: '',
        is_private: is_private,
        is_dm: is_dm,
        capacity: 0
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if(Object.keys(errors).length === 0) {
            fetch(`api/servers/${server_id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(res.statusText)
                    }
                    return res.json()
                })
                .catch(err => {
                    setErrors({ message: err.message });
                });
        }
        else {
            return
        }
    }
    


    return (
        <div>
            <h1>Edit Server</h1>

            <div>
                { Object.keys(errors).length > 0 && (Object.values(errors).map((error, index) => (
                    <p key={index}>{error}</p>
                )))}
            </div>


            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="name">Server Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={100}
                />
                </div>

                <div>
                <label htmlFor="image_url">Server Image URL:</label>
                <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label htmlFor="is_private">Server Privacy:</label>
                <input
                    type="checkbox"
                    name="is_private"
                    checked={formData.is_private}
                    onChange={handleChange}
                />
                </div>

                {/* <div>
                <label htmlFor="is_dm">Server Type:</label>
                <input
                    type="checkbox"
                    name="is_dm"
                    checked={formData.is_dm}
                    onChange={handleChange}
                />
                {errors.is_dm && <p>{errors.is_dm}</p>}
                </div> */}

                <div>
                <label htmlFor="capacity">Server Capacity:</label>
                <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ServerForm;
