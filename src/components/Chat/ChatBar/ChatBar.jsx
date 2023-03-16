import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Button } from 'react-bootstrap'

import Friends from './Friends'
import { ChatContext } from '../Chat'

import { getUserAddress } from '../../../features/user/userSlice'
import { addFriend, fetchFriends } from '../../../features/chat/chatSlice'

function ChatBar() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)

  const { web3, contract } = useContext(ChatContext)

  const [friendAddress, setFriendAddress] = useState('')

  // useEffect(() => {
  //   dispatch(fetchFriends({ contract, address }))
  // }, [contract, address])

  const handleButtonGetFriendsClick = async () => {
    dispatch(fetchFriends({ contract, address }))
  }

  const handleButtonClick = async () => {
    await dispatch(addFriend({ web3, contract, address, friendAddress }))
    setFriendAddress('')
  }

  function handleInputChange(e) {
    setFriendAddress(e.target.value)
  }

  return (
    <div className="col-4 py-3">
      <div className="mb-3 text-center">
        <h6>
          Me: {address.slice(0, 5)}...{address.slice(-4)}
        </h6>
      </div>
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter message"
          value={friendAddress}
          onChange={handleInputChange}
        />
        <Button
          variant="primary"
          className="float-right mt-1"
          onClick={handleButtonClick}
        >
          Add Friend
        </Button>
        <Button
          variant="primary"
          className="float-right mt-1"
          onClick={handleButtonGetFriendsClick}
        >
          Get Friends
        </Button>
      </div>
      <Friends />
    </div>
  )
}

export default ChatBar
