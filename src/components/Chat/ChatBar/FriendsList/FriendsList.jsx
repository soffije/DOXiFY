import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import User from '../User/User'
import { FRIEND_SEARCH_PARAM } from '../../../../app/constants'

import {
  getFriends,
  resetNumberOfUnreadMessages,
} from '../../../../features/chat/friendsSlice'
import { getSearchQuery } from '../../../../features/chat/profileSlice'
import {
  setSelectedAccount,
  setSelectedAccountPublicKey,
} from '../../../../features/chat/chatSlice'

function Friends() {
  const dispatch = useDispatch()
  const friends = useSelector(getFriends)
  const friendsSearchQuery = useSelector(getSearchQuery)

  const handleUserClick = (user) => {
    dispatch(setSelectedAccount(user))
    dispatch(setSelectedAccountPublicKey(user.publicKey))
    dispatch(resetNumberOfUnreadMessages(user.address))
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
          <User
            key={index}
            user={user}
            handleUserClick={() => handleUserClick(user)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Friends
