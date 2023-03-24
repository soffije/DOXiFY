import React, { createContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { useDispatch, useSelector } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import abi from '../../app/abi'
import ChatBar from './ChatBar/ChatBar'
import ChatBody from './ChatBody/ChatBody'

import {
  handleIncomingMessageEvent,
  getSelectedAccount,
  subscribeUser,
} from '../../features/chat/chatSlice'
import { getUserAddress } from '../../features/user/userSlice'

export const ChatContext = createContext()

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.REACT_APP_PROVIDER)
)
const client = new W3CWebSocket(process.env.REACT_APP_PROVIDER)
const contract = new web3.eth.Contract(
  abi,
  process.env.REACT_APP_CONTRACT_ADDRESS
)

function Chat() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const selectedAccount = useSelector(getSelectedAccount)

  const [chatInstances] = useState({
    web3: web3,
    client: client,
    contract: contract,
  })

  useEffect(() => {
    const { web3, contract } = chatInstances

    dispatch(subscribeUser({ web3, contract, address }))

    return () => {
      web3.currentProvider.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!chatInstances) return

    const { client, contract } = chatInstances

    client.onopen = () => {
      contract.events
        .MessageSent()
        .on('data', (event) => {
          dispatch(handleIncomingMessageEvent(event))
        })
        .on('error', console.error)
    }

    return () => {
      client.close()
    }
  }, [address, selectedAccount])

  return (
    <div className="row chat-container shadow">
      <ChatContext.Provider value={chatInstances}>
        <ChatBar />
        <ChatBody />
      </ChatContext.Provider>
    </div>
  )
}

export default Chat
