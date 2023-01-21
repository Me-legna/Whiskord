import React from 'react';
import './LoginSignupPage.css';

import LoginForm from './LoginForm';
import qrCode from '../../images/discord-qr-code.png';

export default function LoginSignUpPage() {

    return (
        <div className='main-container'>
            {/* <div className='welcome'> */}
                <h1>Welcome back!</h1>
                <p>We're so excited to see you again!</p>
                <div className='sign-up-container'>
                    <LoginForm />
                </div>
            {/* </div> */}
            <div className='qr-code-container'>
                <h2>Whiskord Repo</h2>
                <img src={qrCode} alt='qr-code' />
            </div>
        </div>
    )
}
