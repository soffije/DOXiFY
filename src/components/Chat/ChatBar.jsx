import React, { useEffect, useState } from 'react'

import { Form, Button } from 'react-bootstrap'

function ChatBar({ account, contract }) {
  const [users, setUsers] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const users = async () => {
      try {
        await contract.methods
          .getFriends()
          .call()
          .then((result) => {
            setUsers(result)
          })
          .catch((error) => {
            console.error(error)
          })
      } catch (error) {
        console.log('Error', error)
      }
    }

    users()
  }, [contract])

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  const handleButtonClick = async () => {
    await contract.methods
      .addFriend(inputValue)
      .send({ from: account, gas: 300000 })
  }

  return (
    <div className="col-4">
      <Form.Control
        type="text"
        placeholder="Enter message"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        variant="primary"
        className="float-right"
        onClick={handleButtonClick}
      >
        Add Friend
      </Button>
      {users.map((user) => (
        <h5>{user}</h5>
      ))}
    </div>
  )
}

export default ChatBar
