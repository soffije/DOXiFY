import React from 'react'
import { useSelector } from 'react-redux'

import './Home.css'

import Chat from '../../components/Chat/Chat'
import LandingPage from '../../components/LandingPage/LandingPage'

import { getUserAddress, getUserLoading } from '../../features/user/userSlice'

function Home() {
  const address = useSelector(getUserAddress)
  const metaMaskLoading = useSelector(getUserLoading)

  return (
    <>
      {metaMaskLoading === 'pending' ? (
        <div className="spinner-border" role="status"></div>
      ) : address ? (
        <Chat />
      ) : (
        <LandingPage />
      )}
    </>
  )
}

export default Home
