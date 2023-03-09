import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

import './NotFound.css'

import notFound from '../../assets/notFound.png'

function NotFound() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoBackButtonClick = () => {
    if (location.state?.from) navigate(-1)
    else navigate('/')
  }
  return (
    <div className="d-flex justify-content-center align-items-center flex-column my-5">
      <img src={notFound} alt="Page not found" className="img-not-found" />
      <h5 className="mt-5 mb-4">You're in the wrong place, can we go back?</h5>
      <Button variant="primary" onClick={handleGoBackButtonClick}>
        Go back home
      </Button>
    </div>
  )
}

export default NotFound
