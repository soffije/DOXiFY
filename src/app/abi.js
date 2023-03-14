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
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'content',
        type: 'bytes32',
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
        internalType: 'bytes32',
        name: 'data',
        type: 'bytes32',
      },
    ],
    name: 'bytes32ToString',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
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
            internalType: 'bytes32',
            name: 'content',
            type: 'bytes32',
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
  },
]

export default abi
