import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Tab, Tabs } from 'react-bootstrap'

import { WebSocketContext } from '../../../api/WebSocketProvider'
import ChatHeader from './ChatHeader/ChatHeader'
import PendingList from './PendingList/PendingList'
import FriendsList from './FriendsList/FriendsList'
import RequestsList from './RequestsList/RequestsList'
import UsersSearch from '../../Forms/Search/UsersSearch'

import {
  getUserAddress,
  isUserConnected,
} from '../../../features/user/userSlice'
import { fetchFriends } from '../../../features/chat/friendsSlice'
import { fetchRequests } from '../../../features/chat/requestsSlice'
import { fetchPendings } from '../../../features/chat/pendingsSlice'
import { getSearchQuery } from '../../../features/chat/profileSlice'
import { setSearchQuery } from '../../../features/chat/profileSlice'

function ChatBar() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const searchQuery = useSelector(getSearchQuery)

  const { contract } = useContext(WebSocketContext)

  const onFormControlChange = (event) =>
    dispatch(setSearchQuery(event.target.value))

  useEffect(() => {
    if (!address && !isUserConnected) return
    dispatch(fetchFriends({ contract, address }))
    dispatch(fetchRequests({ contract, address }))
    dispatch(fetchPendings({ contract, address }))
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
          <FriendsList />
        </Tab>
        <Tab eventKey="request" title="Requests">
          <RequestsList />
        </Tab>
        <Tab eventKey="pending" title="Pendings">
          <PendingList />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ChatBar
