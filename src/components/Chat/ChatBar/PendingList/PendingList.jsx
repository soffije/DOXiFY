import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { WebSocketContext } from '../../../../api/WebSocketProvider'
import UserRequest from '../User/UserRequest'

import {
  getPendings,
  rejectPendings,
} from '../../../../features/chat/pendingsSlice'
import { getUserAddress } from '../../../../features/user/userSlice'

function PendingList() {
  const dispatch = useDispatch()
  const pendings = useSelector(getPendings)
  const address = useSelector(getUserAddress)
  const { web3, contract } = useContext(WebSocketContext)

  const handleUserReject = (friendAddress) => {
    const args = {
      web3: web3,
      contract: contract,
      address: address,
      friendAddress: friendAddress,
    }
    dispatch(rejectPendings(args))
  }

  return (
    <div className="friends-container">
      <ul className="list-unstyled mb-0">
        {pendings?.map((user, index) => (
          <UserRequest
            key={index}
            user={user}
            userType="pending"
            handleUserReject={handleUserReject}
          />
        ))}
      </ul>
    </div>
  )
}

export default PendingList
