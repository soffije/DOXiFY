import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Web3 from 'web3'
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import ChatBar from './ChatBar/ChatBar'
import ChatBody from './ChatBody/ChatBody'

import abi from '../../app/abi'
import contractAddress from '../../app/contract'
import { subscribeUser } from '../../features/chat/chatSlice'
import { getUserAddress } from '../../features/user/userSlice'
export const ChatContext = createContext()

const WEBSOCKET_URL = 'wss://api.avax-test.network/ext/bc/C/ws'; // URL веб-сокета Avalanche Fuji Testnet

function Chat() {
  const dispatch = useDispatch()
  const address = useSelector(getUserAddress)

  const [chatInstances, setChatInstances] = useState(null);

  useEffect(() => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(WEBSOCKET_URL));
    const contract = new web3.eth.Contract(abi, contractAddress);

    setChatInstances({
      web3: web3,
      contract: contract,
    });

    return () => {
      web3.currentProvider.disconnect();
    }
  }, []);

  useEffect(() => {
    if (chatInstances) {
      const { web3, contract } = chatInstances;

      const client = new W3CWebSocket(WEBSOCKET_URL);
      client.onopen = () => {
        console.log('WebSocket Client Connected');

        contract.events.MessageSent({})
          .on('data', (event) => {
            console.log('Event data:', event.returnValues);
            dispatch(subscribeUser({ web3, contract, address }));
          })
          .on('error', console.error);
      };

      client.onclose = () => {
        console.log('WebSocket Client Disconnected');
      };

      return () => {
        client.close();
      }
    }
  }, [chatInstances, dispatch, address]);

  if (!chatInstances) {
    return null;
  }

  return (
    <div className="row chat-container shadow">
      <ChatContext.Provider value={chatInstances}>
        <ChatBar />
        <ChatBody />
      </ChatContext.Provider>
    </div>
  )
}

export default Chat



