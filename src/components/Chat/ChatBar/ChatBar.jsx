import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ChatContext } from '../Chat'
import Friends from './FriendsList/Friends'
import AddFriendModal from '../../Modal/AddFriend'
import UsersSearch from '../../Forms/Search/UsersSearch'

import {
  getUserAddress,
  isUserConnected,
} from '../../../features/user/userSlice'
import {
  fetchFriends,
  getFriendsSearchQuery,
  setFriendSearchQuery,
} from '../../../features/chat/chatSlice'

function ChatBar() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const searchQuery = useSelector(getFriendsSearchQuery)

  const { contract } = useContext(ChatContext)

  const onFormControlChange = (event) =>
    dispatch(setFriendSearchQuery(event.target.value))

  useEffect(() => {
    if (!address && !isUserConnected) return
    dispatch(fetchFriends({ contract, address }))
  }, [contract, address])

  return (
    <div className="col-4 py-3">
      <div className="text-center">
        <h6>
          Me: {address.slice(0, 5)}...{address.slice(-4)}
        </h6>
      </div>
      <div className="mb-3 d-flex flex-column">
        <AddFriendModal />
      </div>
      <UsersSearch
        placeholder="Find friend"
        value={searchQuery}
        onChange={onFormControlChange}
      />
      <Friends />
    </div>
  )
}

export default ChatBar
