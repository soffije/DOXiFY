import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  pendings: null,
  loading: 'idle',
  error: null,
}

export const fetchPendings = createAsyncThunk(
  'pendings/fetchPendings',
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

export const rejectPendings = createAsyncThunk(
  'pendings/rejectPendings',
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
          const pendings = state.pendings.pendings
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

export const pendingsSlice = createSlice({
  name: 'pendings',
  initialState,
  reducers: {
    addIncomingFriendRequest: (state, action) => {
      state.pendings.push(action.payload)
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
  },
  extraReducers: (builder) => {
    builder
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
  },
})

export const getPendings = (state) => state.pendings.pendings

export const { addIncomingFriendRequest, removeUserFromPendings } =
  pendingsSlice.actions

export default pendingsSlice.reducer
