import React from 'react'
import { useSelector } from 'react-redux'

import './Friend.css'

import { getSelectedAccount } from '../../../../features/chat/chatSlice'

function Friend({ handleAccountSelection, friend }) {
  const selectedUser = useSelector(getSelectedAccount)

  return (
    <li className="py-1">
      <div
        className={`d-flex flex-row border-bottom friend ${
          friend.address === selectedUser ? 'selected' : ''
        }`}
        onClick={() => {
          handleAccountSelection(friend.address)
          console.log(friend, selectedUser)
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
          <p className="fw-bold mb-0">
            {friend.address.slice(0, 5)}...{friend.address.slice(-4)}
          </p>
        </div>
        <div className="friend-unread-badge d-flex justify-content-end">
          {friend.numberOfUnreadMessages !== 0 ? (
            <span className="badge bg-primary">
              {friend.numberOfUnreadMessages}
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
    </li>
  )
}

export default Friend
