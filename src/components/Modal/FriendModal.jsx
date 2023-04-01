import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { WebSocketContext } from '../../api/WebSocketProvider'
import { Button, Form, Modal } from 'react-bootstrap'
import { addFriend } from '../../features/chat/chatSlice'
import { getUserAddress } from '../../features/user/userSlice'
import { addUser } from '../../api/indexDB'

function FriendModal({
  type = 'add',
  show,
  handleClose,
  userAction,
  friend_address = null,
}) {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const { web3, contract } = useContext(WebSocketContext)

  const [friendName, setFriendName] = useState('')
  const [friendAddress, setFriendAddress] = useState('')

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
      }
      await dispatch(addFriend(args))
      await addUser({
        address: friendAddress,
        name: friendName,
      })
      handleClose()
    }

    if (type === 'request') {
      const args = {
        web3: web3,
        contract: contract,
        address: address,
        friendAddress: friend_address,
        friendName: friendName,
      }
      await dispatch(addFriend(args))
      await addUser({
        address: friend_address,
        name: friendName,
      })
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Friend</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
                  userAction()
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
    </>
  )
}

export default FriendModal
