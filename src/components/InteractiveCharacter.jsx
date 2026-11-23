import React, { useEffect, useRef, useState, useCallback } from 'react'

const TOTAL_PERIMETER_FRAMES = 64
const DEAD_ZONE = 0.12 // Dead zone threshold around center
const LERP_FACTOR = 0.12 // Coordinate interpolation speed
const ANGLE_LERP_FACTOR = 0.14 // Angle interpolation speed

export default function InteractiveCharacter({ heroRef }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  // Images cache
  const centerImageRef = useRef(null)
  const perimeterImagesRef = useRef([])
  const upImagesRef = useRef([])

  const [isLoaded, setIsLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)

  // Motion physics state
  const targetCoordRef = useRef({ x: 0, y: 0 })
  const smoothCoordRef = useRef({ x: 0, y: 0 })
  const smoothAngleRef = useRef(-Math.PI / 2) // Start facing forward/up
  const smoothUpIndexRef = useRef(0)
  const lastDrawnFrameRef = useRef(null)
  const animationFrameIdRef = useRef(null)

  // Preload all frames on mount and trigger GPU decode
  useEffect(() => {
    let isCancelled = false
    const totalToLoad = 1 + TOTAL_PERIMETER_FRAMES + 7
    let loadedCount = 0

    const onFrameReady = (img) => {
      loadedCount++
      if (!isCancelled) {
        setLoadProgress(Math.round((loadedCount / totalToLoad) * 100))
        if (loadedCount >= totalToLoad) {
          setIsLoaded(true)
        }
      }
    }

    // 1. Center neutral frame
    const centerImg = new Image()
    centerImg.src = '/character-frames/center.webp'
    centerImg.onload = () => {
      if (centerImg.decode) {
        centerImg.decode().then(() => onFrameReady(centerImg)).catch(() => onFrameReady(centerImg))
      } else {
        onFrameReady(centerImg)
      }
    }
    centerImg.onerror = () => {
      centerImg.src = '/character-frames/center.jpg'
      centerImg.onload = () => onFrameReady(centerImg)
    }
    centerImageRef.current = centerImg

    // 2. 64 Perimeter directional frames
    const perimImgs = []
    for (let i = 0; i < TOTAL_PERIMETER_FRAMES; i++) {
      const img = new Image()
      const padded = i < 10 ? `0${i}` : `${i}`
      img.src = `/character-frames/dir_${padded}.webp`
      img.onload = () => {
        if (img.decode) {
          img.decode().then(() => onFrameReady(img)).catch(() => onFrameReady(img))
        } else {
          onFrameReady(img)
        }
      }
      perimImgs.push(img)
    }
    perimeterImagesRef.current = perimImgs

    // 3. Vertical glance frames (Center to UP)
    const upImgs = []
    for (let i = 0; i < 7; i++) {
      const img = new Image()
      img.src = `/character-frames/up_0${i}.webp`
      img.onload = () => {
        if (img.decode) {
          img.decode().then(() => onFrameReady(img)).catch(() => onFrameReady(img))
        } else {
          onFrameReady(img)
        }
      }
      upImgs.push(img)
    }
    upImagesRef.current = upImgs

    return () => {
      isCancelled = true
    }
  }, [])

  // Pointer position calculation relative to character's face in the hero
  const handlePointerMove = useCallback((clientX, clientY) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    // Optical face center is ~40% down from the top of the character container
    const faceCenterX = rect.left + rect.width / 2
    const faceCenterY = rect.top + rect.height * 0.40

    // Dynamic responsiveness based on window size
    const maxRadiusX = Math.max(300, window.innerWidth * 0.42)
    const maxRadiusY = Math.max(260, window.innerHeight * 0.38)

    const rawDx = (clientX - faceCenterX) / maxRadiusX
    const rawDy = (clientY - faceCenterY) / maxRadiusY

    const dist = Math.hypot(rawDx, rawDy)
    if (dist <= DEAD_ZONE) {
      // In dead zone: neutral front
      targetCoordRef.current = { x: 0, y: 0 }
    } else {
      const scale = dist > 1.25 ? 1.25 / dist : 1
      targetCoordRef.current = {
        x: rawDx * scale,
        y: rawDy * scale
      }
    }
  }, [])

  const handlePointerReset = useCallback(() => {
    targetCoordRef.current = { x: 0, y: 0 }
  }, [])

  // Attach tracking listeners to the hero container
  useEffect(() => {
    const heroEl = heroRef?.current || document.querySelector('.cinematic-hero') || document.querySelector('.hero-section')
    if (!heroEl) return

    const onMouseMove = (e) => {
      handlePointerMove(e.clientX, e.clientY)
    }

    const onMouseLeave = () => {
      handlePointerReset()
    }

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const onTouchEnd = () => {
      handlePointerReset()
    }

    heroEl.addEventListener('mousemove', onMouseMove, { passive: true })
    heroEl.addEventListener('mouseleave', onMouseLeave)
    heroEl.addEventListener('touchmove', onTouchMove, { passive: true })
    heroEl.addEventListener('touchend', onTouchEnd)
    heroEl.addEventListener('touchcancel', onTouchEnd)

    return () => {
      heroEl.removeEventListener('mousemove', onMouseMove)
      heroEl.removeEventListener('mouseleave', onMouseLeave)
      heroEl.removeEventListener('touchmove', onTouchMove)
      heroEl.removeEventListener('touchend', onTouchEnd)
      heroEl.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [heroRef, handlePointerMove, handlePointerReset])

  // Continuous animation and render loop with requestAnimationFrame
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let isRunning = true

    const render = () => {
      if (!isRunning) return

      const target = targetCoordRef.current
      const smooth = smoothCoordRef.current

      // Eased interpolation for smooth continuous movement
      smooth.x += (target.x - smooth.x) * LERP_FACTOR
      smooth.y += (target.y - smooth.y) * LERP_FACTOR

      const currentDist = Math.hypot(smooth.x, smooth.y)

      let frameToDraw = centerImageRef.current

      if (currentDist < DEAD_ZONE) {
        // Within dead zone: Neutral front-facing frame
        if (smoothUpIndexRef.current > 0.05) {
          smoothUpIndexRef.current += (0 - smoothUpIndexRef.current) * LERP_FACTOR
          const idx = Math.min(6, Math.max(0, Math.round(smoothUpIndexRef.current)))
          frameToDraw = upImagesRef.current[idx] || centerImageRef.current
        } else {
          smoothUpIndexRef.current = 0
          frameToDraw = centerImageRef.current
        }
      } else {
        // Outside dead zone: compute continuous angle and shortest angular interpolation
        const targetAngle = Math.atan2(smooth.y, smooth.x) // -PI to PI (UP is -PI/2)

        // Shortest angular difference wrapping
        let angleDiff = ((targetAngle - smoothAngleRef.current + Math.PI) % (2 * Math.PI)) - Math.PI
        smoothAngleRef.current += angleDiff * ANGLE_LERP_FACTOR

        // Check if looking straight upward
        const isUpward = Math.abs(smoothAngleRef.current - (-Math.PI / 2)) < 0.38 ||
                         Math.abs(smoothAngleRef.current - (3 * Math.PI / 2)) < 0.38

        if (isUpward && Math.abs(smooth.x) < 0.22) {
          // Pure upward glance: smooth progressive vertical index
          const upProgress = Math.min(1, Math.max(0, (currentDist - DEAD_ZONE) / (1 - DEAD_ZONE)))
          const targetUpIndex = upProgress * 6
          smoothUpIndexRef.current += (targetUpIndex - smoothUpIndexRef.current) * LERP_FACTOR
          const idx = Math.min(6, Math.max(0, Math.round(smoothUpIndexRef.current)))
          frameToDraw = upImagesRef.current[idx] || centerImageRef.current
        } else {
          // Perimeter directional glance
          smoothUpIndexRef.current = 0
          // Convert smoothAngle to clockwise phi in [0, 2*PI) where UP is phi = 0
          let phi = (smoothAngleRef.current + Math.PI / 2) % (2 * Math.PI)
          if (phi < 0) phi += 2 * Math.PI

          // Continuous floating-point index around 64 frames
          const continuousIndex = (phi / (2 * Math.PI)) * TOTAL_PERIMETER_FRAMES
          const frameIndex = Math.round(continuousIndex) % TOTAL_PERIMETER_FRAMES

          frameToDraw = perimeterImagesRef.current[frameIndex] || centerImageRef.current
        }
      }

      // Draw active frame only if changed or canvas uninitialized (avoids redundant rendering when stationary)
      if (frameToDraw && frameToDraw.complete && frameToDraw.naturalWidth > 0) {
        if (canvas.width !== frameToDraw.naturalWidth || canvas.height !== frameToDraw.naturalHeight) {
          canvas.width = frameToDraw.naturalWidth
          canvas.height = frameToDraw.naturalHeight
          lastDrawnFrameRef.current = null
        }

        if (lastDrawnFrameRef.current !== frameToDraw) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(frameToDraw, 0, 0, canvas.width, canvas.height)
          lastDrawnFrameRef.current = frameToDraw
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(render)
    }

    animationFrameIdRef.current = requestAnimationFrame(render)

    return () => {
      isRunning = false
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [isLoaded])

  return (
    <div className="character-cinematic-container" ref={containerRef}>
      {/* Fallback image before frames are fully ready */}
      <img
        src="/character-frames/center.webp"
        alt="Pritika Character Avatar"
        className={`character-fallback-img ${isLoaded ? 'loaded' : ''}`}
        style={{
          display: isLoaded ? 'none' : 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Seamless canvas without borders or card container */}
      <canvas
        ref={canvasRef}
        className="character-canvas-seamless"
        style={{
          display: isLoaded ? 'block' : 'none',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        aria-label="Interactive character looking towards your cursor"
      />

      {/* Subtle indicator showing cursor interactivity */}
      <div className="character-interaction-prompt">
        <span className="prompt-dot"></span>
        <span>Interactive Gaze Active • Move Cursor</span>
      </div>
    </div>
  )
}
