import React from 'react';
import './LoginSignupPage.css';

import LoginForm from './LoginForm';
import qrCode from '../../images/discord-qr-code.png';

export default function LoginSignUpPage() {

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
