import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Web3 from 'web3'

import ChatBar from './ChatBar/ChatBar'
import ChatBody from './ChatBody/ChatBody'

import abi from '../../app/abi'
import contractAddress from '../../app/contract'
import { subscribeUser } from '../../features/chat/chatSlice'
import { getUserAddress } from '../../features/user/userSlice'
export const ChatContext = createContext()

function Chat() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)

  const web3 = new Web3('https://api.avax-test.network/ext/bc/C/rpc')
  const contract = new web3.eth.Contract(abi, contractAddress)
  const [chatInstances] = useState({
    web3: web3,
    contract: contract,
  })

  useEffect(() => {
    dispatch(subscribeUser({ web3, contract, address }))
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
