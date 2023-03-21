import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Friend from '../Friend/Friend'
import { FRIEND_SEARCH_PARAM } from '../../../../app/constants'

import {
  getFriends,
  getFriendsSearchQuery,
  setSelectedAccount,
} from '../../../../features/chat/chatSlice'

function Friends() {
  const dispatch = useDispatch()
  const friends = useSelector(getFriends)
  const friendsSearchQuery = useSelector(getFriendsSearchQuery)

  const handleAccountSelection = (userAddress) => {
    dispatch(setSelectedAccount(userAddress))
  }

  const friendsArray = useMemo(
    () =>
      friends?.filter((object) =>
        FRIEND_SEARCH_PARAM.some((objectKeyName) =>
          object[objectKeyName]
            ?.toString()
            .toLowerCase()
            .includes(friendsSearchQuery.toLowerCase())
        )
      ),
    [friends, friendsSearchQuery]
  )

  return (
    <div className="friends-container">
      <ul className="list-unstyled mb-0">
        {friendsArray?.map((friend, index) => (
          <Friend
            key={index}
            handleAccountSelection={handleAccountSelection}
            friend={friend}
          />
        ))}
      </ul>
    </div>
  )
}

export default Friends
