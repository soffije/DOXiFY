import React from 'react'

import formatMessageDate from '../../../helpers/formatMessageDate'

function ChatMessage({ web3, address, message }) {
  return (
    <div
      className={`mb-2 ${
        message.sender.toLowerCase() === address
          ? 'align-items-end'
          : 'align-items-start'
      } d-flex flex-column`}
    >
      <div>
        {message.sender.toLowerCase() === address
          ? `You`
          : message.sender.substring(0, 5) +
            '...' +
            message.sender.substring(38)}
      </div>
      <div
        className={`${
          message.sender.toLowerCase() === address
            ? 'bg-primary text-white'
            : 'bg-light text-black'
        } chat-message`}
      >
        {web3.utils.hexToUtf8(message.content)}
      </div>
      <small className="text-secondary">
        {formatMessageDate(message.timestamp)}
      </small>
    </div>
  )
}

export default ChatMessage
