import React from 'react';
import { useModal } from '../../context/Modal';
import './Icon.css'

//set up to be resuable component to use for serverIcon, privateServerIcon userMessageIcon, memberIcon, createServerIcon
//example:
//<Icon isServer={true} clickEvent={() => console.log('hello')} imageUrl='https://i.pinimg.com/736x/3e/bd/e7/3ebde7a4c66db4c5c6f3ead8f8fa3205.jpg' />

function Icon({
    imageUrl, //image to render
    isServer=false, //give css class for hover effect if True
    clickEvent=null, //pass a custom clickevent for Icon
    component=null //can pass a component to load modal
}){

    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (component !== null) setModalContent(component);
        if (typeof clickEvent === 'function') clickEvent();
        else return () => null
    };
    return (
        <div className={`icon-img ${isServer ? 'server-icon' : ''}`} onClick={onClick}>
            <img src={imageUrl} alt='icon' className={`icon-img ${isServer ? 'server-icon' : ''}`} />
        </div>
    )
}

export default Icon
