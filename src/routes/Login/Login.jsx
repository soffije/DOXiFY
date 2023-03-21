import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import './Login.css'

import Loader from '../../components/Loader/Loader'
import MetaMaskLogo from '../../components/MetaMaskLogo/MetaMaskLogo'

import {
  connectUser,
  getUserIsConnected,
  getUserLoading,
} from '../../features/user/userSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userLoading = useSelector(getUserLoading)
  const isUserConnected = useSelector(getUserIsConnected)

  useEffect(() => {
    if (isUserConnected) {
      navigate('/')
    }
  }, [isUserConnected])

  const onConnectButtonClick = () => {
    dispatch(connectUser())
  }

  const onGoBackButtonClick = () => {
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
            <Loader
              userLoading={userLoading}
              onClick={onConnectButtonClick}
              buttonText="Login to doxify"
            />
            <button
              type="button"
              className="btn btn-block btn-light mt-2"
              onClick={onGoBackButtonClick}
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
