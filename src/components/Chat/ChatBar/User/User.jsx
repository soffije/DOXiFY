import React from 'react'
import { useSelector } from 'react-redux'

import './User.css'

import { getSelectedAccount } from '../../../../features/chat/chatSlice'

function User({ user, handleUserClick }) {
  const selectedUser = useSelector(getSelectedAccount)

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
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
            alt="avatar"
            className="d-flex align-self-center me-3"
            width="60"
          />
        </div>
        <div className="pt-1">
          {user.name && <p className="fw-bold mb-0">{user.name}</p>}
          <p className="fw-bold mb-0">
            {user.address.slice(0, 5)}...{user.address.slice(-4)}
          </p>
        </div>
        <div className="user-unread-badge d-flex justify-content-end">
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
