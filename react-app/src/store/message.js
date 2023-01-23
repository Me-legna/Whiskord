//constants
const LOAD_CHANNEL_MESSAGES = 'message/LOAD_CHANNEL_MESSAGES'
const CREATE_CHANNEL_MESSAGE = 'message/CREATE_CHANNEL_MESSAGE'
const UPDATE_CHANNEL_MESSAGE = 'message/UPDATE_CHANNEL_MESSAGE'
const DELETE_CHANNEL_MESSAGE = 'message/DELETE_CHANNEL_MESSAGE'
const RESET_MESSAGE_STATE = 'message/RESET_MESSAGE_STATE'

//action creators
const loadChannelMessages = (messages) => ({
    type: LOAD_CHANNEL_MESSAGES,
    payload: messages
})

const createChannelMessage = (message) => ({
    type: CREATE_CHANNEL_MESSAGE,
    payload: message
})

const updateChannelMessage = (message) => ({
    type: UPDATE_CHANNEL_MESSAGE,
    payload: message
})

const deleteChannelMessage = (messageId) => ({
    type: DELETE_CHANNEL_MESSAGE,
    payload: messageId
})

export const resetMessageState = () => ({
    type: RESET_MESSAGE_STATE
})


//thunks
export const getChannelMessages = (channelId) => async (dispatch) => {
    // console.log('GETTING TO GET CHANNEL MESSAGES THUNK')
    // console.log('getChannelMessages thunk', {channelId})
    const response = await fetch(`/api/channels/${channelId}/messages`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadChannelMessages(data.Messages));

    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const createMessage = (channelId, messageContent, user_id) => async (dispatch) => {
    // console.log('GETTING TO CREATE MESSAGE THUNK')
    // console.log('createMessage thunk', {channelId}, {messageContent})

    const response = await fetch('/api/messages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: messageContent,
            channel_id: channelId,
            user_id: user_id,
            is_edited: 'False'
        })
    })

    if (response.ok) {
        const data = await response.json();

        dispatch(createChannelMessage(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editMessage = (messageId, messageContent, channelId, user_id ) => async (dispatch) => {
    // console.log('GETTING TO EDIT MESSAGE THUNK')
    // console.log('editMessage thunk', {messageId}, {messageContent}, {channelId}, {user_id})

    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: messageContent,
            channel_id: channelId,
            user_id: user_id,
            is_edited: 'True'
        })
    })

    if (response.ok) {
        const data = await response.json();

        dispatch(updateChannelMessage(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const destroyMessage = (messageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        dispatch(deleteChannelMessage(messageId));
    }
}



const initialState = {
    byId: {},
    allIds: []
}

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CHANNEL_MESSAGES: {
            const channelMessages = action.payload
            const newState = {
                byId: {},
                allIds: []
            }

            channelMessages?.forEach(message => {
                newState.byId[message.id] = message
                newState.allIds.push(message.id)
            });

            return newState
        }
        case CREATE_CHANNEL_MESSAGE: {
            const newMessage = action.payload
            const newState = {
                byId: {...state.byId},
                allIds: [...state.allIds]
            }
            newState.byId[newMessage.id] = newMessage
            newState.allIds.push(newMessage.id)

            return newState
        }
        case UPDATE_CHANNEL_MESSAGE: {
            const editedMessage = action.payload
            const newState = {
                byId: {...state.byId},
                allIds: [...state.allIds]
            }
            newState.byId[editedMessage.id] = editedMessage

            return newState
        }
        case DELETE_CHANNEL_MESSAGE: {
            const messageId = action.payload
            const newState = {
                byId: {...state.byId},
                allIds: [...state.allIds]
            }
            delete newState.byId[messageId]
            newState.allIds = Object.keys(newState.allIds)?.filter(id => id !== messageId)

            return newState
        }
        case RESET_MESSAGE_STATE:{

            return initialState
        }
        default:
            return state
    }
}
