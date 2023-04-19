import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form } from 'react-bootstrap'

import Loader from '../../Loader/Loader'
import ChatMessages from './ChatMessages'
import { db } from '../../../api/indexDB'
import { WebSocketContext } from '../../../api/WebSocketProvider'

import {
  getSelectedAccountAddress,
  getSendingMessageLoading,
} from '../../../features/chat/chatSlice'
import { sendMessage } from '../../../features/chat/chatSlice'
import { getUserAddress } from '../../../features/user/userSlice'

function ChatBody() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const { web3, contract } = useContext(WebSocketContext)
  const selectedUserAddress = useSelector(getSelectedAccountAddress)
  const sendingButtonLoading = useSelector(getSendingMessageLoading)

  const [userMessage, setUserMessage] = useState('')

  function handleInputChange(e) {
    setUserMessage(e.target.value)
  }

  const onSendMessageClick = async () => {
    if (!userMessage) return

    await dispatch(
      sendMessage({
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
      if (!selectedUserAddress?.address) return
      await db.getFriend(selectedUserAddress.address)
    }

    getSavedFriend()
  }, [])

  return (
    <div className="col-8 d-flex flex-column py-3">
      {selectedUserAddress && (
        <>
          {selectedUserAddress.name !== 'Unknown' ? (
            <h6 className="text-center mb-0">{selectedUserAddress.name}</h6>
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
              userLoading={sendingButtonLoading}
              onClick={onSendMessageClick}
              buttonText="Send"
            ></Loader>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatBody
