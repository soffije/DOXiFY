import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import User from '../User/User'
import { FRIEND_SEARCH_PARAM } from '../../../../app/constants'

import {
  getFriends,
  getFriendsSearchQuery,
  resetNumberOfUnreadMessages,
  setSelectedAccount,
} from '../../../../features/chat/chatSlice'

function Friends() {
  const dispatch = useDispatch()
  const friends = useSelector(getFriends)
  const friendsSearchQuery = useSelector(getFriendsSearchQuery)

  const handleUserClick = (userAddress) => {
    dispatch(setSelectedAccount(userAddress))
    dispatch(resetNumberOfUnreadMessages(userAddress))
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
        {friendsArray?.map((user, index) => (
          <User key={index} user={user} handleUserClick={handleUserClick} />
        ))}
      </ul>
    </div>
  )
}

export default Friends
