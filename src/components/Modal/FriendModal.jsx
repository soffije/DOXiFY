import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Form, Modal } from 'react-bootstrap'

import { db } from '../../app/indexDB'
import avatarSettings from '../../utils/defaultAvatarSetting'
import { WebSocketContext } from '../../app/WebSocketProvider'
import AvatarComponent from '../AvatarComponent/AvatarComponent'

import { addFriend } from '../../features/chat/profileSlice'
import { getUserAddress } from '../../features/user/userSlice'

function FriendModal({ type, show, handleClose, friend_address = null }) {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const { web3, contract } = useContext(WebSocketContext)

  const [friendName, setFriendName] = useState('')
  const [friendAddress, setFriendAddress] = useState('')

  const [avatarOptions, setAvatarOptions] = useState(avatarSettings)

  const resetForm = () => {
    setFriendName('')
    setFriendAddress('')
    setAvatarOptions(avatarSettings)
  }

  const handleAddressChange = (event) => {
    const inputAddress = event.target.value
    setFriendAddress(inputAddress)
  }

  const handleNameChange = (event) => {
    const inputName = event.target.value
    setFriendName(inputName)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (type === 'add') {
      event.preventDefault()
      const args = {
        web3: web3,
        contract: contract,
        address: address,
        friendAddress: friendAddress,
        friendName: friendName,
        avatarOptions: avatarOptions,
      }
      await dispatch(addFriend(args))
      handleClose()
      await db.addFriend({
        address: friendAddress,
        name: friendName,
        avatarOptions: avatarOptions,
      })
    }

    if (type === 'request') {
      const args = {
        web3: web3,
        contract: contract,
        address: address,
        friendAddress: friend_address,
        friendName: friendName,
        avatarOptions: avatarOptions,
      }
      await dispatch(addFriend(args))
      handleClose()
      await db.addFriend({
        address: friend_address,
        name: friendName,
        avatarOptions: avatarOptions,
      })
    }
  }

  return (
    <Modal
      size="lg"
      fullscreen="md-down"
      show={show}
      onHide={() => {
        handleClose()
        resetForm()
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Friend</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AvatarComponent
          avatarOptions={avatarOptions}
          setAvatarOptions={setAvatarOptions}
        />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter Name"
              value={friendName}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="Enter Address"
              value={friend_address}
              onChange={handleAddressChange}
              readOnly={type === 'request' ? true : false}
            />
          </Form.Group>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose()
                resetForm()
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default FriendModal
