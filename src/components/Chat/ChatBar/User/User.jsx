import React from 'react'
import { useSelector } from 'react-redux'

import './User.css'
import Avatar from 'avataaars'
import { getSelectedAccountAddress } from '../../../../features/chat/chatSlice'

function User({ user, handleUserClick }) {
  const selectedUser = useSelector(getSelectedAccountAddress)

  return (
    <li className="py-1">
      <div
        className={`d-flex flex-row border-bottom user ${
          user.address === selectedUser ? 'selected' : ''
        }`}
        onClick={() => {
          handleUserClick(user.address)
        }}
      >
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
        <div className="user-unread-badge">
          {user.numberOfUnreadMessages !== 0 ? (
            <span className="badge bg-primary">
              {user.numberOfUnreadMessages}
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
    </li>
  )
}

export default User
