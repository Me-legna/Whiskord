import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addServer,
  appendServerMember,
  serverDetails,
} from "../../../../store/server";
import { addChannelMember, createNewChannel, getChannelDetails, getChannels } from "../../../../store/channel";
import { useHistory } from "react-router-dom";
import Members from "../Members";
import { useModal } from "../../../../context/Modal";
import './servers.css';


function CreatePublicServerForm() {
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  // setAllUsers(users)

  useEffect(() => {
    const validErrors = [];
    if (name.length < 2 || name.length > 100)
      setErrors("Server name must be between 2 and 100");
    setErrors(validErrors);
  }, [name]);

  const createServer = async (e) => {
    const ownerId = user.id;
    e.preventDefault();

    const newServer = {
      name,
      ownerId,
      image_url: "https://bit.ly/3CZn1ML",
      is_private: false,
      is_dm: false,
      capacity: 1000,
      members: [],
    };

    const server = await dispatch(addServer(newServer))
    .then(async (newServer) => {
      await dispatch(getChannels(newServer.id))
      await dispatch(getChannelDetails(newServer.Channels[0]?.id))
      history.push(`/home/${newServer.id}/${newServer.Channels[0]?.id}`)
    })
    .then(server => closeModal());
    // 

    // const newChannel = {
    //     name: 'general',
    //     server_id: server.id,
    //     type: 'Text',
    //     is_private: 'False',
    //     server: newServer
    // }
    // console.log('server', server)

    // const channel = await dispatch(createNewChannel(server.id, newChannel))
    // console.log('channel', channel)

    // await dispatch(appendServerMember(server.id, ownerId))
    // await dispatch(addChannelMember(server.Channels[0].id, ownerId))

    // await dispatch(serverDetails(server.id))
    // server && history.push(`/home/${server.id}/${server.Channels[0]?.id}`)
  };

  return (
    // <h1>hello</h1>
    <div className='create-server'>
      <h1>Create a Server</h1>
      <form onSubmit={createServer}>
        {/* <label>
                    Server Image
                    <input
                        type="input"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label> */}
        <ul>
          {name > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Server name
          <input
            className="modal-input"
            type="text"
            placeholder="Enter a name for your server."
            minLength={2}
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={name.length < 1}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreatePublicServerForm;
