import { Modal, Button, Form } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

function CheckboxModal() {
  const [isChecked, setIsChecked] = useState(false)
  const [show, setShow] = useState(false)

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked)
  }

  const handleAgree = () => {
    if (isChecked) {
      localStorage.setItem('agreedToTerms', true)
      setShow(false)
    }
  }

  useEffect(() => {
    const agreed = localStorage.getItem('agreedToTerms')
    if (!agreed) {
      setShow(true)
    }
  }, [])

  return (
    <Modal show={show} size="lg" centered>
      <Modal.Header>
        <Modal.Title>License agreement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Welcome to DOXiFY decentralized chat! Before starting communication,
          please read this user agreement. We are not responsible for the
          content you post in the chat. You are fully responsible for your
          messages and their consequences. We are not responsible for any damage
          that may result from the use of our chat. We do not support the use of
          our chat for illegal purposes. We make the best use of modern
          technology and security measures to ensure that your personal
          information is protected from unauthorized access, use or disclosure.
          However, we strongly recommend that all users of our chat take
          additional security measures when using the chat, such as using
          non-obvious local user nicknames, not sharing personal information
          with third parties, and not opening suspicious links or files from
          unknown users. We do not collect or store users' personal information
          without their express consent. We collect only the information that is
          necessary to ensure the functioning of the chat. We are not
          responsible for leakage or loss of your personal information that may
          occur as a result of misuse of the chat or in connection with the
          violation of the rules of our chat by other users. If you discover a
          security breach or leak of your personal information, please contact
          us immediately so we can take the necessary steps to resolve the
          issue. We strongly recommend that all users of our chat be careful and
          careful when communicating with other users. We are not responsible
          for any damages that may arise as a result of communication in our
          chat. You agree not to use our chat to spread viruses, malware or any
          other material that could harm our network or other users. In case of
          disputes related to the use of the chat, we will try to resolve them
          fairly and objectively. However, we do not guarantee full resolution
          of disputes. We do not guarantee the uninterrupted operation of our
          chat and are not responsible for temporary or permanent problems
          associated with its functioning. We will work on improving chat and
          troubleshooting when possible. We do not recommend using our chat for
          advertising or marketing purposes. If you would like to offer your
          services or products, please contact us to discuss possible
          cooperation options. By using our chat, you agree to be bound by all
          the terms and conditions of this user agreement, as well as applicable
          law. If you do not agree with any of the rules or terms of this user
          agreement, please do not use our chat. We reserve the right to change
          this user agreement at any time without prior notice. We welcome
          constructive criticism and welcome suggestions to improve our app. If
          you have any questions or concerns regarding the use of our chat,
          please contact us via the contact form on our website. We will be
          happy to help you at any time! Thank you for using DOXiFY! We hope you
          find it useful and enjoyable to chat with.
        </p>
        <Form.Check
          type="checkbox"
          label="I agree"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAgree} disabled={!isChecked}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CheckboxModal
