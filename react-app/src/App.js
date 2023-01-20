import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authenticate  from './store/session';
import LogoutButton from '../src/components/auth/LogoutButton'
import Routing from './Routing';
import HomePage from './components/HomePage';
import NavBar from './components/LandingPage/Navigation/NavBar';



function App() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(authenticate()).then(() => setLoaded(true));
    }, [dispatch]);
    // useEffect(() => {
    //     (async () => {
    //         await dispatch(authenticate());
    //         setLoaded(true);
    //     })();
    // }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <div>
            {
                (!user)
                    ?
                    <NavBar />
                    :
                    <></>
            }
            <Routing />
            {user ?
                <div>
                    {/* <HomePage /> */}
                    <LogoutButton />
                </div>
                :
                <></>
            }

        </div>
    );
}

export default App;
