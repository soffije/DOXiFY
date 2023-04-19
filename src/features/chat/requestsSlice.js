import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { db } from '../../api/indexDB'

const initialState = {
  requests: null,
  loading: 'idle',
  error: null,
}

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async ({ contract, address }) => {
    try {
      const requests = await contract.methods
        .getRequests()
        .call({ from: address })

      const savedFriends = await db.getAllFriends()

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

export const rejectRequest = createAsyncThunk(
  'requests/rejectRequest',
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
          const requests = state.requests.requests
          if (requests.length > 0) {
            requests.forEach((element) => {
              if (
                element.address.toLowerCase() ===
                args.friendAddress.toLowerCase()
              ) {
                db.deleteFriend(args.friendAddress.toLowerCase())
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

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequestToMyList: (state, action) => {
      state.requests.push(action.payload)
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
  },
  extraReducers: (builder) => {
    builder
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
  },
})

export const getRequests = (state) => state.requests.requests

export const { addRequestToMyList, removeUserFromRequests } =
  requestsSlice.actions

export default requestsSlice.reducer
