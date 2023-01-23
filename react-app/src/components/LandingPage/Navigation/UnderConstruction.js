import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../index.css';
// import homepage.css;

function UnderConstruction() {
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
                {/* {showMenu && (
        <ul className='server-list-dropdown'>
            <li>Invite People</li>
            <li>Mute Server</li>
            <li>Notification Settings</li>
            <li>Hide Muted Channels</li>
            <li>Server Settings</li>
            <li>Privacy Settings</li>
            <li>Edit server</li>
            <li>Leave Server</li>
            </ul>
      )} */}
      
            </div>
        </div>
    )
}
