import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Friends.css'
import {
  getFriends,
  setSelectedAccount,
} from '../../../features/chat/chatSlice'

function Friends() {
  const dispatch = useDispatch()
  const friends = useSelector(getFriends)

  const [selectedFriend, setSelectedFriend] = useState(null)

  const handleAccountSelection = (userAddress) => {
    dispatch(setSelectedAccount(userAddress))
    setSelectedFriend(userAddress)
  }

  const friendsArray = useMemo(
    () =>
      friends?.map((friend, index) => (
        <div
          key={index}
          className={`friend-selection-item my-2 text-center ${
            selectedFriend === friend ? 'selected' : ''
          }`}
          onClick={() => {
            handleAccountSelection(friend)
          }}
        >
          <h6 className="friend-selection-name">
            {friend.slice(0, 5)}...{friend.slice(-4)}
          </h6>
        </div>
      )),
    [friends, selectedFriend]
  )

  return <>{friendsArray}</>
}

export default Friends
