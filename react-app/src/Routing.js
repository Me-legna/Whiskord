import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../src/components/404Page";
import LoginForm from "../src/components/auth/LoginForm"
import ProtectedRoute from "../src/components/auth/ProtectedRoute";
import SignUpForm from "../src/components/auth/SignUpForm";
import Chat from "../src/components/Chat/Chat";
import HomePage from "../src/components/HomePage";
import LandingPage from "../src/components/LandingPage";
import ServerList from '../src/components/HomePage/Body/ServerComps/ServerList'
import SingleServer from "../src/components/HomePage/Body/ServerComps/SingleServer";
import User from "../src/components/Users/User";
import UsersList from "../src/components/Users/UsersList";




function Routing({ user }) {
    return (
        <>
            <Switch>
                <ProtectedRoute path="/chat" exact={true}>
                    <Chat />
                </ProtectedRoute>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path="/servers/list" exact={true}>
                    <ServerList />
                </ProtectedRoute>
                <ProtectedRoute path="/servers/:serverId" >
                    <SingleServer />
                </ProtectedRoute>
                <ProtectedRoute path="/users" exact={true}>
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute>
                {
                    (user)
                        ?
                        <ProtectedRoute path="/" exact={true}>
                            <HomePage />
                        </ProtectedRoute>
                        :
                        <Route path="/" exact={true}>
                            <LandingPage />
                        </Route>
                }
                <Route path='/'>
                    <NotFoundPage />
                </Route>
            </Switch>
        </>
    )
}

export default Routing
