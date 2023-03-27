import { useState } from 'react'
import { NavLink } from 'react-router-dom'

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
            <img src="logo512.png" className="logo" alt="Logo" />
            DOXiFY
          </NavLink>
          <div className="menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="about">About us</NavLink>
            <NavLink to="documentation">Documentation</NavLink>
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
        <NavLink to="documentation" onClick={hideMobileMenu}>
          Documentanion
        </NavLink>
        <NavLink to="contact" onClick={hideMobileMenu}>
          Contact
        </NavLink>
      </div>
    </header>
  )
}
