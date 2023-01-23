// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import "./DemoLogin.css";
import { useHistory } from "react-router-dom";

function FlashLogin() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email] = useState('flash@aa.io');
  const [password] = useState('password');
  // const [errors, setErrors] = useState([]);
  // const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(login(email, password))
    history.push('/home')

  };

  return (
    <button className='demo-user' onClick={handleSubmit}>
      {/* <div>Become one with the Speed Force?</div> */}
      <div>Demo</div>
        <i class="fa-solid fa-bolt"></i>
    </button>
  );
}

export default FlashLogin;
