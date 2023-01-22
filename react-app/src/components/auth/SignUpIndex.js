import React from 'react';

import './LoginSignupPage.css';
import SignUpForm from './SignUpForm';



export default function SignUpPage() {

    return (
        <div className='signup-page'>
            <div className='signup-main-container'>
                <h1>Create an account</h1>

                <div className='sign-up-page-container' style={{ padding: '30px 100px 0px 0px' }}>
                    <SignUpForm />
                </div>


            </div>
        </div>
    )
}
