import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { useNavigate, useLocation } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import home from '../../assets/Home.png'
import './Home.css'
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
  const [isAutorized, setIsAutorized] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        // Get the current account
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        if (accounts[0]) {
          setIsAutorized(true)
          // Load the contract
          const contract = new web3.eth.Contract(abi, contractAddress)
          setContract(contract)
          // Load the existing messages
          const messageCount = await contract.methods.getMessages().call()
          console.log(messageCount)
          setMessages(messageCount)
        } else {
          navigate('/login')
        }
      } else {
        isAutorized(false)
      }
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
  if (!isAutorized) {
    return (
      <div className="my-5">
        <div className="row">
          <div className="col-12 col-lg-7 d-flex flex-column">
            <h1 className="home-title mb-2 text-white">DOXiFY</h1>
            <h5 className=" mb-3 text-white">
              Fully secure decentralized communication <br></br>tool based on
              state-of-the-art security technology
            </h5>
            <Form>
              <div>
                <button
                  type="button"
                  id="loginbutton"
                  className="btn btn-block btn-primary mb-3"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
          <div className="col-12 col-lg-5">
            <img src={home} alt="Home" className="home-image" />
          </div>
        </div>
      </div>
    )
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
