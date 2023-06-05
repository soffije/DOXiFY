import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import isMetaMaskInstalled from '../../helpers/isMetaMaskInstalled'
import { generateKeysAndSaveToLocalStorage } from '../../utils/rsa'

const initialState = {
  address: null,
  isConnected: false,
  error: null,
  loading: 'idle',
}

export const connectUser = createAsyncThunk('user/connect', async () => {
  try {
    if (!isMetaMaskInstalled())
      throw new Error('Please install Metamask to connect')

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const address = accounts[0]

    generateKeysAndSaveToLocalStorage()

    return { address }
  } catch (error) {
    return { error: error.message }
  }
})

export const isUserConnected = createAsyncThunk(
  'user/isConnected',
  async () => {
    try {
      if (!isMetaMaskInstalled())
        throw new Error('Please install Metamask to connect')

      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        })
        if (accounts.length > 0) {
          const address = accounts[0]
          generateKeysAndSaveToLocalStorage()
          return { isConnected: true, address }
        }
      }
      return { isConnected: false, address: null }
    } catch (error) {
      return { error: error.message }
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectUser.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(connectUser.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.isConnected = true
          state.address = action.payload.address
        }
      })
      .addCase(connectUser.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.payload
        }
      })
      .addCase(isUserConnected.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(isUserConnected.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.isConnected = action.payload.isConnected
          state.address = action.payload.address
        }
      })
      .addCase(isUserConnected.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.isConnected = false
          state.address = null
          state.error = action.payload
        }
      })
  },
})

export const getUserAddress = (state) => state.user.address
export const getUserIsConnected = (state) => state.user.isConnected
export const getUserLoading = (state) => state.user.loading

export default userSlice.reducer
