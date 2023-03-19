import React from 'react'
import { Toast } from 'react-bootstrap'

import './Toast.css'

function ToastComponent({ show, setShow, setMessage, message, variant }) {
  const toastClasses = `Toast ${variant}`
  return (
    <Toast
      className={toastClasses}
      onClose={() => (setShow(false), setMessage(message))}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  )
}

export default ToastComponent
