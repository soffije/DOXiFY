import React, { useContext, useEffect, useRef } from 'react'
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

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (selectedUserAddress) {
      dispatch(
        fetchSelectedAccountMessages({
          contract,
          address,
          selectedUserAddress,
        })
      )
    }
  }, [selectedUserAddress])

  useEffect(() => {
    scrollToBottom()
  }, [selectedAccountMessages])

  return (
    <div className="flex-grow-1 chat-messages mb-3">
      {selectedAccountMessages?.map((message, index) => (
        <ChatMessage
          key={index}
          web3={web3}
          address={address}
          message={message}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages
