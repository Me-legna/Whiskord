import { useState } from "react";
import { useDispatch } from "react-redux";
// import { editMessage } from "../../../../store/message";

export default function EditMessageForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { channelId, serverId } = useParams();
  const myChannel = useSelector((state) => state.channels.channelDetails);

  const [content, setContent] = useState(message.content);
  const [isEdited, setEdited] = useState(false);
  const [selectEdit, setSelectEdit] = useState("");
  const [errors, setErrors] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");
  const enterContent = (e) => setContent(e.target.value);
  const choices = [
    { value: "true", label: "Private" },
    { value: "false", label: "Public" },
  ];

  useEffect(() => {
    const errors = [];

    if (content.length === 0)
      errors.push("Please provide content for your message.");
    setErrors(errors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      content,
      isEdited,
    };
    return dispatch(editMessage(channelId, payload))
      .then(() => history.push(`/home/${serverId}/${channelId}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  return (
    <>
      <div className="edit-message-form-header">
        <h1>Edit your message</h1>
      </div>

      <section className="message-form-container">
        <ul>
          {" "}
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <form className="messages-form-body" onSubmit={handleSubmit}>
          <input
            className="message-input"
            type="text"
            placeholder={`Message ${myChannel.name}`}
            value={content}
            onChange={enterContent}
          />
          <Select
            type={choices}
            placeholder="Select if message is edited"
            value={selectedOption}
            onChange={(selectedOption) => setSelectedOption(selectedOption)}
          />
        </form>
      </section>
    </>
  );
}
