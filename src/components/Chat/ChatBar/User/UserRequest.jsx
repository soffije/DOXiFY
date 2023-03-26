import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './User.css'
import { Button } from 'react-bootstrap'

import { ChatContext } from '../../Chat'

import { addFriend } from '../../../../features/chat/chatSlice'
import { getUserAddress } from '../../../../features/user/userSlice'

function UserRequest({ user, userType = 'request', handleUserReject }) {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const { web3, contract } = useContext(ChatContext)

  const handleUserAccept = (friendAddress) => {
    const args = {
      web3: web3,
      contract: contract,
      address: address,
      friendAddress: friendAddress,
    }
    dispatch(addFriend(args))
  }

  return (
    <li className="py-1">
      <div className="d-flex flex-row border-bottom user">
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
            alt="avatar"
            className="d-flex align-self-center me-3"
            width="60"
          />
        </div>
        <div className="pt-1">
          <p className="fw-bold mb-0">
            {user.address.slice(0, 5)}...{user.address.slice(-4)}
          </p>
        </div>
        {userType === 'request' ? (
          <Button
            variant="danger"
            onClick={() => {
              handleUserReject(user.address)
            }}
          >
            Undo
          </Button>
        ) : (
          <>
            <Button
              variant="success"
              onClick={() => {
                handleUserAccept(user.address)
              }}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleUserReject(user.address)
              }}
            >
              Reject
            </Button>
          </>
        )}
      </div>
    </li>
  )
}

export default UserRequest
