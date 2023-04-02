import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './ChatMessages.css'

import { WebSocketContext } from '../../../api/WebSocketProvider'
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

  const { web3, contract } = useContext(WebSocketContext)

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

  if (!selectedAccountMessages?.length) {
    return (
      <div className="d-flex flex-grow-1 justify-content-center align-items-center mb-3">
        <h6>Say hi to your friend!</h6>
      </div>
    )
  }

  return (
    <div className="flex-grow-1 chat-messages mb-3">
      {selectedAccountMessages.map((message, index) => (
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
