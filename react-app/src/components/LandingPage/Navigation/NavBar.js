
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../../auth/LogoutButton';
import WhiskordLogoCrop from '../../../images/Logo/WhiskordLogoCrop.png';

const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className='navbar-logo-and-name'>
              <img src={WhiskordLogoCrop} alt='whiskord logo'/>
              Whiskord
            </div>
          </NavLink>
        </li>

        <li className="navbar-links">
          <NavLink to='/' exact={true} activeClassName='active'>Download</NavLink>
          <NavLink to='/' exact={true} activeClassName='active'>Nitro</NavLink>
          <NavLink to='/' exact={true} activeClassName='active'>Discover</NavLink>
          <NavLink to='/' exact={true} activeClassName='active'>Safety</NavLink>
          <NavLink to='/' exact={true} activeClassName='active'>Support</NavLink>
          <NavLink to='/' exact={true} activeClassName='active'>Blog</NavLink>
          <NavLink to='/' exact={true} activeClassName='active'>Careers</NavLink>
        </li>

          {
            !user
            ?
            <div className='navbar-right-side'>
              <li>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  <button>Sign Up</button>
                </NavLink>
              </li>
              <li>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  <button>Login</button>
                </NavLink>
              </li>
              {/* <li>
                <NavLink to='/users' exact={true} activeClassName='active'>
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to='/chat' exact={true} activeClassName='active'>
                  Chat
                </NavLink>
              </li>
              <li>
                <LogoutButton />
              </li> */}
            </div>
            :
            <div className='navbar-right-side'>
              <li>
                <NavLink to='/home' exact={true} activeClassName='active'>
                  <button>Open Whiskord</button>
                </NavLink>
              </li>
            </div>
          }

      </ul>
    </nav>
  );
}

export default NavBar;
