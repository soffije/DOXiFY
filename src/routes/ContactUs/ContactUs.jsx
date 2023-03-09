import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

import './ContactUs.css'
import contactUsImage from '../../assets/contactUs.png'

function ContactUs() {
  return (
    <div className="my-5">
      <h1 className="text-center text-white mb-5">Contact us</h1>
      <div className="row">
        <div className="col-12 col-lg-7 d-flex flex-column justify-content-center align-items-center">
          <img
            src={contactUsImage}
            alt="Contact us"
            className="contact-us-image"
          />
          <h5 className="text-center mb-4">
            If you require assistance, we are more than willing to help you
          </h5>
        </div>
        <div className="col-12 col-lg-5 shadow bg-white rounded p-4">
          <Form>
            <Form.Floating className="mb-3">
              <Form.Control type="text" placeholder="Enter name" />
              <label>First name</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control type="text" placeholder="Last name" />
              <label>Last name</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="email"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInputCustom">Email address</label>
            </Form.Floating>
            <FloatingLabel label="Questions" className="mb-4">
              <Form.Control
                as="textarea"
                placeholder="Leave your questions here"
                style={{ height: '225px' }}
              />
            </FloatingLabel>
            <div className="text-center">
              <Button variant="primary" className="send-button">
                Send message
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
