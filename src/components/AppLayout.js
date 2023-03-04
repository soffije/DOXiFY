import { Outlet } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import Header from './Header/Header'
import Footer from './Footer/Footer'
import WaveComponent from './Wave/Wave'

export default function AppLayout() {
  return (
    <>
      <Header />

      <section
        className="main"
        style={{
          background: `url("data:image/svg+xml,%3Csvg width='auto' height='200%' viewBox='0 0 1920 1080' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1920 0H0V1080H1920V0Z' fill='white'/%3E%3Cpath d='M397.29 628.12C69.46 606 0 685.51 0 685.51V0.0500031H1920V563.36C1920 563.36 1853.43 500.99 1556.08 528.22C1258.73 555.45 1209.13 478.34 994.24 497.46C779.35 516.58 725.13 650.19 397.29 628.12Z' fill='url(%23paint0_linear_0_1)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_0_1' x1='144.71' y1='776.33' x2='1755.42' y2='-200.87' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23AE0296'/%3E%3Cstop offset='1' stop-color='%233B68FD'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E") no-repeat`,
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
