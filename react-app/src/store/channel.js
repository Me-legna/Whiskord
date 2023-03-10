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
const RESET_CHANNEL_DETAILS = 'channel/RESET_CHANNEL_DETAILS'
const RESET_CHANNEL_STATE = 'channel/RESET_CHANNEL_STATE'

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

const deleteChannelAction = (channelId) => ({
  type: DELETE_CHANNEL,
  payload: channelId,
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

export const resetChannelDetails = () => ({
  type: RESET_CHANNEL_DETAILS
})

export const resetChannelState = () => ({
  type: RESET_CHANNEL_STATE
})

//thunks
export const getChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log('GETTING HERE --------')

  if (response.ok) {
    const data = await response.json();
    dispatch(loadChannels(data.Channels));
    return data.Channels

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
    return data.Channel

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
      if (response.ok) {
        const data = await response.json();
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
        `/api/channels/${channelId}`,
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

        dispatch(updateChannel(data));
        return response
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
  (channelId) =>
    async (dispatch) => {
      const response = await fetch(
        `/api/channels/${channelId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // const data = await response.json();

        dispatch(deleteChannelAction(channelId));

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
  (channelId) =>
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
        return data.Members

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
        allChannels: {
          byId: {...state.allChannels.byId},
          allIds: [...state.allChannels.allIds, newChannel.id],
        },
        channelDetails: newChannel,
        members: {
          byId: { },
          allIds: newChannel.Members.map((member) => member.id),
        },

      };
      newChannel.Members.forEach((member) => {
        newChannelState.members.byId[member.id] = member;
      });
      newChannelState.allChannels.byId[newChannel.id] = newChannel
      return newChannelState

    case UPDATE_CHANNEL:
      const updatedChannel = action.payload;
      const updatedChannelState = {
        ...state,
        allChannels: {
          byId: {...state.allChannels.byId},
          allIds: [...state.allChannels.allIds],
        },
        channelDetails: updatedChannel
      };

      updatedChannelState.allChannels.byId[updatedChannel.id] = updatedChannel;
      return updatedChannelState

    case DELETE_CHANNEL:
      const deletedChannelId = action.payload;
      const newState = {
        ...state,
        allChannels: {
          byId: { ...state.allChannels.byId },
          allIds: state.allChannels.allIds.filter(
            (id) => id !== deletedChannelId
          ),
        },
        channelDetails: {}
      };

      delete newState.allChannels.byId[deletedChannelId];
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

    case RESET_CHANNEL_DETAILS:
      const resetDetails = {
        ...state,
        channelDetails: {},
      };

      return resetDetails
    case RESET_CHANNEL_STATE:

      return initialState

    default:
      return state;
  }
}
