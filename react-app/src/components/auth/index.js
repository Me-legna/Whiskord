
import React from 'react';
import './LoginSignupPage.css';

import LoginForm from './LoginForm';
import qrCode from '../../images/discord-qr-code.png';

export default function LoginSignUpPage() {

    return (
        <div className='main-container'>
            <div className='welcome'>
                <h1 style={{marginLeft:'160px'}}>Welcome back!</h1>
                <p style={{margin:'0px 125px 0px 125px'}}>We're so excited to see you again!</p>
                <div className='sign-up-container' style={{padding: '30px 100px 0px 0px'}}>
                    <LoginForm />
                </div>
            </div>
            <div className='qr-code-container'>
                <h2>Whiskord Repo</h2>
                <img src={qrCode} alt='qr-code' />
            </div>
        </div>
    )
}
