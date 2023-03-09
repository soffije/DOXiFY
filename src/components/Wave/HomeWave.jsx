import React from 'react'

import './Wave.css'

function HomeWawe() {
  return (
    <div className="wave-container">
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="99%" y1="40%" x2="1%" y2="60%">
            <stop offset="5%" stopColor="#ae0296"></stop>
            <stop offset="95%" stopColor="#3b68fd"></stop>
          </linearGradient>
        </defs>
        <path
          d="M0,224L48,234.7C96,245,192,267,288,234.7C384,203,480,117,576,106.7C672,96,768,160,864,160C960,160,1056,96,1152,96C1248,96,1344,160,1392,192L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="1"
        ></path>
      </svg>
    </div>
  )
}

export default HomeWawe
