import { Outlet } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import Header from './Header/Header'
import Footer from './Footer/Footer'
import WaveComponent from './Wave/Wave'

export default function AppLayout() {
  return (
    <>
      <Header />
      <Container className="flex-grow-1">
        <WaveComponent />
        <div className="main-content">
          <Outlet />
        </div>
      </Container>
      <Footer />
    </>
  )
}
