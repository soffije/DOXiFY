import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'

function ToastComponent({ show, setShow, setMessage, message }) {
  return (
    <Toast
      className="position-absolute"
      onClose={() => (setShow(false), setMessage(message))}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Contact Form</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  )
}

export default ToastComponent
