import Channels from "./Channels"
import Members from "./Members"
import ServerList from "./ServerComps/ServerList"
import SingleServer from "./ServerComps/SingleServer"

function Body({variable}) {

    return (
        <div> {/* Main Div */}
            <div>
                <ServerList />
            </div>
            <div>
                {/* <SingleServer /> */}
            </div>

            <div> {/* Channels / Private Servers */}
                {/*
                (variable)
                    ? <PrivateServers />
                    : <Channels />
            */}
            <Channels />
            </div>


            <div>{/* Messages */}
                {/* <Messages /> */}
            </div>


            <div>{/*if Channel Private- Channel Members
                else Server Members
            */}
                <Members />
            </div>
        </div>
    )
}

export default Body
