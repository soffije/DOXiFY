import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Friends from './Friends'
import { ChatContext } from '../Chat'
import AddFriendModal from '../../Modal/AddFriend'

import {
  getUserAddress,
  isUserConnected,
} from '../../../features/user/userSlice'
import { fetchFriends } from '../../../features/chat/chatSlice'

function ChatBar() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)

  const { contract } = useContext(ChatContext)

  useEffect(() => {
    if (!address && !isUserConnected) return
    dispatch(fetchFriends({ contract, address }))
  }, [contract, address])

  return (
    <div className="col-4 py-3">
      <div className="mb-3 text-center">
        <h6>
          Me: {address.slice(0, 5)}...{address.slice(-4)}
        </h6>
      </div>
      <div className="mb-3 d-flex flex-column">
        <AddFriendModal />
      </div>
      <Friends />
    </div>
  )
}

export default ChatBar
