import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './User.css'
import { Button } from 'react-bootstrap'

import { ChatContext } from '../../Chat'

import ConfirmButton from '../../../Buttons/ConfirmButton'
import DeclineButton from '../../../Buttons/DeclineButton'

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
          <DeclineButton
            handleUserReject={() => {
              handleUserReject(user.address)
            }}
          />
        ) : (
          <>
            <div className="d-flex mx-2">
              <ConfirmButton
                handleUserAccept={() => {
                  handleUserAccept(user.address)
                }}
              />
              <DeclineButton
                handleUserReject={() => {
                  handleUserReject(user.address)
                }}
              />
            </div>
          </>
        )}
      </div>
    </li>
  )
}

export default UserRequest
