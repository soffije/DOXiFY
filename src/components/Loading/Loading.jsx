import React, { useEffect } from 'react'

import './Loading.css'

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div class="spinner">
        <span>D</span>
        <span>O</span>
        <span>X</span>
        <span>i</span>
        <span>F</span>
        <span>Y</span>
      </div>
    </div>
  )
}

export default Loading
