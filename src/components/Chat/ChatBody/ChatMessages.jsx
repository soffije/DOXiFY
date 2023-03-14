import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './ChatMessages.css'

import { ChatContext } from '../Chat'
import ChatMessage from './ChatMessage'

import {
  fetchSelectedAccountMessages,
  getSelectedAccount,
  getSelectedAccountMessages,
} from '../../../features/chat/chatSlice'
import { getUserAddress } from '../../../features/user/userSlice'

function ChatMessages() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const selectedUserAddress = useSelector(getSelectedAccount)
  const selectedAccountMessages = useSelector(getSelectedAccountMessages)

  const { web3, contract } = useContext(ChatContext)

  useEffect(() => {
    if (selectedUserAddress)
      dispatch(
        fetchSelectedAccountMessages({ contract, address, selectedUserAddress })
      )
  }, [selectedUserAddress])

  return (
    <div className="flex-grow-1 chat-messages">
      {selectedAccountMessages?.map((message, index) => (
        <ChatMessage
          key={index}
          web3={web3}
          address={address}
          message={message}
        />
      ))}
    </div>
  )
}

export default ChatMessages
