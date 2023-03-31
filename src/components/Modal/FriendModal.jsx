import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { WebSocketContext } from '../../api/WebSocketProvider'
import { Button, Form, Modal } from 'react-bootstrap'
import { addFriend } from '../../features/chat/chatSlice'
import { getUserAddress } from '../../features/user/userSlice'
import { addUser } from '../../api/indexDB'

function FriendModal({
  type = 'add',
  show = false,
  name = null,
  friend_address = null,
}) {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const { web3, contract } = useContext(WebSocketContext)

  const [friendName, setFriendName] = useState('')
  const [showModal, setShowModal] = useState(show)
  const [isReadonly, setIsReadonly] = useState(false)
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
    if (type === 'add') {
      event.preventDefault()
      const args = {
        web3: web3,
        contract: contract,
        address: address,
        friendAddress: friendAddress,
      }
      await dispatch(addFriend(args))
      await addUser({
        address: friendAddress,
        name: friendName,
      })
      setShowModal(false)
    }

    if (type === 'request') {
      const args = {
        web3: web3,
        contract: contract,
        address: address,
        friendAddress: friend_address,
      }
      dispatch(addFriend(args))
    }
  }

  const handleShowModal = () => {
    setShowModal(true)
    setFriendAddress('')
    setFriendName('')
  }

  useEffect(() => {
    if (name) setFriendName(name)

    if (friend_address) {
      setFriendAddress(friend_address)
      setIsReadonly(true)
    }
  }, [])

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShowModal}
        className="float-right mt-1"
      >
        Add friend
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
                value={friendAddress}
                onChange={handleAddressChange}
                readOnly={isReadonly}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
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
