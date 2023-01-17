import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../index.css';
// import homepage.css;

function HomePage() {
   return (

    <div className='home-page-main-div'>
        <div className='home-page-header'>
            <NavLink exact to="/">
                <img className='logo' ></img>
            </NavLink>
            <NavLink className="undeveloped-feat" exact to="feature under review page">Download</NavLink>
            <NavLink className="undeveloped-feat" exact to="feature under review page">Nitro</NavLink>
            <NavLink className="undeveloped-feat" exact to="feature under review page">Discover</NavLink>
            <NavLink className="undeveloped-feat" exact to="feature under review page">Contact Support</NavLink>
            <NavLink className="login-redirect" exact to="login-page">Login</NavLink>
        </div>

    </div>
   )
}
