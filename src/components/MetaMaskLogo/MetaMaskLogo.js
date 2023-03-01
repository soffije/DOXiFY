import React, { useRef, useEffect } from 'react'

import ModelViewer from '@metamask/logo'

function MetaMaskLogo() {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)

  useEffect(() => {
    const viewer = ModelViewer({
      pxNotRatio: true,
      width: 340,
      height: 260,
      followMouse: false,
      slowDrift: false,
    })

    containerRef.current.appendChild(viewer.container)
    viewer.lookAt({
      x: 100,
      y: 100,
    })
    viewer.setFollowMouse(true)

    viewerRef.current = viewer

    return () => {
      viewer.stopAnimation()
      if (containerRef.current) {
        containerRef.current.removeChild(viewer.container)
      }
    }
  }, [])

  return <div ref={containerRef} className="pb-3" />
}

export default MetaMaskLogo
