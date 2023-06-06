import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { db } from '../../app/indexDB'
import { getPublicKey } from '../../utils/rsa'

import {
  addIncomingFriendRequest,
  removeUserFromPendings,
} from './pendingsSlice'
import { addIncomingMessage } from './chatSlice'
import { addUserToFriendsList, setFriendsArray } from './friendsSlice'
import { addRequestToMyList, removeUserFromRequests } from './requestsSlice'

const initialState = {
  searchQuery: '',
  loading: 'idle',
  friendLoading: 'idle',
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
  'profile/subscribeUser',
  async ({ web3, contract, address }) => {
    try {
      const gasPrice = await web3.eth.getGasPrice()

      const functionAbi = contract.methods.addMe(getPublicKey()).encodeABI()
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: address,
              to: process.env.REACT_APP_CONTRACT_ADDRESS,
              gas: web3.utils.toHex(15000000),
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
  'profile/addFriend',
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
          const pendings = state.pendings.pendings

          if (pendings.length > 0)
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
          else
            dispatch(
              addRequestToMyList({
                address: args.friendAddress,
                name: args.friendName,
                avatarOptions: args.avatarOptions,
              })
            )
        })
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
      let selectedAccount = state.chat.selectedAccount?.address
      if (selectedAccount !== null)
        selectedAccount = state.chat.selectedAccount?.address.toLowerCase()

      if (selectedAccount !== sender) {
        const updatedFriends = state.friends.friends.map((friend) =>
          friend.address.toLowerCase() === sender
            ? {
                ...friend,
                numberOfUnreadMessages: friend.numberOfUnreadMessages + 1,
              }
            : friend
        )
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
      const savedFriend = await db.getFriend(requester)

      const requests = state.requests.requests
      if (requests.length > 0)
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
      else dispatch(addIncomingFriendRequest({ address: requester }))
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
      const indexRequests = state.requests.requests.findIndex(
        (friend) => friend.address.toLowerCase() === requester
      )
      const indexPendings = state.pendings.pendings.findIndex(
        (friend) => friend.address.toLowerCase() === requester
      )

      if (indexRequests > -1) dispatch(removeUserFromRequests(requester))
      if (indexPendings > -1) dispatch(removeUserFromPendings(requester))

      db.deleteFriend(requester)
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setSearchQuery: (state, props) => {
      state.searchQuery = props.payload
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
        state.friendLoading = 'pending'
        state.error = null
      })
      .addCase(addFriend.fulfilled, (state) => {
        state.friendLoading = 'idle'
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.friendLoading = 'idle'
        state.error = action.error.message
      })
  },
})

export const getSearchQuery = (state) => state.profile.searchQuery

export const { setSearchQuery } = profileSlice.actions

export default profileSlice.reducer
