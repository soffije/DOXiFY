import React from 'react'

import formatMessageDate from '../../../utils/formatMessageDate'

import './ChatMessage.css'

function ChatMessage({ address, message }) {
  return (
    <div
      className={`mb-2 ${
        message.sender.toLowerCase() === address
          ? 'align-items-end own-message'
          : 'align-items-start'
      } d-flex flex-column `}
    >
      <div
        className={`${
          message.sender.toLowerCase() === address
            ? 'bg-primary text-white'
            : 'bg-light text-black'
        } chat-message`}
      >
        {message.fileHash}
      </div>
      <small className="text-secondary">
        {formatMessageDate(message.timestamp)}
      </small>
    </div>
  )
}

export default ChatMessage
