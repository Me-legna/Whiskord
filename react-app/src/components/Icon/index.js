import React from 'react';
import './Icon.css'

//set up to be resuable component to use for serverIcon, privateServerIcon userMessageIcon, memberIcon, createServerIcon
//example:
//<Icon isServer={true} clickEvent={() => console.log('hello')} imageUrl='https://i.pinimg.com/736x/3e/bd/e7/3ebde7a4c66db4c5c6f3ead8f8fa3205.jpg' />

function Icon({
    imageUrl, //image to render
    isServer = false, //give css class for hover effect if True
    clickEvent = null, //pass a custom clickevent for Icon
    serverLetter = null //can pass className for fa-icon
}) {

    return (
        <div className={`icon-img ${isServer ? 'server-icon' : ''}`} onClick={clickEvent ? clickEvent : () => null}>

            {
                !faIcon ?
                    <i className={`icon-img ${faIcon} ${isServer ? 'server-icon' : ''}`} ></i>

                    :
                    <img src={imageUrl} alt='icon' className={`icon-img ${isServer ? 'server-icon' : ''}`} />
            } */}
            {serverLetter}
        </div>
    )
}

export default Icon
