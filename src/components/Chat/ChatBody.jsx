import React from 'react'

import { Form, Button } from 'react-bootstrap'

function ChatBody() {
  return (
    <>
      <div className="col-8 d-flex flex-column pb-3 overflow-auto">
        Chatbody
        {/* {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === account.toLowerCase()
                ? 'align-self-end'
                : 'align-self-start'
            }`}
          >
            <div
              className={`mb-2 ${
                message.sender === account.toLowerCase()
                  ? 'align-items-end'
                  : 'align-items-start'
              } d-flex flex-column`}
            >
              <div>
                {message.sender === account.toLowerCase()
                  ? `You`
                  : message.sender.substring(0, 5) +
                    '...' +
                    message.sender.substring(38)}
              </div>
              <div
                className={`${
                  message.sender === account.toLowerCase()
                    ? 'bg-primary text-white'
                    : 'bg-light text-black'
                } chat-message`}
              >
                {web3.utils.hexToUtf8(message.content)}
              </div>
              <small className="text-secondary">
                {new Date(message.timestamp * 1000).toLocaleString(
                  'en-GB',
                  options
                )}
              </small>
            </div>
          </div>
        ))} */}
      </div>
      {/* <Form onSubmit={sendMessage}>
        <Form.Group className="d-flex flex-row gap-2">
          <Form.Control
            type="text"
            placeholder="Enter message"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button variant="primary" className="float-right" type="submit">
            Send
          </Button>
        </Form.Group>
      </Form> */}
    </>
  )
}

export default ChatBody
