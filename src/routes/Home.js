import React, { useState, useEffect } from 'react'
import Web3 from 'web3'

import { Form, Button } from 'react-bootstrap'

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}
const contractAddress = '0x86C8501f8912E9a07bd52b4d283C12978682Ade6'
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'message',
        type: 'bytes32',
      },
    ],
    name: 'NewMessage',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_content',
        type: 'bytes32',
      },
    ],
    name: 'sendMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMessages',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes20',
            name: 'sender',
            type: 'bytes20',
          },
          {
            internalType: 'bytes32',
            name: 'content',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct BlockchainChat.Message[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
]
const web3 = new Web3(window.ethereum)

function Home() {
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    async function init() {
      // Load the contract
      const contract = new web3.eth.Contract(abi, contractAddress)
      setContract(contract)

      // Get the current account
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])
      console.log(accounts)

      // Load the existing messages
      const messageCount = await contract.methods.getMessages().call()
      console.log(messageCount)
      setMessages(messageCount)
    }

    init()
  }, [])

  async function sendMessage(e) {
    e.preventDefault()
    if (!inputValue) return

    // Send the message to the contract
    await contract.methods
      .sendMessage(web3.utils.fromAscii(inputValue))
      .send({ from: account, gas: 300000 })

    // Update the message list
    const messageCount = await contract.methods.getMessages().call()
    console.log(messageCount)
    setMessages(messageCount)

    // Clear the input field
    setInputValue('')
  }

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  return (
    <div className="chat-container my-5 p-3 shadow">
      <div>
        <strong>{account}</strong>
        <hr />
      </div>
      <div className="d-flex flex-column pb-3 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === account.toLowerCase()
                ? 'align-self-end'
                : 'align-self-start'
            }`}
          >
            <div
              className={`mb-2 ${
                message.sender === account.toLowerCase()
                  ? 'align-items-end'
                  : 'align-items-start'
              } d-flex flex-column`}
            >
              <div>
                {message.sender === account.toLowerCase()
                  ? `You`
                  : message.sender.substring(0, 5) +
                    '...' +
                    message.sender.substring(38)}
              </div>
              <div
                className={`${
                  message.sender === account.toLowerCase()
                    ? 'bg-primary text-white'
                    : 'bg-light text-black'
                } chat-message`}
              >
                {web3.utils.hexToUtf8(message.content)}
              </div>
              <small className="text-secondary">
                {new Date(message.timestamp * 1000).toLocaleString(
                  'en-GB',
                  options
                )}
              </small>
            </div>
          </div>
        ))}
      </div>
      <Form onSubmit={sendMessage}>
        <Form.Group className="d-flex flex-row gap-2">
          <Form.Control
            type="text"
            placeholder="Enter message"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button variant="primary" className="float-right" type="submit">
            Send
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Home
