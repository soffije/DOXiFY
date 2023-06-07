import React from 'react'
import { Toast } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer'
import './Toast.css'

function ToastComponent({ show, setShow, setMessage, message, variant }) {
  const toastClasses = `Toast ${variant}`
  return (
    <div aria-live="polite" aria-atomic="true">
      <ToastContainer position="top-end" className="p-3">
        <Toast
          className={toastClasses}
          onClose={() => (setShow(false), setMessage(message))}
          show={show}
          delay={8000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Notification</strong>
          </Toast.Header>

          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default ToastComponent
