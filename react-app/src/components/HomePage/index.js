import Body from "./Body";
import Header from "./Header";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { publicServers } from "../../store/server";
import { privateServers } from "../../store/server";
import { serverDetails } from "../../store/server";

import "./HomePage.css";

function HomePage() {
  //[variable, setVariable] = useState(true)
  //grab "public servers" list

  const dispatch = useDispatch();

  // useEffect (() => {
  //     dispatch(publicServers())
  //     dispatch(privateServers())
  // }, [dispatch])

  // useSelector for single server details
  const singleServerDetails = useSelector(
    (state) => state.servers.singleServer
  );

  //handler to load single server if serverIcon clicked
  // takes in serverId
  // use thunk to load server info by id
  const loadServer = async (serverId) => {
    return dispatch(serverDetails(serverId));
  };

  return (
    <div className="home-page-main-div">
      {/* main div */}
      <div>
        {" "}
        {/* SideBar */}
        <div>
          {" "}
          {/* Top Icon, when div clicked set variable to true */}
          {/* <Icon iconImage={"logoHere"} /> */}
        </div>
        {/* map public servers then render -
                    <div> //when clicked, set variable to false and load single server?
                        <Icon
                        iconImage=server.image_url
                        />
                    </div>
                */}
        <div>
          {" "}
          {/* when clicked Create Server */}
          {/* <Icon iconImage={"+"} /> */}
        </div>
      </div>
      <Header server={singleServerDetails} />
      <Body /> {/* variable={variable} */}
    </div>
  );
}

export default HomePage;
