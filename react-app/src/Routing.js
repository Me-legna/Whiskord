import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../src/components/404Page";
import LoginForm from "../src/components/auth/LoginForm";
import ProtectedRoute from "../src/components/auth/ProtectedRoute";
import SignUpForm from "../src/components/auth/SignUpForm";
import Chat from "../src/components/Chat/Chat"
import HomePage from "../src/components/HomePage";
import LandingPage from "../src/components/LandingPage";
import SingleServer from "../src/components/HomePage/Body/ServerComps/SingleServer";
import User from "../src/components/Users/User";
import UsersList from "../src/components/Users/UsersList";
import PrivateServers from "./components/HomePage/Body/ServerComps/PrivateServers";
import SingleChannel from "./components/HomePage/Body/Channels/SingleChannel";
import AllChannels from "./components/HomePage/Body/Channels/AllChannels";



function Routing({ user }) {
    return (
        <>
            <Switch>
                {/* Landing Page */}
                <Route path="/" exact={true}>
                    <LandingPage />
                </Route>

                {/* Auth Pages */}
                <ProtectedRoute path="/chat" exact={true}>
                    <Chat />
                </ProtectedRoute>
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

                {/* Home/Application Pages */}
                <ProtectedRoute path="/home">
                    <HomePage />
                </ProtectedRoute>

                {/* Private Channels Page */}
                <ProtectedRoute path="/home/@me" >
                    <PrivateServers />
                </ProtectedRoute>

                <ProtectedRoute path="/home/@me/:channelId" >
                    {/* <SinglePrivateChannel /> */}
                </ProtectedRoute>

                {/* Server Channels Page */}
                <ProtectedRoute path="/home/:serverId" >
                    <AllChannels />
                </ProtectedRoute>

                <ProtectedRoute path="/home/:serverId/:channelId" >
                    <SingleChannel />
                </ProtectedRoute>

                {/* Error Page */}
                <Route path='/'>
                    <NotFoundPage />
                </Route>
            </Switch>
        </>
    )
}

export default Routing
