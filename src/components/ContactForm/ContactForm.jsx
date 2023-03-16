import React, { useState } from 'react'
import { Form, FloatingLabel, Button, Toast } from 'react-bootstrap'
import ToastComponent from '../ToastComponent/toastComponent'

function ContactForm() {
  const MIN_NAME_LENGTH = 2

  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    questions: '',
  })

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const validateField = (fieldName, value) => {
    let errorMessage = ''
    switch (fieldName) {
      case 'firstName':
        if (!value) {
          errorMessage = 'Please enter your first name.'
        }
        break
      case 'lastName':
        if (!value) {
          errorMessage = 'Please enter your last name.'
        }
        break
      case 'email':
        if (!value) {
          errorMessage = 'Please enter your email address.'
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address.'
          }
        }
        break
      default:
        break
    }

    return errorMessage
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const errors = { ...formErrors }

    if (name === 'firstName' && value.length < MIN_NAME_LENGTH) {
      errors.firstName = `First name must be at least ${MIN_NAME_LENGTH} characters long`
    } else if (name === 'lastName' && value.length < MIN_NAME_LENGTH) {
      errors.lastName = `Last name must be at least ${MIN_NAME_LENGTH} characters long`
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.email = 'Invalid email address'
    } else {
      errors[name] = ''
    }

    setFormErrors(errors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key])
      if (errorMessage) {
        errors[key] = errorMessage
        setShow(true)
        setMessage('error')
      }
    })
    setFormErrors(errors)
    const isFormValid = Object.keys(errors).every((key) => errors[key] === '')
    if (isFormValid) {
      console.log(formData)
      setShow(true)
      setMessage('Complited')
    }
  }
  return (
    <>
      {' '}
      <ToastComponent
        show={show}
        setShow={setShow}
        setMessage={setMessage}
        message={message}
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Floating>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              isInvalid={!!formErrors.firstName}
            />
            <Form.Label>First name</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formErrors.firstName}
            </Form.Control.Feedback>
          </Form.Floating>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Floating>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              isInvalid={!!formErrors.lastName}
            />
            <Form.Label>Last name</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formErrors.lastName}
            </Form.Control.Feedback>
          </Form.Floating>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Floating>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              isInvalid={!!formErrors.email}
            />
            <Form.Label>Email address</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Floating>
        </Form.Group>

        <Form.Group className="mb-4">
          <FloatingLabel label="Questions">
            <Form.Control
              as="textarea"
              placeholder="Leave your questions here"
              style={{ height: '225px' }}
              name="questions"
              value={formData.questions}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="send-button">
            Send message
          </Button>
        </div>
      </Form>
    </>
  )
}

export default ContactForm
