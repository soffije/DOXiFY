import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { db } from '../../app/indexDB'

const initialState = {
  friends: null,
  loading: 'idle',
  error: null,
}

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async ({ contract, address }) => {
    try {
      const friends = await contract.methods
        .getFriends()
        .call({ from: address })

      const savedFriends = await db.getAllFriends()

      const result = friends.map((item) => {
        const matchingItem = savedFriends.find(
          (firstItem) =>
            firstItem.address.toLowerCase() === item.friendAddress.toLowerCase()
        )
        return {
          address: item.friendAddress.toLowerCase(),
          publicKey: item.public_key,
          name: matchingItem?.name,
          avatarOptions: matchingItem?.avatarOptions,
          numberOfUnreadMessages: 0,
        }
      })

      return result
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriendsArray: (state, props) => {
      state.friends = props.payload
    },
    addUserToFriendsList: (state, action) => {
      state.friends.push(action.payload)
    },
    resetNumberOfUnreadMessages: (state, action) => {
      const userAddress = action.payload.toLowerCase()
      const index = state.friends.findIndex(
        (friend) => friend.address.toLowerCase() === userAddress
      )
      if (index !== -1) {
        state.friends[index] = {
          ...state.friends[index],
          numberOfUnreadMessages: 0,
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.friends = action.payload
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
  },
})

export const getFriends = (state) => state.friends.friends

export const {
  setFriendsArray,
  addUserToFriendsList,
  resetNumberOfUnreadMessages,
} = friendsSlice.actions

export default friendsSlice.reducer
