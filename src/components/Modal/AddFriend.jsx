import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ChatContext } from '../Chat/Chat'
import { Button, Form, Modal } from 'react-bootstrap'
import { addFriend } from '../../features/chat/chatSlice'
import { getUserAddress } from '../../features/user/userSlice'

function AddFriendModal() {
  const dispatch = useDispatch()

  const address = useSelector(getUserAddress)

  const { web3, contract } = useContext(ChatContext)

  const [friendAddress, setFriendAddress] = useState('')
  const [validAddress, setValidAddress] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const handleAddressChange = (event) => {
    const inputAddress = event.target.value
    const addressRegex = /^0x[a-fA-F0-9]{40}$/
    if (addressRegex.test(inputAddress)) {
      setFriendAddress(inputAddress)
      setValidAddress(true)
    } else {
      setFriendAddress(inputAddress)
      setValidAddress(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(addFriend({ web3, contract, address, friendAddress }))
    setShowModal(false)
  }

  const handleShowModal = () => {
    setShowModal(true)
    setFriendAddress('')
    setValidAddress(false)
  }

  const handleInputFocus = () => {
    setIsTyping(true)
  }

  const handleInputBlur = () => {
    setIsTyping(false)
  }

  return (
    <>
      <Button
        style={{ width: '100%' }}
        variant="primary"
        onClick={handleShowModal}
        className="float-right mt-1"
      >
        Add friend
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Friend Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Friend address</Form.Label>
              <Form.Control
                placeholder="Enter Address"
                value={friendAddress}
                onChange={handleAddressChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={{
                  borderColor: isTyping
                    ? 'blue'
                    : validAddress
                    ? 'green'
                    : 'red',
                }}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={!validAddress}>
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddFriendModal
