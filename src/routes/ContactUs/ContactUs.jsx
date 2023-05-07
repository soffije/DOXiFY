import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'

import React from 'react'

import GenerateModal from '../../components/Modal/GenerateKeys'
import './ContactUs.css'
import contactUsImage from '../../assets/contactUs.png'
import ContactForm from '../../components/ContactForm/ContactForm'
function ContactUs() {
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  return (
    <div className="my-5">
      <div>
        <Button onClick={handleShowModal}>Open Modal</Button>
        <GenerateModal show={showModal} handleClose={handleCloseModal} />
      </div>
      <h1 className="text-center text-white mb-5">Contact us</h1>
      <div className="row">
        <div className="col-12 col-lg-7 d-flex flex-column justify-content-center align-items-center">
          <img
            src={contactUsImage}
            alt="Contact us"
            className="contact-us-image"
          />
          <h5
            className="text-center mb-4 "
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
          >
            If you require assistance, we are more than willing to help you
          </h5>
        </div>
        <div className="col-12 col-lg-5 shadow bg-white rounded p-4">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default ContactUs
