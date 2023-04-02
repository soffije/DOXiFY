import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { deleteUser, getAllUsers, getUser } from '../../api/indexDB'

const initialState = {
  selectedAccount: null,
  selectedAccountMessages: [],
  sendingMessageLoading: 'idle',
  friends: [],
  requests: [],
  pendings: [],
  friendSearchQuery: '',
  loading: 'idle',
  error: null,
}

const getMessageByIPFSHash = async (fileHash) => {
  return await axios(`https://gateway.pinata.cloud/ipfs/${fileHash}`, {
    headers: {
      Accept: 'text/plain',
    },
  })
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
              to: process.env.REACT_APP_CONTRACT_ADDRESS,
              gas: web3.utils.toHex(300000),
              gasPrice: web3.utils.toHex(gasPrice),
              data: functionAbi,
            },
          ],
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
  async (args, { getState, dispatch }) => {
    try {
      const state = getState()
      const gasPrice = await args.web3.eth.getGasPrice()
      const functionAbi = args.contract.methods
        .addFriend(args.friendAddress)
        .encodeABI()
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: args.address,
              to: process.env.REACT_APP_CONTRACT_ADDRESS,
              gas: args.web3.utils.toHex(300000),
              gasPrice: args.web3.utils.toHex(gasPrice),
              data: functionAbi,
            },
          ],
        })
        .then(() => {
          const pendings = state.chat.pendings
          if (pendings.length > 0) {
            pendings.forEach((element) => {
              if (
                element.address.toLowerCase() ===
                args.friendAddress.toLowerCase()
              ) {
                dispatch(removeUserFromPendings(args.friendAddress))
                dispatch(
                  addUserToFriendsList({
                    address: args.friendAddress,
                    name: args.friendName,
                    avatarOptions: args.avatarOptions,
                  })
                )
              }
            })
          } else {
            dispatch(
              addRequestToMyList({
                address: args.friendAddress,
                name: args.friendName,
                avatarOptions: args.avatarOptions,
              })
            )
          }
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

export const rejectRequest = createAsyncThunk(
  'chat/rejectRequest',
  async (args, { getState, dispatch }) => {
    try {
      const state = getState()
      const gasPrice = await args.web3.eth.getGasPrice()
      const functionAbi = args.contract.methods
        .rejectRequest(args.friendAddress)
        .encodeABI()
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: args.address,
              to: process.env.REACT_APP_CONTRACT_ADDRESS,
              gas: args.web3.utils.toHex(300000),
              gasPrice: args.web3.utils.toHex(gasPrice),
              data: functionAbi,
            },
          ],
        })
        .then(() => {
          const requests = state.chat.requests
          if (requests.length > 0) {
            requests.forEach((element) => {
              if (
                element.address.toLowerCase() ===
                args.friendAddress.toLowerCase()
              ) {
                deleteUser(args.friendAddress.toLowerCase())
                dispatch(removeUserFromRequests(args.friendAddress))
              }
            })
          }
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

export const rejectPendings = createAsyncThunk(
  'chat/rejectPendings',
  async (args, { getState, dispatch }) => {
    try {
      const state = getState()
      const gasPrice = await args.web3.eth.getGasPrice()
      const functionAbi = args.contract.methods
        .rejectPending(args.friendAddress)
        .encodeABI()
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: args.address,
              to: process.env.REACT_APP_CONTRACT_ADDRESS,
              gas: args.web3.utils.toHex(300000),
              gasPrice: args.web3.utils.toHex(gasPrice),
              data: functionAbi,
            },
          ],
        })
        .then(() => {
          const pendings = state.chat.pendings
          if (pendings.length > 0) {
            pendings.forEach((element) => {
              if (
                element.address.toLowerCase() ===
                args.friendAddress.toLowerCase()
              ) {
                dispatch(removeUserFromPendings(args.friendAddress))
              }
            })
          }
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
      const friends = await contract.methods
        .getFriends()
        .call({ from: address })

      const savedFriends = await getAllUsers()

      const result = friends.map((item) => {
        const matchingItem = savedFriends.find(
          (firstItem) => firstItem.address.toLowerCase() === item.toLowerCase()
        )
        return {
          address: item.toLowerCase(),
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

export const fetchRequests = createAsyncThunk(
  'chat/fetchRequests',
  async ({ contract, address }) => {
    try {
      const requests = await contract.methods
        .getRequests()
        .call({ from: address })

      const savedFriends = await getAllUsers()

      const result = requests?.map((item) => {
        const matchingItem = savedFriends.find(
          (firstItem) => firstItem.address.toLowerCase() === item.toLowerCase()
        )
        return {
          address: item.toLowerCase(),
          name: matchingItem?.name,
          avatarOptions: matchingItem?.avatarOptions,
        }
      })

      return result
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const fetchPendings = createAsyncThunk(
  'chat/fetchPendings',
  async ({ contract, address }) => {
    try {
      const pendinds = await contract.methods
        .getPending()
        .call({ from: address })

      const result = pendinds?.map((user) => {
        return {
          address: user,
        }
      })
      return result
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const sendUserMessage = createAsyncThunk(
  'chat/sendUserMessage',
  async (
    { web3, contract, address, selectedUserAddress, userMessage },
    { dispatch }
  ) => {
    try {
      const request = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        // prettier-ignore
        data: { "message": userMessage },
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          'Content-Type': 'application/json',
        },
      })

      const gasPrice = await web3.eth.getGasPrice()

      const functionAbi = contract.methods
        .sendMessage(selectedUserAddress, 'text', request.data.IpfsHash)
        .encodeABI()

      await window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: address,
              to: process.env.REACT_APP_CONTRACT_ADDRESS,
              gas: web3.utils.toHex(300000),
              gasPrice: web3.utils.toHex(gasPrice),
              data: functionAbi,
            },
          ],
        })
        .then(() => {
          const message = {
            content: 'text',
            fileHash: userMessage,
            recipient: selectedUserAddress,
            sender: address,
            timestamp: Math.floor(new Date().getTime() / 1000),
          }
          dispatch(addIncomingMessage(message))
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
      const selectedAccountMessages = await contract.methods
        .getMessages(selectedUserAddress)
        .call({ from: address })

      const promises = selectedAccountMessages
        .map((message) => message.fileHash)
        .map((hash) =>
          axios.get(`https://gateway.pinata.cloud/ipfs/${hash}`, {
            headers: {
              Accept: 'text/plain',
            },
          })
        )

      const response = await Promise.all(promises)
      const retrievedHashes = response.map((item) => item.data)
      const result = selectedAccountMessages.map((item, index) => {
        return {
          ...item,
          fileHash: retrievedHashes[index].message,
        }
      })

      return { result }
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const handleIncomingMessageEvent = createAsyncThunk(
  'chat/handleIncomingMessageEvent',
  async (args, { getState, dispatch }) => {
    try {
      const state = getState()

      const sender = args.returnValues.sender.toLowerCase()
      const recipient = args.returnValues.recipient.toLowerCase()
      let selectedAccount = state.chat.selectedAccount
      if (selectedAccount !== null)
        selectedAccount = state.chat.selectedAccount.toLowerCase()

      if (selectedAccount !== sender) {
        const updatedFriends = state.chat.friends.map((friend) => {
          if (friend.address.toLowerCase() === sender) {
            return {
              ...friend,
              numberOfUnreadMessages: friend.numberOfUnreadMessages + 1,
            }
          }
          return friend
        })
        dispatch(setFriendsArray(updatedFriends))
      } else {
        const { data } = await getMessageByIPFSHash(args.returnValues.fileHash)
        const message = {
          content: args.returnValues.content,
          fileHash: data.message,
          recipient: recipient,
          sender: sender,
          timestamp: args.returnValues.timestamp,
        }
        dispatch(addIncomingMessage(message))
      }
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const handleIncomingFriendRequestEvent = createAsyncThunk(
  'chat/handleIncomingFriendRequestEvent',
  async (args, { getState, dispatch }) => {
    try {
      const state = getState()

      const requester = args.returnValues.requester.toLowerCase()

      const savedFriend = await getUser(requester)

      const requests = state.chat.requests
      if (requests.length > 0) {
        requests.forEach((element) => {
          if (element.address.toLowerCase() === requester) {
            dispatch(removeUserFromRequests(requester))
            dispatch(
              addUserToFriendsList({
                address: requester,
                name: savedFriend.name,
                avatarOptions: savedFriend?.avatarOptions,
              })
            )
          }
        })
      } else {
        dispatch(addIncomingFriendRequest({ address: requester }))
      }
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const handleRejectingFriendRequestEvent = createAsyncThunk(
  'chat/handleRejectingFriendRequestEvent',
  async (args, { getState, dispatch }) => {
    try {
      const state = getState()

      const requester = args.returnValues.requester.toLowerCase()

      const indexRequests = state.chat.requests.findIndex(
        (friend) => friend.address.toLowerCase() === requester
      )
      const indexPendings = state.chat.pendings.findIndex(
        (friend) => friend.address.toLowerCase() === requester
      )

      if (indexRequests > -1) dispatch(removeUserFromRequests(requester))
      if (indexPendings > -1) dispatch(removeUserFromPendings(requester))

      deleteUser(requester)
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
    setFriendSearchQuery: (state, props) => {
      state.friendSearchQuery = props.payload
    },
    addIncomingMessage: (state, action) => {
      state.selectedAccountMessages.push(action.payload)
    },
    addIncomingFriendRequest: (state, action) => {
      state.pendings.push(action.payload)
    },
    addRequestToMyList: (state, action) => {
      state.requests.push(action.payload)
    },
    removeUserFromPendings: (state, action) => {
      const userAddress = action.payload.toLowerCase()
      const index = state.pendings.findIndex(
        (friend) => friend.address.toLowerCase() === userAddress
      )
      if (index > -1) {
        const newArray = state.pendings
        newArray.splice(index, 1)
        state.pendings = newArray
      }
    },
    removeUserFromRequests: (state, action) => {
      const userAddress = action.payload.toLowerCase()
      const index = state.requests.findIndex(
        (friend) => friend.address.toLowerCase() === userAddress
      )
      if (index > -1) {
        const newArray = state.requests
        newArray.splice(index, 1)
        state.requests = newArray
      }
    },
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
      .addCase(fetchRequests.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.requests = action.payload
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
      .addCase(fetchPendings.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchPendings.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.pendings = action.payload
      })
      .addCase(fetchPendings.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
      .addCase(sendUserMessage.pending, (state) => {
        state.loading = 'pending'
        state.sendingMessageLoading = 'pending'
        state.error = null
      })
      .addCase(sendUserMessage.fulfilled, (state) => {
        state.loading = 'idle'
        state.sendingMessageLoading = 'idle'
      })
      .addCase(sendUserMessage.rejected, (state, action) => {
        state.loading = 'idle'
        state.sendingMessageLoading = 'idle'
        state.error = action.error.message
      })
      .addCase(fetchSelectedAccountMessages.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchSelectedAccountMessages.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.selectedAccountMessages = action.payload.result
      })
      .addCase(fetchSelectedAccountMessages.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
  },
})

export const getFriends = (state) => state.chat.friends
export const getRequests = (state) => state.chat.requests
export const getPendings = (state) => state.chat.pendings
export const getSelectedAccount = (state) => state.chat.selectedAccount
export const getSelectedAccountMessages = (state) =>
  state.chat.selectedAccountMessages
export const getSendigMessageLoading = (state) =>
  state.chat.sendingMessageLoading

export const getFriendsSearchQuery = (state) => state.chat.friendSearchQuery

export const {
  setSelectedAccount,
  setFriendSearchQuery,
  addIncomingMessage,
  addIncomingFriendRequest,
  addRequestToMyList,
  removeUserFromRequests,
  setFriendsArray,
  addUserToFriendsList,
  resetNumberOfUnreadMessages,
  removeUserFromPendings,
} = chatSlice.actions

export default chatSlice.reducer
