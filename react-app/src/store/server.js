//constants
const GET_SERVERS = 'server/GET_SERVERS';
const GET_PRIVATE_SERVERS = 'server/GET_PRIVATE_SERVERS';
const GET_SERVER_DETAILS = 'server/GET_SERVER_DETAILS';
const CREATE_SERVER = 'server/CREATE_SERVER';
const UPDATE_SERVER = 'server/UPDATE_SERVER';
const DELETE_SERVER = 'server/DELETE_SERVER';


//action creators
const getServers = (servers) => ({
    type: GET_SERVERS,
    payload: servers
});

const getPrivateServers = (privateServers) => ({
    type: GET_PRIVATE_SERVERS,
    payload: privateServers
});

const getServerDetails = (serverDetails) => ({
    type: GET_SERVER_DETAILS,
    payload: serverDetails
});

const createServer = (newServer) => ({
    type: CREATE_SERVER,
    payload: newServer
});

const updateServer = (updatedServer) => ({
    type: UPDATE_SERVER,
    payload: updatedServer
});

const deleteServer = (oldServer) => ({
    type: DELETE_SERVER,
    payload: oldServer
});


//thunks
export const allServers = () => async (dispatch) => {
    const response = await fetch('/api/servers/');

    if(response.ok) {
        const data = await response.json();
        dispatch(getServers(data))
    }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const privateServers = () => async (dispatch) => {
    const response = await fetch();

    if (response.ok) {
        const data = await response.json();
        dispatch(getPrivateServers(data))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}
