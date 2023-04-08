import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  selectedAccount: null,
  messages: [],
  messagesLoading: 'idle',
  sendingMessageLoading: 'idle',
  error: null,
}

export const sendMessage = createAsyncThunk(
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
        .sendMessage(selectedUserAddress.address, 'text', request.data.IpfsHash)
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
            recipient: selectedUserAddress.address,
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

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ contract, address, selectedUserAddress }) => {
    try {
      const selectedAccountMessages = await contract.methods
        .getMessages(selectedUserAddress.address)
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
        const newItem = {}
        for (const key in item)
          if (
            key !== '0' &&
            key !== '1' &&
            key !== '2' &&
            key !== '3' &&
            key !== '4'
          )
            newItem[key] = item[key]

        newItem.fileHash = retrievedHashes[index].message
        return newItem
      })

      return { result }
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
    addIncomingMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.messagesLoading = 'pending'
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesLoading = 'idle'
        state.messages = action.payload.result
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messagesLoading = 'idle'
        state.error = action.error.message
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendingMessageLoading = 'pending'
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.sendingMessageLoading = 'idle'
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingMessageLoading = 'idle'
        state.error = action.error.message
      })
  },
})

export const getSelectedAccountAddress = (state) => state.chat.selectedAccount
export const getSelectedAccountMessages = (state) => state.chat.messages
export const getSendingMessageLoading = (state) =>
  state.chat.sendingMessageLoading

export const { setSelectedAccount, addIncomingMessage } = chatSlice.actions

export default chatSlice.reducer
