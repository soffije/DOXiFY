import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

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
          <NavLink to="/" className="app-logo" onClick={hideMobileMenu}>
            DOXiFY
          </NavLink>
          <div className="menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="about">About us</NavLink>
            <NavLink togi="https://doxify.gitbook.io/doxify/">
              Documentanion
            </NavLink>
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
        <NavLink
          to="https://doxify.gitbook.io/doxify/"
          onClick={hideMobileMenu}
        >
          Documentanion
        </NavLink>
        <NavLink to="contact" onClick={hideMobileMenu}>
          Contact
        </NavLink>
      </div>
    </header>
  )
}
