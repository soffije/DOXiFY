import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Web3 from 'web3'

import ChatBar from './ChatBar/ChatBar'
import ChatBody from './ChatBody/ChatBody'

import abi from '../../app/abi'
import { subscribeUser } from '../../features/chat/chatSlice'
import { getUserAddress } from '../../features/user/userSlice'

export const ChatContext = createContext()

function Chat() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)

  const web3 = new Web3('http://localhost:7545')
  const contract = new web3.eth.Contract(
    abi,
    '0x7CE801444d00E8B81729F42e23bD399aEE97aA65'
  )
  const [chatInstances] = useState({
    web3: web3,
    contract: contract,
  })

  // optimize this function
  useEffect(() => {
    dispatch(subscribeUser({ contract, address }))
  }, [address])

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
