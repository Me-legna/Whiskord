import Body from "./Body"
import Header from "./Header"


function HomePage() {
    //[variable, setVariable] = useState(true)
    //grab "public servers" list
    //handler to load single server if serverIcon clicked
    return (
        // <h1>Replace This h1</h1>
        <div>{/* main div */}
            <div> {/* SideBar */}
                <div> {/* Top Icon, when div clicked set variable to true */}
                    {/* <Icon iconImage={"logoHere"} /> */}
                </div>
                {
                /* map public servers then render -
                    <div> //when clicked, set variable to false and load single server?
                        <Icon
                        iconImage=server.image_url
                        />
                    </div>
                */}
                <div> {/* when clicked Create Server */}
                    {/* <Icon iconImage={"+"} /> */}
                </div>
            </div>
            <Header /> {/* server={loadedServer} */}
            <Body  /> {/* variable={variable} */}
        </div>
    )
}

export default HomePage
