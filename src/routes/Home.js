import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { abi } from '../contract/BlockchainChat-artifact.json'

console.log(abi)

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')

const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8'

const blockchainChat = new web3.eth.Contract(abi, contractAddress)

function Home() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    loadMessages()
  }, [])

  async function loadMessages() {
    const messageList = await blockchainChat.methods.getMessages().call()
    setMessages(messageList)
  }

  async function sendMessage() {
    await blockchainChat.methods
      .sendMessage(message)
      .send({ from: web3.eth.accounts[0] })
    setMessage('')
    loadMessages()
  }

  return (
    <div>
      <h1>Blockchain Chat</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <p>From: {message.sender}</p>
            <p>Content: {message.content}</p>
            <p>
              Timestamp: {new Date(message.timestamp * 1000).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Home
