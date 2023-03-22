import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Tab, Tabs } from 'react-bootstrap'

import { ChatContext } from '../Chat'
import Friends from './FriendsList/Friends'
import ChatHeader from './ChatHeader/ChatHeader'
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
    <div className="col-4 py-3" style={{ borderLeft: '5' }}>
      <ChatHeader />
      <UsersSearch
        placeholder="Find friend"
        value={searchQuery}
        onChange={onFormControlChange}
      />
      <Tabs
        defaultActiveKey="friends"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="friends" title="Friends">
          <Friends />
        </Tab>
        <Tab eventKey="request" title="Requests">
          <h1>request</h1>
        </Tab>
        <Tab eventKey="pending" title="Pending">
          <h1>Pending</h1>
        </Tab>
      </Tabs>
    </div>
  )
}

export default ChatBar
