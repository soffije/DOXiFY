import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form } from 'react-bootstrap'

import { WebSocketContext } from '../../../api/WebSocketProvider'
import ChatMessages from './ChatMessages'
import Loader from '../../Loader/Loader'

import {
  getSelectedAccount,
  getSendigMessageLoading,
  sendUserMessage,
} from '../../../features/chat/chatSlice'

import { getUserAddress } from '../../../features/user/userSlice'
import { getUser } from '../../../api/indexDB'

function ChatBody() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const selectedUserAddress = useSelector(getSelectedAccount)
  const sendingButtonLoadig = useSelector(getSendigMessageLoading)

  const { web3, contract } = useContext(WebSocketContext)

  const [userMessage, setUserMessage] = useState('')
  const [selectedUserName, setSelectedUserName] = useState('')

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

  useEffect(() => {
    const getSavedFriend = async () => {
      const savedFriend = await getUser(selectedUserAddress)
      setSelectedUserName(savedFriend.name)
    }

    getSavedFriend()
  })

  return (
    <div className="col-8 d-flex flex-column py-3">
      {selectedUserAddress && (
        <>
          {selectedUserName !== '' ? (
            <h6 className="text-center mb-0">{selectedUserName}</h6>
          ) : (
            <h6 className="text-center mb-0">
              {selectedUserAddress.slice(0, 5)}...
              {selectedUserAddress.slice(-4)}
            </h6>
          )}
          <hr />
          <ChatMessages />
          <div className="d-flex flex-row gap-2">
            <Form.Control
              type="text"
              as="textarea"
              rows={1}
              maxLength="4096"
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
