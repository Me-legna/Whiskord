import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import LogoutButton from '../src/components/auth/LogoutButton'
import Routing from './Routing';
import HomePage from './components/HomePage';
import NavBar from './components/LandingPage/Navigation/NavBar';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Chat from './components/Chat/Chat';
import { Route, Switch, useHistory } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import UsersList from './components/Users/UsersList';
import User from './components/Users/User';
import NotFoundPage from './components/404Page';
import PrivateServers from './components/HomePage/Body/ServerComps/PrivateServers';
import ServerList from './components/HomePage/Body/ServerComps/ServerList';
import AllChannels from './components/HomePage/Body/Channels/AllChannels';
import PrivateBody from './components/HomePage/Body/PrivateBodyRight';
import PublicBody from './components/HomePage/Body/PublicBodyRight';
import Icon from './components/Icon';
import { addServer, privateServers, publicServers, resetServerDetails } from './store/server';
import IconModal from './components/Icon/IconModal';
import CreatePrivateServerForm from './components/HomePage/Body/ServerComps/CreatePrivateServerForm';
import OpenModalButton from './components/OpenModalButton';
import CreatePublicServerForm from './components/HomePage/Body/ServerComps/CreatePublicServerForm';
import { resetMessageState } from './store/message';
import { resetChannelState } from './store/channel';

function App() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [loaded, setLoaded] = useState(false);
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(authenticate()).then(() => setLoaded(true));
        dispatch(publicServers());
    }, [dispatch]);
    // useEffect(() => {
    //     (async () => {
    //         await dispatch(authenticate());
    //         setLoaded(true);
    //     })();
    // }, [dispatch]);

    const getPrivateServers = () => {
        dispatch(resetMessageState())
        dispatch(resetChannelState())
        dispatch(resetServerDetails())
        dispatch(privateServers())
        history.push('/home/@me')
    }


    if (!loaded) {
        return null;
    }

    return (
        <div>
            {!user
                ? (
                    <>
                        <NavBar />
                        <Switch>
                            < Route path="/" exact={true}>
                                <LandingPage />
                            </Route>
                            <Route path="/login" exact={true}>
                                <LoginForm />
                            </Route>
                            <Route path="/sign-up" exact={true}>
                                <SignUpForm />
                            </Route>
                            <ProtectedRoute path="/users" exact={true}>
                                <UsersList />
                            </ProtectedRoute>
                            <ProtectedRoute path="/users/:userId" exact={true}>
                                <User />
                            </ProtectedRoute>
                            <Route path='/'>
                                <NotFoundPage />
                            </Route>
                        </Switch>
                    </>
                )
                : (
                    <Switch>
                        {/* Landing Page */}
                        < Route path="/" exact={true}>
                            <LandingPage />
                        </Route>
                        <ProtectedRoute path='/home'>
                            <div className='app-container flex'>

                                <div className='sidebar'>

                                    <div className="server-list-button">
                                        <button className="" onClick={getPrivateServers}>Pr</button>
                                    </div>

                                    {/* Load all public servers */}
                                    <ServerList />

                                    <div className="server-list-button">
                                        <OpenModalButton
                                            buttonText={'+'}
                                            modalComponent={<CreatePublicServerForm />} />
                                    </div>

                                </div>

                                <div className='body flex'>
                                    <div className='body-inner'>
                                        <div servername header>
                                            {/* servername header component here*/}
                                        </div>

                                        <div className='body-inner'>
                                            {/* Route to load private server channel list */}
                                            <ProtectedRoute path="/home/@me" >
                                                <PrivateServers />
                                            </ProtectedRoute>
                                            {/* Route to load public server channels list */}
                                            <ProtectedRoute path="/home/:serverId" >
                                                <AllChannels />
                                            </ProtectedRoute>
                                        </div>
                                    </div>

                                    <div className='body-inner'>

                                        {/* Load messages, header, and members of Private Server */}
                                        <ProtectedRoute path="/home/@me/:channelId" >
                                            <PrivateBody />
                                        </ProtectedRoute>

                                        {/* Load messages, header, and members of Public Server */}
                                        <ProtectedRoute path="/home/:serverId/:channelId" >
                                            <PublicBody />
                                        </ProtectedRoute>
                                    </div>
                                </div>
                            </div>
                        </ProtectedRoute>

                        {/* Error Page */}
                        <Route path='/'>
                            <NotFoundPage />
                        </Route>
                        <LogoutButton />
                    </Switch>
                )
            }

        </div >
    );
}

export default App;
