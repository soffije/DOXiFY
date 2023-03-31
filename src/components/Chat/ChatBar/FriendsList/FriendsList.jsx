import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import User from '../User/User'
import { FRIEND_SEARCH_PARAM } from '../../../../app/constants'

import {
  getFriends,
  getFriendsSearchQuery,
  resetNumberOfUnreadMessages,
  setSelectedAccount,
} from '../../../../features/chat/chatSlice'
import { getAllUsers } from '../../../../api/indexDB'

function Friends() {
  const dispatch = useDispatch()
  const friends = useSelector(getFriends)
  const [friendsArray, setFriendsArray] = useState([])
  const friendsSearchQuery = useSelector(getFriendsSearchQuery)

  const handleUserClick = (userAddress) => {
    dispatch(setSelectedAccount(userAddress))
    dispatch(resetNumberOfUnreadMessages(userAddress))
  }

  useEffect(() => {
    const fetchData = async () => {
      const savedFriends = await getAllUsers()

      const retrievedLocalSavedFriends = friends.map((item) => {
        const matchingItem = savedFriends.find(
          (firstItem) => firstItem.address === item.address
        )
        return {
          address: item.address,
          name: matchingItem?.name,
          numberOfUnreadMessages: 0,
        }
      })

      const result = retrievedLocalSavedFriends?.filter((object) =>
        FRIEND_SEARCH_PARAM.some((objectKeyName) =>
          object[objectKeyName]
            ?.toString()
            .toLowerCase()
            .includes(friendsSearchQuery.toLowerCase())
        )
      )

      setFriendsArray(result)
    }

    fetchData()
  }, [friends, friendsSearchQuery])

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
