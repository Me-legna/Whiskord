import { useState } from "react";
import { useDispatch } from "react-redux";
import { editMessage } from "../../../../store/message";


export default function EditMessageForm({ message, setShowModal }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(message.content);
  const [errors, setErrors] = useState([]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content,
    };
    const data = await dispatch(editMessage(message.id, payload));
    if (data) {
      setErrors(data);
    } else {
      setShowModal(false);
    }
  };

  const updateContent = (e) => setContent(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <textarea
          value={content}
          onChange={updateContent}
          required
        />
      </div>
      <button type="submit">Edit Message</button>
    </form>
  );
}