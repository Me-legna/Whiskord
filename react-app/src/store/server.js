//constants
const LOAD_PUBLIC_SERVERS = 'server/LOAD_PUBLIC_SERVERS';
const LOAD_PRIVATE_SERVERS = 'server/LOAD_PRIVATE_SERVERS';
const LOAD_SERVER_DETAILS = 'server/LOAD_SERVER_DETAILS';
const CREATE_SERVER = 'server/CREATE_SERVER';
const UPDATE_SERVER = 'server/UPDATE_SERVER';
const DELETE_SERVER = 'server/DELETE_SERVER';


//action creators
const loadPublicServers = (servers) => ({
    type: LOAD_PUBLIC_SERVERS,
    payload: servers
});

const loadPrivateServers = (privateServers) => ({
    type: LOAD_PRIVATE_SERVERS,
    payload: privateServers
});

const getServerDetails = (serverDetails) => ({
    type: LOAD_SERVER_DETAILS,
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

const deleteServer = (deletedServerId, is_private) => ({
    type: DELETE_SERVER,
    payload: deletedServerId,
    conditional: is_private
});


//thunks
export const publicServers = () => async (dispatch) => {
    const response = await fetch('/api/servers/public', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(loadPublicServers(data));

    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const privateServers = () => async (dispatch) => {
    const response = await fetch('/api/servers/private', {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(loadPrivateServers(data));

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const serverDetails = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getServerDetails(data));

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {

            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const addServer = (newServer) => async (dispatch) => {
    const response = await fetch('/api/servers/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newServer)
    });

    if (response.ok) {
        const data = response.json();

        dispatch(createServer(data));
    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editServer = (serverId, updatedServer) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedServer)
    });

    if (response.ok) {
        const data = response.json();

        dispatch(updateServer(data));
    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const destroyServer = (serverId, is_private) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        dispatch(deleteServer(serverId, is_private));
    }
}


const initialState = {
    allPublicServers: {
        byId: {},
        allIds: [],
    },
    allPrivateServers: {
        byId: {},
        allIds: [],
    },
    singleServer: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PUBLIC_SERVERS: {
            const newState = { ...state, allPublicServers: { byId: {}, allIds: [] } }

            action.payload.forEach(server => {
                newState.allPublicServers.byId[server.id] = server;
                newState.allPublicServers.allIds.push(server.id);
            })

            return newState
        }
        case LOAD_PRIVATE_SERVERS: {
            const newState = { ...state, allPrivateServers: { byId: {}, allIds: [] } }

            action.payload.forEach(server => {
                newState.allPrivateServers.byId[server.id] = server;
                newState.allPrivateServers.allIds.push(server.id);
            })

            return newState
        }
        case LOAD_SERVER_DETAILS: {
            const newState = { ...state, singleServer: {} }

            newState.singleServer = action.payload

            return newState
        }
        case CREATE_SERVER: {
            let newState = {}
            const newServer = action.payload

            //sets newState accoding to newServer.is_private
            if (newServer.is_private) {
                newState = {
                    ...state,
                    allPrivateServers: { byId: {}, allIds: [] },
                    singleServer: {}
                };

                newState.allPrivateServers.byId[newServer.id] = newServer;
                newState.allPrivateServers.allIds.push(newServer.id)
                newState.singleServer = newServer

            } else {
                newState = {
                    ...state,
                    allPublicServers: { byId: {}, allIds: [] },
                    singleServer: {}
                };

                newState.allPublicServers.byId[newServer.id] = newServer;
                newState.allPublicServers.allIds.push(newServer.id)
                newState.singleServer = newServer
            }

            return newState
        }
        case UPDATE_SERVER: {
            let newState = {}
            const newServer = action.payload

            //sets newState accoding to newServer.is_private
            if (newServer.is_private) {
                newState = {
                    ...state,
                    allPrivateServers: { byId: {}, allIds: [] },
                    singleServer: {}
                };

                newState.allPrivateServers.byId[newServer.id] = newServer;
                newState.allPrivateServers.allIds.push(newServer.id)
                newState.singleServer = newServer

            } else {
                newState = {
                    ...state,
                    allPublicServers: { byId: {}, allIds: [] },
                    singleServer: {}
                };

                newState.allPublicServers.byId[newServer.id] = newServer;
                newState.allPublicServers.allIds.push(newServer.id)
                newState.singleServer = newServer
            }
            return newState
        }
        case DELETE_SERVER: {
            let newState = {}
            //sets newState accoding to newServer.is_private
            if (action.conditional) {
                newState = {
                    ...state,
                    allPrivateServers: { byId: {}, allIds: [] },
                    singleServer: {}
                };

                delete newState.allPrivateServers.byId[action.payload];
                newState.allPrivateServers.allIds = newState.allPrivateServers.allIds.filter(id => +id !== +action.payload)
            } else {
                newState = {
                    ...state,
                    allPublicServers: { byId: {}, allIds: [] },
                    singleServer: {}
                };
                delete newState.allPublicServers.byId[action.payload];
                newState.allPublicServers.allIds = newState.allPrivateServers.allIds.filter(id => +id !== +action.payload)
            }

            return newState
        }
        default:
            return state
    }
}
