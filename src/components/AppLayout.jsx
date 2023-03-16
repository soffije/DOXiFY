import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import Header from './Header/Header'
import Footer from './Footer/Footer'
import isMetaMaskInstalled from '../helpers/isMetaMaskInstalled'
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

      <section
        className="main"
        style={{
          background: `url("data:image/svg+xml,%3Csvg width='80%' height='auto' fill='none' xmlns='http://www.w3.org/2000/svg%27%3E%3Cpath d='M1920 0H0V3014H1920V0Z' fill='white'/%3E%3Cpath d='M397.29 349.101C69.46 336.806 0 381 0 381V0H1920V313.105C1920 313.105 1853.43 278.438 1556.08 293.573C1258.73 308.709 1209.13 265.848 994.24 276.476C779.35 287.103 725.13 361.368 397.29 349.101Z' fill='url(%23paint0_linear_0_1)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_0_1' x1='144.71' y1='431.481' x2='1150.28' y2='-666.093' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23AE0296'/%3E%3Cstop offset='1' stop-color='%233B68FD'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E") no-repeat`,
          backgroundSize: '100%',
        }}
      >
        <Container className="flex-grow-1">
          <div className="main-content">
            <Outlet />
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
