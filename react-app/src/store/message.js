//constants
const LOAD_CHANNEL_MESSAGES = 'server/LOAD_CHANNEL_MESSAGES'
const CREATE_CHANNEL_MESSAGE = 'server/CREATE_CHANNEL_MESSAGE'

//action creators
const loadChannelMessages = (messages) => ({
    type: LOAD_CHANNEL_MESSAGES,
    payload: messages
})

const createChannelMessage = (message) => ({
    type: CREATE_CHANNEL_MESSAGE,
    payload: message
})

//thunks
const getChannelMessages = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`)

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



//create messages thunk
//adding fetch detail to show we only need content of the message being sent from the message itself

export const createMessage = (channelId, messageContent) => async (dispatch) => {
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: messageContent,
            channel_id: channelId
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

            channelMessages.forEach(message => {
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
        default:
            return state
    }
}
