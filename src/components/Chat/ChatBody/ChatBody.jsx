import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Button } from 'react-bootstrap'

import { ChatContext } from '../Chat'
import ChatMessages from './ChatMessages'
import Loader from '../../Loader/Loader'

import {
  getSelectedAccount,
  getSendigMessageLoading,
  sendUserMessage,
} from '../../../features/chat/chatSlice'

import { getUserAddress } from '../../../features/user/userSlice'

function ChatBody() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const selectedUserAddress = useSelector(getSelectedAccount)
  const sendingButtonLoadig = useSelector(getSendigMessageLoading)

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
        <>
          <h6 className="text-center mb-0">
            {selectedUserAddress.slice(0, 5)}...{selectedUserAddress.slice(-4)}
          </h6>{' '}
          <hr />
          <ChatMessages />
          <div className="d-flex flex-row gap-2">
            <Form.Control
              type="text"
              placeholder="Enter message"
              value={userMessage}
              onChange={handleInputChange}
            />
            <Loader
              userLoading={sendingButtonLoadig}
              onClick={sendMessage}
              buttonText="Send"
            ></Loader>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatBody
