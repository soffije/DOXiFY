import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contractAddress from '../../app/contract'
const initialState = {
  selectedAccount: null,
  selectedAccountMessages: [],
  friends: [],
  loading: 'idle',
  error: null,
}

export const subscribeUser = createAsyncThunk(
  'chat/subscribeUser',
  async ({ web3, contract, address }) => {
    try {
      const gasPrice = await web3.eth.getGasPrice()

      const functionAbi = contract.methods.addMe().encodeABI()
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: address,
              to: contractAddress,
              gas: web3.utils.toHex(300000),
              gasPrice: web3.utils.toHex(gasPrice),
              data: functionAbi,
            },
          ],
        })
        .then((txHash) => {
          console.log(`Transaction hash: ${txHash}`)
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const addFriend = createAsyncThunk(
  'chat/addFriend',
  async ({ web3, contract, address, friendAddress }) => {
    try {
      const gasPrice = await web3.eth.getGasPrice()
      const functionAbi = contract.methods.addFriend(friendAddress).encodeABI()
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: address,
              to: contractAddress,
              gas: web3.utils.toHex(300000),
              gasPrice: web3.utils.toHex(gasPrice),
              data: functionAbi,
            },
          ],
        })
        .then((txHash) => {
          console.log(`Transaction hash: ${txHash}`)
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const fetchFriends = createAsyncThunk(
  'chat/fetchFriends',
  async ({ contract, address }) => {
    try {
      console.log('Fetch friends', { contract, address })
      const friends = await contract.methods.getUser().call({ from: address })
      console.log('Fetched friends', friends.friends)
      return friends.friends
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const sendUserMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ web3, contract, address, selectedUserAddress, userMessage }) => {
    try {
      const gasPrice = await web3.eth.getGasPrice()

      const functionAbi = contract.methods
        .sendMessage(selectedUserAddress, userMessage)
        .encodeABI()
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: address,
              to: contractAddress,
              gas: web3.utils.toHex(300000),
              gasPrice: web3.utils.toHex(gasPrice),
              data: functionAbi,
            },
          ],
        })
        .then((txHash) => {
          console.log(`Transaction hash: ${txHash}`)
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.log(error)
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
      console.log(selectedAccountMessages)
      return { selectedAccountMessages }
    } catch (error) {
      console.log(error)
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
        state.friends = action.payload
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
