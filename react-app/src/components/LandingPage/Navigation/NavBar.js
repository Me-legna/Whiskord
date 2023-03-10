
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../../auth/LogoutButton';
import WhiskordLogoCrop from '../../../images/Logo/WhiskordLogoCrop.png';
import ThorLogin from '../../DemoUserLogin/Thor';
import FlashLogin from '../../DemoUserLogin/Flash';

const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className='navbar-logo-and-name' style={{ fontWeight: '900' }}>
              <img src={WhiskordLogoCrop} alt='whiskord logo' />
              Whiskord
            </div>
          </NavLink>
        </li>


        {
          !user
            ?
            <div className='navbar-right-side'>
              {/* <li>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  <button>Sign Up</button>
                </NavLink>
              </li>
              <li> */}
              <div>
                <ThorLogin />
              </div>
              {/* &nbsp; */}
              <div>
                <FlashLogin />
              </div>
              <NavLink to='/login' exact={true} activeClassName='active'>
                <button>Login</button>
              </NavLink>
              {/* </li> */}
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
