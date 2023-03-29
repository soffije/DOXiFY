import React from 'react'

import formatMessageDate from '../../../helpers/formatMessageDate'

import convertAddress from '../../../helpers/convertAddress'

function ChatMessage({ address, message }) {
  return (
    <div
      className={`mb-2 ${
        convertAddress(message.sender) === address
          ? 'align-items-end'
          : 'align-items-start'
      } d-flex flex-column`}
    >
      <div
        className={`${
          convertAddress(message.sender) === address
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
