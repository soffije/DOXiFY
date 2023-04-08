import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { WebSocketContext } from '../../../../api/WebSocketProvider'
import UserRequest from '../User/UserRequest'

import {
  getRequests,
  rejectRequest,
} from '../../../../features/chat/requestsSlice'
import { getUserAddress } from '../../../../features/user/userSlice'

function RequestsList() {
  const dispatch = useDispatch()
  const requests = useSelector(getRequests)
  const address = useSelector(getUserAddress)
  const { web3, contract } = useContext(WebSocketContext)

  const handleUserReject = (friendAddress) => {
    const args = {
      web3: web3,
      contract: contract,
      address: address,
      friendAddress: friendAddress,
    }
    dispatch(rejectRequest(args))
  }

  return (
    <div className="friends-container">
      <ul className="list-unstyled mb-0">
        {requests?.map((user, index) => (
          <UserRequest
            key={index}
            user={user}
            handleUserReject={handleUserReject}
          />
        ))}
      </ul>
    </div>
  )
}

export default RequestsList
