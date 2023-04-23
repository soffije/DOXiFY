import React, { createContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { useSelector, useDispatch } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import abi from './abi'

import {
  handleIncomingFriendRequestEvent,
  handleIncomingMessageEvent,
  handleRejectingFriendRequestEvent,
  subscribeUser,
} from '../features/chat/profileSlice'
import { getUserAddress } from '../features/user/userSlice'

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.REACT_APP_PROVIDER)
)
const client = new W3CWebSocket(process.env.REACT_APP_PROVIDER)
const contract = new web3.eth.Contract(
  abi,
  process.env.REACT_APP_CONTRACT_ADDRESS
)

export const WebSocketContext = createContext()

function WebSocketProvider({ Chat }) {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (isConnected) return

    client.onopen = () => {
      setIsConnected(true)

      dispatch(subscribeUser({ web3, contract, address }))

      contract.events
        .MessageSent({
          filter: {
            recipient: address,
          },
        })
        .on('data', (event) => {
          dispatch(handleIncomingMessageEvent(event))
        })
        .on('error', console.error)

      contract.events
        .FriendRequestSent({
          filter: {
            recipient: address,
          },
        })
        .on('data', (event) => {
          dispatch(handleIncomingFriendRequestEvent(event))
        })
        .on('error', console.error)

      contract.events
        .FriendRequestReject({
          filter: {
            recipient: address,
          },
        })
        .on('data', (event) => {
          dispatch(handleRejectingFriendRequestEvent(event))
        })
        .on('error', console.error)
    }

    return () => {
      client.close()
    }
  }, [isConnected, address])

  return (
    <WebSocketContext.Provider value={{ web3, client, contract }}>
      <Chat />
    </WebSocketContext.Provider>
  )
}

export default WebSocketProvider
