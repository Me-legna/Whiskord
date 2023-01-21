import { NavLink } from "react-router-dom";

export default function Footer(){
    return (
        <div className='footer'>
            <div className='footer-links'>
                <NavLink to='https://github.com/andrew-bierman'>BDAWG</NavLink>
                <NavLink to='https://github.com/Me-legna'>IN THE ARMS OF AN ANGEL</NavLink>
                <NavLink to='https://github.com/andrea-green'>PIGGYSMOLS</NavLink>
                <NavLink to='https://github.com/sohinib12'>SOE</NavLink>
            </div>

        </div>
    )
}
