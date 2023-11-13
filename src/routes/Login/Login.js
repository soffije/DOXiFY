import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import './Login.css'

import MetaMaskLogo from '../../components/MetaMaskLogo/MetaMaskLogo'
import useIsMetaMaskInstalled from '../../helpers/isMetaMaskInstalled'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [account, setAccount] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  // Check if MetaMask is installed
  if (!useIsMetaMaskInstalled) {
    return <div>Please install MetaMask to use this application.</div>
  }
  // Handle connection to MetaMask
  const handleConnect = async () => {
    try {
      // Request access to the user's accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      // Validate the account
      if (!/^(0x){1}[0-9a-fA-F]{40}$/i.test(accounts[0])) {
        throw new Error('Invalid account format.')
      }

      // Set the account state
      setAccount(accounts[0])

      // Clear the error message
      setErrorMsg(null)
      navigate('/')
    } catch (error) {
      console.error(error)

      // Set the error message state
      setErrorMsg('Failed to connect to MetaMask.')
    }
  }

  const handleGoBackButtonClick = () => {
    if (location.state?.from) navigate(-1)
    else navigate('/')
  }

  return (
    <div className="row h-100 d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-6 d-flex justify-content-center py-5">
        <div className="login-container shadow py-5 p-3 px-md-5">
          <h3>Let's get started</h3>
          <p>
            Trusted by millions, MetaMask is a secure wallet making the world of
            web3 accessible to all.
          </p>
          <div className="d-flex flex-column">
            <MetaMaskLogo />
            <button
              type="button"
              className="btn btn-block btn-primary mb-3"
              onClick={handleConnect}
            >
              Login to doxify
            </button>
            <button
              type="button"
              className="btn btn-block btn-light"
              onClick={handleGoBackButtonClick}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
