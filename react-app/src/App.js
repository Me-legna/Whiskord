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
import { Route, Switch } from 'react-router-dom';
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
                            <div className='app-container'>
                                <div className='sidebar'>
                                    {/* Icon component to load private servers here */}
                                    {/* Load all public servers */}
                                    <ServerList />
                                    {/* Icon component to Create server here*/}
                                </div>
                                <div className='main-body'>
                                    <div className='left'>
                                        <div servername header>
                                            {/* servername header component here*/}
                                        </div>

                                        <div className='channel-list-container'>
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

                                    <div className='middle /right body'>

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
            <ProtectedRoute path="/chat" exact={true}>
                <Chat />
            </ProtectedRoute>

        </div >
    );
}

export default App;
