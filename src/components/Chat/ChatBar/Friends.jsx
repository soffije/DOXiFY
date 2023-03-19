import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Friend from './Friend'

import {
  getFriends,
  setSelectedAccount,
} from '../../../features/chat/chatSlice'

function Friends() {
  const dispatch = useDispatch()
  const friends = useSelector(getFriends)

  const handleAccountSelection = (userAddress) => {
    dispatch(setSelectedAccount(userAddress))
  }

  const friendsArray = useMemo(
    () =>
      friends?.map((friend, index) => (
        <Friend
          key={index}
          handleAccountSelection={handleAccountSelection}
          friend={friend}
        />
      )),
    [friends]
  )

  return (
    <div className="friends-container">
      <ul className="list-unstyled mb-0">{friendsArray}</ul>
    </div>
  )
}

export default Friends
