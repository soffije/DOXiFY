import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Button } from 'react-bootstrap'

import { ChatContext } from '../Chat'
import ChatMessages from './ChatMessages'

import {
  getSelectedAccount,
  sendUserMessage,
} from '../../../features/chat/chatSlice'
import { getUserAddress } from '../../../features/user/userSlice'

function ChatBody() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const selectedUserAddress = useSelector(getSelectedAccount)

  const { web3, contract } = useContext(ChatContext)

  const [userMessage, setUserMessage] = useState('')

  function handleInputChange(e) {
    setUserMessage(e.target.value)
  }

  const sendMessage = async () => {
    if (!userMessage) return
    await dispatch(
      sendUserMessage({
        web3,
        contract,
        address,
        selectedUserAddress,
        userMessage,
      })
    )
    setUserMessage('')
  }

  return (
    <div className="col-8 d-flex flex-column py-3">
      {selectedUserAddress && (
        <h6 className="text-center mb-0">
          {selectedUserAddress.slice(0, 5)}...{selectedUserAddress.slice(-4)}
        </h6>
      )}

      <hr />

      <ChatMessages />

      <div className="d-flex flex-row gap-2">
        <Form.Control
          type="text"
          placeholder="Enter message"
          value={userMessage}
          onChange={handleInputChange}
        />
        <Button variant="primary" className="float-right" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  )
}

export default ChatBody
