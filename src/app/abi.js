const abi = [
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
    inputs: [],
    name: 'addMe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
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
        name: 'content',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'fileHash',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'MessageSent',
    type: 'event',
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
        name: 'content',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'fileHash',
        type: 'string',
      },
    ],
    name: 'sendMessage',
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
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'getMessageFileHash',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'getMessages',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'fileHash',
            type: 'string',
          },
        ],
        internalType: 'struct Chat.Message[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
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
        ],
        internalType: 'struct Chat.User',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
export default abi