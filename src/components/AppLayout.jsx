import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import Header from './Header/Header'
import Footer from './Footer/Footer'
import isMetaMaskInstalled from '../utils/isMetaMaskInstalled'
import { isUserConnected } from '../features/user/userSlice'

export default function AppLayout() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isMetaMaskInstalled()) return

    dispatch(isUserConnected())

    window.ethereum.on('accountsChanged', () => {
      dispatch(isUserConnected())
    })
  }, [])

  return (
    <>
      <Header />
      <section className="main-section">
        <Container className="flex-grow-1">
          <div className="main-content py-4">
            <Outlet />
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}
