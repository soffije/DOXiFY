import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
      friends?.map((friend) => (
        <div
          key={friend}
          className="my-3 text-center"
          onClick={() => {
            handleAccountSelection(friend)
          }}
        >
          <h6>
            {friend.slice(0, 5)}...{friend.slice(-4)}
          </h6>
        </div>
      )),
    [friends]
  )

  return <>{friendsArray}</>
}

export default Friends
