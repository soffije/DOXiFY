import React, { useState } from 'react'

import './User.css'
import Avatar from 'avataaars'

import FriendModal from '../../../Modal/FriendModal'
import ConfirmButton from '../../../Buttons/ConfirmButton'
import DeclineButton from '../../../Buttons/DeclineButton'

function UserRequest({ user, userType = 'request', handleUserReject }) {
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  return (
    <li className="py-1">
      <div className="d-flex flex-row border-bottom user">
        <div className="avatar flex-shrink-0 me-3">
          <Avatar
            style={{ borderRadius: '50%' }}
            className="mx-auto d-block mb-3"
            {...user.avatarOptions}
          />
        </div>
        <div className="d-flex flex-grow-1">
          <div className="name pt-2">
            {user.name ? (
              <p className="fw-bold mb-0">{user.name}</p>
            ) : (
              <p className="fw-bold mb-0">
                {user.address.slice(0, 5)}...{user.address.slice(-4)}
              </p>
            )}
          </div>
        </div>
        {userType === 'request' ? (
          <div className="d-flex align-items-center">
            <DeclineButton
              handleUserReject={() => {
                handleUserReject(user.address)
              }}
            />
          </div>
        ) : (
          <>
            <div className="d-flex align-items-center">
              <ConfirmButton
                handleUserAccept={() => {
                  handleShowModal()
                }}
              />
              <FriendModal
                type="request"
                show={showModal}
                handleClose={handleCloseModal}
                name={user.name}
                friend_address={user.address}
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
