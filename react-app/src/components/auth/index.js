import React from 'react';
import './SignUp.css';

import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import qrCode from '../../images/discord-qr-code.png';

export default function SignUpPage() {

    return(
        <div>
            <div className='sign-up-container'>
                <LoginForm />
            </div>
            <div className='qr-code-container'>
                <h3>Whiskord Repo</h3>
                <img src={qrCode} alt='qr-code'/>
            </div>
        </div>
    )
}
