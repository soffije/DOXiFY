import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

import './Header.css'

export default function Header() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)

  const hideMobileMenu = () => {
    if (isMobileMenuActive) setIsMobileMenuActive(!isMobileMenuActive)
  }

  return (
    <header className="border-bottom">
      <nav className={isMobileMenuActive ? 'mobile-view' : ''}>
        <div className="nav-container">
          <NavLink
            to="/"
            className="app-logo d-flex align-items-center"
            onClick={hideMobileMenu}
          >
            <Navbar.Brand className="logo">
              <img src="/Logo.svg" width="40" height="40" />
            </Navbar.Brand>
            DOXiFY
          </NavLink>
          <div className="menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="about">About us</NavLink>
            <Link to="https://doxify.gitbook.io/doxify/">Documentanion</Link>
            <NavLink to="contact">Contact</NavLink>
          </div>
          <button
            className={`hamburger ${isMobileMenuActive ? 'is-active' : ''}`}
            onClick={() => {
              setIsMobileMenuActive(!isMobileMenuActive)
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuActive ? 'is-open' : ''}`}>
        <NavLink to="/" onClick={hideMobileMenu}>
          Home
        </NavLink>
        <NavLink to="about" onClick={hideMobileMenu}>
          About us
        </NavLink>
        <Link to="https://doxify.gitbook.io/doxify/" onClick={hideMobileMenu}>
          Documentanion
        </Link>
        <NavLink to="contact" onClick={hideMobileMenu}>
          Contact
        </NavLink>
      </div>
    </header>
  )
}
