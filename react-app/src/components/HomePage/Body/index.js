import Members from "./Members"

function Body({variable}) {

    return (
        <div> {/* Main Div */}
            <div> {/* Channels / Private Servers */}
                {/*
                (variable)
                    ? <PrivateServers />
                    : <Channels />
            */}
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
