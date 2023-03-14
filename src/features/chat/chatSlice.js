import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  selectedAccount: null,
  selectedAccountMessages: [],
  friends: [],
  loading: 'idle',
  error: null,
}

export const subscribeUser = createAsyncThunk(
  'chat/subscribeUser',
  async ({ contract, address }) => {
    try {
      console.log('Subscribe user', { contract, address })
      await contract.methods.addMe().send({ from: address, gas: 30000 })
    } catch (error) {
      return { error: error.message }
    }
  }
)

export const addFriend = createAsyncThunk(
  'chat/addFriend',
  async ({ contract, address, friendAddress }) => {
    try {
      console.log('Adding friend', { contract, address, friendAddress })
      await contract.methods
        .addFriend(friendAddress)
        .send({ from: address, gas: 30000 })
    } catch (error) {
      return { error: error.message }
    }
  }
)

export const fetchFriends = createAsyncThunk(
  'chat/fetchFriends',
  async ({ contract, address }) => {
    try {
      console.log('Fetch friend', { contract, address })
      const friends = await contract.methods
        .getFriends()
        .call({ from: address })
      return { friends }
    } catch (error) {
      return { error: error.message }
    }
  }
)

export const sendUserMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ contract, address, selectedUserAddress, userMessage }) => {
    try {
      console.log('Send message', {
        contract,
        address,
        selectedUserAddress,
        userMessage,
      })
      await contract.methods
        .sendMessage(selectedUserAddress, userMessage)
        .send({ from: address, gas: 300000 })
    } catch (error) {
      return { error: error.message }
    }
  }
)

export const fetchSelectedAccountMessages = createAsyncThunk(
  'chat/fetchSelectedAccountMessages',
  async ({ contract, address, selectedUserAddress }) => {
    try {
      console.log('Fetch selected account messages', {
        contract,
        address,
        selectedUserAddress,
      })
      const selectedAccountMessages = await contract.methods
        .getMessages(selectedUserAddress)
        .call({ from: address })

      return { selectedAccountMessages }
    } catch (error) {
      return { error: error.message }
    }
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeUser.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(subscribeUser.fulfilled, (state) => {
        state.loading = 'idle'
      })
      .addCase(subscribeUser.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
      .addCase(addFriend.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(addFriend.fulfilled, (state) => {
        state.loading = 'idle'
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
      .addCase(fetchFriends.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.friends = action.payload.friends
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
      .addCase(sendUserMessage.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(sendUserMessage.fulfilled, (state) => {
        state.loading = 'idle'
      })
      .addCase(sendUserMessage.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
      .addCase(fetchSelectedAccountMessages.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchSelectedAccountMessages.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.selectedAccountMessages = action.payload.selectedAccountMessages
      })
      .addCase(fetchSelectedAccountMessages.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
  },
})

export const getFriends = (state) => state.chat.friends
export const getSelectedAccount = (state) => state.chat.selectedAccount
export const getSelectedAccountMessages = (state) =>
  state.chat.selectedAccountMessages

export const { setSelectedAccount } = chatSlice.actions

export default chatSlice.reducer
