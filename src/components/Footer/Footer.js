import React from 'react'

export default function Footer() {
  return (
    <footer className="page-footer font-small mt-auto bg-light">
      <div className="footer-copyright text-center py-3">
        © {new Date().getFullYear()} Copyright: Doxify chat
      </div>
    </footer>
  )
}
