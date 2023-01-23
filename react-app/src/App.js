
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
import { addServer, privateServers, publicServers, resetServerDetails, serverDetails } from './store/server';
import IconModal from './components/Icon/IconModal';
import CreatePrivateServerForm from './components/HomePage/Body/ServerComps/CreatePrivateServerForm';
import OpenModalButton from './components/OpenModalButton';
import CreatePublicServerForm from './components/HomePage/Body/ServerComps/CreatePublicServerForm';
import { resetMessageState } from './store/message';
import { getChannels, resetChannelState, getChannelDetails } from './store/channel';
import LoginSignUpPage
    from './components/auth';
import UnderDevelopment from './components/UnderDevelopment';
import './App.css'

// import WhiskordLogoCrop from './images/WhiskordLogoCrop.png'

import WhiskordLogo from './images/Logo/WhiskordLogoCrop.png';
import EditServerForm from './components/HomePage/Body/ServerComps/EditServerForm';
import DeleteServerForm from './components/HomePage/Body/ServerComps/DeleteServerForm';
import SignUpPage from './components/auth/SignUpIndex';
import EditChannelForm from "./components/HomePage/Body/Channels/EditChannelForm";
import DeleteChannelForm from "./components/HomePage/Body/Channels/DeleteChannelForm";

function App() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [loaded, setLoaded] = useState(false);
    const user = useSelector(state => state.session.user)

    const servers = useSelector((state) => state?.servers?.allPublicServers);

    // const privateServersList = useSelector((state) => state?.servers?.allPrivateServers);

    const singleServer = useSelector((state) => state?.servers?.singleServer);

    // const allChannels = useSelector((state) => state?.servers?.singleServer?.Channels);

    const allChannels = useSelector((state) => state?.channels?.allChannels?.byId);

    // const allChannels = useSelector((state) => state?.channels?.allChannels);

    useEffect(() => {
        console.log(51.5)
        dispatch(authenticate()).then(() => setLoaded(true));
        // if (user && !servers) {
        //     console.log('WE HAVE A USER')
        //     dispatch(publicServers());
        // } else {

        // }
    }, [dispatch]);

    // useEffect(() => {
    //     user && dispatch(publicServers());
    // }, [dispatch])

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(authenticate());
    //         setLoaded(true);
    //     })();
    // }, [dispatch]);



    const privateServerInfo = async (privateServersList) => {
        // console.log('PRIVATE SERVER LIST ',privateServersList[2].id)
        await dispatch(serverDetails(privateServersList[0]?.id))
            .then((server) => dispatch(getChannelDetails(server.Channels[0]?.id)))
            .then((channel) => history.push(`/home/@me/${channel?.id}`))
    }

    const getPrivateServers = async () => {
        // dispatch(resetMessageState())
        // dispatch(resetChannelState())
        // dispatch(resetServerDetails())
        await dispatch(privateServers())
            .then((privateServersList) => {
                if (privateServersList.length) {
                    privateServerInfo(privateServersList)
                } else {
                    dispatch(resetServerDetails())
                    history.push('/home/@me')
                }
            })


    }

    const editMyServer = <OpenModalButton
        faIcon={<i className="fa-solid fa-gears"></i>}
        modalComponent={<EditServerForm />}
    />

    const deleteMyServer = <OpenModalButton
        faIcon={<i className="fa-solid fa-trash"></i>}
        modalComponent={<DeleteServerForm />}
    />

    useEffect(() => {
        dispatch(authenticate()).then(() => setLoaded(true));
        if (user) {
            dispatch(publicServers());
        }
    }, [dispatch]);

    return (
        <div className='entire-homepage-div'>
            {!user
                ? (
                    <>
                        {/* <NavBar /> */}
                        <Switch>
                            < Route path="/" exact={true}>
                                <LandingPage />
                            </Route>
                            <Route path="/login" exact={true}>
                                <LoginSignUpPage />
                            </Route>
                            <Route path="/sign-up" exact={true}>
                                <SignUpPage />
                            </Route>
                            <ProtectedRoute path="/users" exact={true}>
                                <UsersList />
                            </ProtectedRoute>
                            <ProtectedRoute path="/users/:userId" exact={true}>
                                <User />
                            </ProtectedRoute>
                            <Route path='/next'>
                                < UnderDevelopment />
                            </Route>
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

                            <div className='app-container main-body'>

                                <div className='server-list-container sidebar'>

                                    <div className="server-list-button" id='logo-button'>
                                        <button className="" onClick={getPrivateServers}>
                                            {/* <img src={WhiskordLogo} /> */}
                                            {/* Pr */}
                                        </button>
                                    </div>


                                    {/* Load all public servers */}
                                    <ServerList />


                                    <div className="server-list-button">
                                        <OpenModalButton
                                            buttonText={'+'}
                                            modalComponent={<CreatePublicServerForm />} />
                                    </div>

                                </div>

                                <div className='main-body'>
                                    <div className='channel-list-container left'>
                                        <div className='server-name-header'>

//  ---------------- Andrea Updates
                                            <h3>{singleServer && singleServer.name}</h3>
                                            {

                                                user && user.id === singleServer.owner_id &&
                                                <div>
                                                    <div className="owner-tools">
                                                        <h6>Server Tools</h6>
                                                        <div className="owner-button">
                                                            <OpenModalButton
                                                                faIcon={<i style={{color:"#9d9d9f"}} className="fa-solid fa-gears"></i>}
                                                                modalComponent={<EditServerForm />}
                                                            />
                                                            <span className="hover-message">Edit my server!</span>
                                                        </div>
                                                        <div className="owner-button">
                                                            <OpenModalButton
                                                                faIcon={<i style={{color:"#9d9d9f"}} className="fa-solid fa-trash"></i>}
                                                                modalComponent={<DeleteServerForm />}
                                                            />
                                                            <span className="hover-message">Delete my server!</span>
                                                        </div>
                                                    </div>

                                                    <div className="owner-tools">
                                                        <h6>Channel Tools</h6>
                                                        <div className="owner-button">
                                                            <OpenModalButton
                                                                faIcon={<i style={{color:"#9d9d9f"}} className="fa-solid fa-gears"></i>}
                                                                modalComponent={<EditChannelForm />}
                                                            />

                                                            <span className="hover-message">Edit my Channel!</span>

                                                        </div>
                                                        <div className="owner-button">
                                                            <OpenModalButton
                                                                faIcon={<i style={{color:"#9d9d9f"}} className="fa-solid fa-trash"></i>}
                                                                modalComponent={<DeleteChannelForm />}
                                                            />
                                                            <span className="hover-message">Delete my channel!</span>
======= 
//  ---------------- Angel Updates

                                           // {

                                             //   user && user.id === singleServer.owner_id && !singleServer.is_private &&
                                               // <>
                                                 //   <h3>{singleServer && singleServer.name}</h3>
                                                   // <div>
                                                     //   <div className="owner-tools">
                                                       //     <h6>Server CRUD</h6>
                                                         //   <div>
                                                           //     <OpenModalButton
                                                                  //  faIcon={<i className="fa-solid fa-pen-to-square" />}
                                                                //    modalComponent={<EditServerForm />}
                                                              //  />
                                                            //    <OpenModalButton
                                                          //          faIcon={<i className="fa-solid fa-trash-can" />}
                                                        //            modalComponent={<DeleteServerForm />}
                                                      //          />
                                                    //        </div>

                                                  //      </div>
                                                //    </div>
                                              //  </>
                                            //}
// -----------------------
                                        </div>


                                        <div className='app-channel-list-container'>

                                            {/* Route to load private server channel list */}
                                            <ProtectedRoute path="/home/@me" >
                                                <PrivateServers />
                                            </ProtectedRoute>
                                            {/* Route to load public server channels list */}
                                            <ProtectedRoute path="/home/:serverId" >
                                                {(singleServer && !singleServer.is_private) &&
                                                    <AllChannels channels={allChannels} />
                                                }
                                            </ProtectedRoute>
                                        </div>

                                        <div className='app-user-and-logout-button'>
                                            <div className='user-details'>
                                                <i style={{color:"#9d9d9f"}}className="fa-solid fa-circle-user fa-xl"></i>
                                                &nbsp;
                                                &nbsp;
                                                {user.username}
                                            </div>
                                            <LogoutButton />
                                        </div>

                                    </div>


                                    <div className='middle-right-body'>


                                        {/* Load messages, header, and members of Private Server */}
                                        <ProtectedRoute path="/home/@me/:channelId" >
                                            <PrivateBody />
                                        </ProtectedRoute>

                                        {/* Load messages, header, and members of Public Server */}
                                        <ProtectedRoute path="/home/:serverId/:channelId" >
                                            {(singleServer && !singleServer.is_private) &&
                                                <PublicBody />
                                            }
                                        </ProtectedRoute>
                                    </div>
                                </div>
                            </div>
                        </ProtectedRoute>

                        {/* Error Page */}
                        <Route path='/404'>
                            <NotFoundPage />
                        </Route>
                        <LogoutButton />
                        {/* UnderDevelopment Page */}
                        <Route path='/next'>
                            < UnderDevelopment />
                        </Route>
                    </Switch>
                )
            }

        </div >
    )

}

export default App;
