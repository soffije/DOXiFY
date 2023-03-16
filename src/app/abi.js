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
