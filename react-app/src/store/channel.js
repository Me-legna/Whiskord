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

const addChannelMemberAction = (member) => ({
  type: ADD_CHANNEL_MEMBER,
  payload: member,
});

const removeChannelMember = (member) => ({
  type: REMOVE_CHANNEL_MEMBER,
  payload: member,
});

//thunks
export const getChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

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
  (serverId = 1, channel) =>
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
      dispatch(createChannel(data.Channel));
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
  (serverId = 1, channelId, userId) =>
  async (dispatch) => {
    const response = await fetch(
      //   `/api/servers/${serverId}/channels/${channelId}/members/${userId}`,
      `/api/channels/${channelId}/members/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      dispatch(addChannelMemberAction(data.Member));
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
  (serverId = 1, channelId, userId) =>
  async (dispatch) => {
    const response = await fetch(
      //   `/api/servers/${serverId}/channels/${channelId}/members/${userId}`,
      `/api/channels/${channelId}/members/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      dispatch(removeChannelMember(data.Member));
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
      return {
        ...state,
        allChannels: {
          byId: {
            ...state.channels.byId,
            [newChannel.id]: newChannel,
          },
          allIds: [...state.channels.allIds, newChannel.id],
        },
      };
    case UPDATE_CHANNEL:
      const updatedChannel = action.payload;
      return {
        ...state,
        allChannels: {
          byId: {
            ...state.channels.byId,
            [updatedChannel.id]: updatedChannel,
          },
          allIds: [...state.channels.allIds],
        },
      };
    case DELETE_CHANNEL:
      const deletedChannel = action.payload;
      const newState = { ...state };
      delete newState.channels.byId[deletedChannel.id];
      return {
        ...newState,
        allChannels: {
          byId: newState.channels.byId,
          allIds: newState.channels.allIds.filter(
            (id) => id !== deletedChannel.id
          ),
        },
      };
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
      const newMember = action.payload;
      return {
        ...state,
        members: {
          byId: {
            ...state.members.byId,
            [newMember.id]: newMember,
          },
          allIds: [...state.members.allIds, newMember.id],
        },
      };
    case REMOVE_CHANNEL_MEMBER:
      const deletedMember = action.payload;
      const newMemberState = { ...state };
      delete newMemberState.members.byId[deletedMember.id];
      return {
        ...newMemberState,
        members: {
          byId: newMemberState.members.byId,
          allIds: newMemberState.members.allIds.filter(
            (id) => id !== deletedMember.id
          ),
        },
      };
    default:
      return state;
  }
}
