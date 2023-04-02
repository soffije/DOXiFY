import React from 'react'

import ChatBar from './ChatBar/ChatBar'
import ChatBody from './ChatBody/ChatBody'

function Chat() {
  return (
    <div className="row chat-container shadow">
      <ChatBar />
      <ChatBody />
    </div>
  )
}

export default Chat
