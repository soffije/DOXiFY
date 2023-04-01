import React, { useState } from 'react'

import './User.css'

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
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
            alt="avatar"
            className="d-flex align-self-center me-3"
            width="60"
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
            <div className="d-flex mx-2">
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
