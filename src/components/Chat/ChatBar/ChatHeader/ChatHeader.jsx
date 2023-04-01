import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'

import FriendModal from '../../../Modal/FriendModal'

import { getUserAddress } from '../../../../features/user/userSlice'

function ChatHeader() {
  const address = useSelector(getUserAddress)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClose()
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mb-1">
        <div ref={ref}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
            alt="avatar"
            className="d-flex align-self-center me-3"
            width="60"
            style={{ cursor: 'pointer' }}
            onClick={handleOpen}
          />
          <Dropdown show={isOpen} onBlur={handleClose}>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  handleShowModal()
                }}
              >
                Add new friend
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <h6 style={{ marginRight: '10px' }}>
            Me: {address.slice(0, 5)}...{address.slice(-4)}
          </h6>
        </div>
        <div className="flex-grow-1">
          <FriendModal
            type="add"
            show={showModal}
            handleClose={handleCloseModal}
          />
        </div>
      </div>
    </>
  )
}

export default ChatHeader
