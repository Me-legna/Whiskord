//constants
const LOAD_CHANNELS = "channel/LOAD_CHANNELS";
const LOAD_CHANNEL_DETAILS = "channel/LOAD_CHANNEL_DETAILS";
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const UPDATE_CHANNEL = "channel/UPDATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";
// const JOIN_CHANNEL = "channel/JOIN_CHANNEL";
// const LEAVE_CHANNEL = "channel/LEAVE_CHANNEL";
const LOAD_CHANNEL_MEMBERS = "channel/LOAD_CHANNEL_MEMBERS";
const ADD_CHANNEL_MEMBER = "channel/ADD_CHANNEL_MEMBER";
const REMOVE_CHANNEL_MEMBER = "channel/REMOVE_CHANNEL_MEMBER";

//action creators
const loadChannels = (channels) => ({
  type: LOAD_CHANNELS,
  payload: channels,
});

const loadChannelDetails = (channel) => ({
  type: LOAD_CHANNEL_DETAILS,
  payload: channel,
});

const createChannel = (channel) => ({
  type: CREATE_CHANNEL,
  payload: channel,
});

const updateChannel = (channel) => ({
  type: UPDATE_CHANNEL,
  payload: channel,
});

const deleteChannelAction = (channel) => ({
  type: DELETE_CHANNEL,
  payload: channel,
});

// const joinChannel = (channel) => ({
//   type: JOIN_CHANNEL,
//   payload: channel,
// });

// const leaveChannel = (channel) => ({
//   type: LEAVE_CHANNEL,
//   payload: channel,
// });

const loadChannelMembers = (members) => ({
  type: LOAD_CHANNEL_MEMBERS,
  payload: members,
});

const addChannelMemberAction = (userId) => ({
  type: ADD_CHANNEL_MEMBER,
  // payload: member,
  payload: userId,
});

const removeChannelMember = (memberId) => ({
  type: REMOVE_CHANNEL_MEMBER,
  // payload: member,
  payload: memberId,
});

//thunks
export const getChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  console.log('GETTING HERE --------')

  if (response.ok) {
    const data = await response.json();
    dispatch(loadChannels(data.Channels));
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const getChannelDetails = (channelId) => async (dispatch) => {
  const response = await fetch(
    // `/api/servers/${serverId}/channels/${channelId}`,
    `/api/channels/${channelId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  
  if (response.ok) {
    const data = await response.json();
    dispatch(loadChannelDetails(data?.Channel));
    
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const createNewChannel =
  (serverId, channel) =>
    async (dispatch) => {
      const response = await fetch(`/api/servers/${serverId}/channels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(channel),
      });
      console.log('response', response)
      if (response.ok) {
        const data = await response.json();
        console.log('data', data)
        dispatch(createChannel(data));
        return data
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

export const editChannel =
  (serverId = 1, channelId, updatedChannel) =>
    async (dispatch) => {
      const response = await fetch(
        `/api/servers/${serverId}/channels/${channelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedChannel),
        }
      );

      if (response.ok) {
        const data = await response.json();

        dispatch(updateChannel(data.Channel));
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

export const deleteChannel =
  (serverId = 1, channelId) =>
    async (dispatch) => {
      const response = await fetch(
        `/api/servers/${serverId}/channels/${channelId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        dispatch(deleteChannelAction(data.Channel));
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

export const getChannelMembers =
  (serverId = 1, channelId) =>
    async (dispatch) => {
      const response = await fetch(
        // check with backend if this is the correct route
        // `/api/servers/${serverId}/channels/${channelId}/members`,
        `/api/channels/${channelId}/members`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        dispatch(loadChannelMembers(data.Members));
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

export const addChannelMember =
  (channelId, userId) =>
    async (dispatch) => {
      const response = await fetch(
        //   `/api/servers/${serverId}/channels/${channelId}/members/${userId}`,
        // `/api/channels/${channelId}/members/${userId}`,
        `/api/channels/${channelId}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({user_id: userId})
        }
      );

      if (response.ok) {
        const data = await response.json();

        // dispatch(addChannelMemberAction(data.Member));
        dispatch(addChannelMemberAction(userId));
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

export const deleteChannelMember =
  (channelId, userId) =>
    async (dispatch) => {
      const response = await fetch(
        //   `/api/servers/${serverId}/channels/${channelId}/members/${userId}`,
        // `/api/channels/${channelId}/members/${userId}`,
        `/api/channels/${channelId}/members`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId })
        }
      );

      if (response.ok) {
        const data = await response.json();

        // dispatch(removeChannelMember(data.Member));
        dispatch(removeChannelMember(userId));
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

const initialState = {
  allChannels: {
    byId: {},
    allIds: [],
  },
  // check if this is needed
  channelDetails: {},
  members: {
    byId: {},
    allIds: [],
  },
};

export default function channelReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHANNELS:
      const loadAllChannels = {};
      action.payload?.forEach((channel) => {
        loadAllChannels[channel.id] = channel;
      });
      return {
        ...state,
        allChannels: {
          byId: loadAllChannels,
          allIds: action.payload.map((channel) => channel.id),
        },
      };
    case LOAD_CHANNEL_DETAILS:
      const channel = action.payload;
      // console.log('STORE CHANNEL DETAILS', channel)
      return {
        ...state,
        channelDetails: channel,
      };
    case CREATE_CHANNEL:
      const newChannel = action.payload;
      const newChannelState = {
        ...state,
        allChannels: {
          byId: {...state.allChannels.byId},
          allIds: [...state.allChannels.allIds, newChannel.id],
        },
      };

      newChannelState.allChannels.byId[newChannel.id] = newChannel
      return newChannelState

    case UPDATE_CHANNEL:
      const updatedChannel = action.payload;
      const updatedChannelState = {
        ...state,
        allChannels: {
          byId: {...state.allChannels.byId},
          allIds: [...state.allChannels.allIds, newChannel.id],
        },
      };

      updatedChannelState.allChannels.byId[updatedChannel.id] = updatedChannel;
      return updatedChannelState

    case DELETE_CHANNEL:
      const deletedChannel = action.payload;
      const newState = {
        ...state,
        allChannels: {
          byId: { ...state.allChannels.byId },
          allIds: state.allChannels.allIds.filter(
            (id) => id !== deletedChannel.id
          ),
        },
      };
      delete newState.byId[deletedChannel.id];
      return newState

    case LOAD_CHANNEL_MEMBERS:
      const allMembers = {};
      action.payload?.forEach((member) => {
        allMembers[member.id] = member;
      });
      return {
        ...state,
        members: {
          byId: allMembers,
          allIds: action.payload?.map((member) => member.id),
        },
      };
    case ADD_CHANNEL_MEMBER:
      const newMemberId = action.payload;
      const newMembersState = {
        ...state,
        members: {
          byId: {...state.members.byId},
          allIds: [...state.members.allIds, newMemberId],
        },
      };

      newMembersState.members.byId[newMemberId] = newMemberId
      return newMembersState

    case REMOVE_CHANNEL_MEMBER:
      const deletedMemberId = action.payload;
      const newMemberState = {
        ...state,
        members: {
          byId: {...state.members.byId},
          allIds: state.members.allIds.filter(id => id !== deletedMemberId),
        },
      };

      delete newMemberState.members.byId[deletedMemberId];

      return newMemberState
    default:
      return state;
  }
}
