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
        <div className="avatar me-3">
          <Avatar
            style={{ borderRadius: '50%' }}
            className="mx-auto d-block mb-3"
            {...user.avatarOptions}
          />
        </div>
        <div className="pt-1">
          {user.name ? (
            <p className="fw-bold mb-0">{user.name}</p>
          ) : (
            <p className="fw-bold mb-0">
              {user.address.slice(0, 5)}...{user.address.slice(-4)}
            </p>
          )}
        </div>
        {userType === 'request' ? (
          <DeclineButton
            handleUserReject={() => {
              handleUserReject(user.address)
            }}
          />
        ) : (
          <>
            <div className="d-flex mx-2 btn-container d-flex justify-content-end">
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
