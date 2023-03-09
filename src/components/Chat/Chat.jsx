import React, { useState, useEffect } from 'react'
import Web3 from 'web3'

import ChatBar from './ChatBar'
import ChatBody from './ChatBody'

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'chatId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'chatName',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'GroupChatCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'messageType',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'carrentTime',
        type: 'uint256',
      },
    ],
    name: 'MessageSent',
    type: 'event',
  },
  {
    inputs: [],
    name: 'addMe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'removeMe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'messageType',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
    ],
    name: 'sendMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'resipient',
        type: 'address',
      },
    ],
    name: 'allowRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'friendAddress',
        type: 'address',
      },
    ],
    name: 'removeRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'friendAddress',
        type: 'address',
      },
    ],
    name: 'removePending',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFriends',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'friendAddress',
        type: 'address',
      },
    ],
    name: 'addFriend',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'friendAddress',
        type: 'address',
      },
    ],
    name: 'removeFriend',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'friendAddress',
        type: 'address',
      },
    ],
    name: 'isFriend',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'blockedUser',
        type: 'address',
      },
    ],
    name: 'blockUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'unblockedUser',
        type: 'address',
      },
    ],
    name: 'unblockUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'blockedUser',
        type: 'address',
      },
    ],
    name: 'isBlocked',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'getUser',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'selfAddress',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: 'friends',
            type: 'address[]',
          },
          {
            internalType: 'address[]',
            name: 'blocked',
            type: 'address[]',
          },
          {
            internalType: 'address[]',
            name: 'requests',
            type: 'address[]',
          },
          {
            internalType: 'address[]',
            name: 'pending',
            type: 'address[]',
          },
          {
            internalType: 'address[]',
            name: 'groupChat',
            type: 'address[]',
          },
        ],
        internalType: 'struct Chat.User',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
]

function Chat({ account }) {
  const web3 = new Web3('http://localhost:7545')
  const contract = new web3.eth.Contract(
    abi,
    '0xabA36fFCE993671A30AA254372A77Eb5b4215d4a'
  )

  useEffect(() => {
    // const addMe = async () => {
    //   try {
    //     await contract.methods.addMe().send({ from: account, gas: 300000 })
    //   } catch (error) {
    //     console.log('Error', error)
    //   }
    // }
    // addMe()
  }, [])

  return (
    <div className="row chat-container shadow">
      <ChatBar account={account} contract={contract} />
      <ChatBody />
    </div>
  )
}

export default Chat
