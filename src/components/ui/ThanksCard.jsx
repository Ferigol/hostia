import { useEffect, useRef, useState } from 'react'

const identityMatrix =
  "1, 0, 0, 0, " +
  "0, 1, 0, 0, " +
  "0, 0, 1, 0, " +
  "0, 0, 0, 1"

const maxRotate = 0.25
const minRotate = -0.25
const maxScale = 1
const minScale = 0.97

const W = 440
const H = 84

const overlayColors = [
  '#f86943',
  '#f86943',
  '#ffffff',
  '#5010f5',
  '#5010f5',
  '#f86943',
  '#ffffff',
  '#5010f5',
  '#f86943',
  '#ffffff',
]

export default function ThanksCard({ text }) {
  const ref = useRef(null)
  const [firstOverlayPosition, setFirstOverlayPosition] = useState(0)
  const [matrix, setMatrix] = useState(identityMatrix)
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix)
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState(true)
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState(false)
  const [isTimeoutFinished, setIsTimeoutFinished] = useState(false)
  const enterTimeout = useRef(null)
  const leaveTimeout1 = useRef(null)
  const leaveTimeout2 = useRef(null)
  const leaveTimeout3 = useRef(null)

  const getDimensions = () => {
    const rect = ref.current?.getBoundingClientRect() || {}
    return { left: rect.left || 0, right: rect.right || 0, top: rect.top || 0, bottom: rect.bottom || 0 }
  }

  const getMatrix = (clientX, clientY) => {
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2
    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xCenter - clientX) / (xCenter - left),
      maxScale - (maxScale - minScale) * Math.abs(yCenter - clientY) / (yCenter - top),
      maxScale - (maxScale - minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY)) / (xCenter - left + yCenter - top),
    ]
    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / yCenter - (xCenter - clientX) / xCenter),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left),
      x3: 0, y0: 0,
      y2: maxRotate - (maxRotate - minRotate) * (top - clientY) / (top - bottom),
      y3: 0,
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left)),
      z1: 0.2 - (0.2 + 0.6) * (top - clientY) / (top - bottom),
      z3: 0,
    }
    return `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`
  }

  const getOppositeMatrix = (_matrix, clientY, isEnter) => {
    const { top, bottom } = getDimensions()
    const oppositeY = bottom - clientY + top
    const weakening = isEnter ? 0.7 : 4
    const multiplier = isEnter ? -1 : 1
    return _matrix.split(', ').map((item, i) => {
      if (i === 2 || i === 4 || i === 8) return -parseFloat(item) * multiplier / weakening
      if (i === 0 || i === 5 || i === 10) return '1'
      if (i === 6) return multiplier * (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening
      if (i === 9) return (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening
      return item
    }).join(', ')
  }

  const handleMouseEnter = (e) => {
    if (leaveTimeout1.current) clearTimeout(leaveTimeout1.current)
    if (leaveTimeout2.current) clearTimeout(leaveTimeout2.current)
    if (leaveTimeout3.current) clearTimeout(leaveTimeout3.current)
    setDisableOverlayAnimation(true)
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2
    setDisableInOutOverlayAnimation(false)
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5)
    }))
    const mat = getMatrix(e.clientX, e.clientY)
    setMatrix(getOppositeMatrix(mat, e.clientY, true))
    setIsTimeoutFinished(false)
    setTimeout(() => setIsTimeoutFinished(true), 200)
  }

  const handleMouseMove = (e) => {
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2
    setTimeout(() => setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5), 150)
    if (isTimeoutFinished) setCurrentMatrix(getMatrix(e.clientX, e.clientY))
  }

  const handleMouseLeave = (e) => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current)
    const opp = getOppositeMatrix(matrix, e.clientY)
    setCurrentMatrix(opp)
    setTimeout(() => setCurrentMatrix(identityMatrix), 200)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setDisableInOutOverlayAnimation(false)
      leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150)
      leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300)
      leaveTimeout3.current = setTimeout(() => {
        setDisableOverlayAnimation(false)
        setDisableInOutOverlayAnimation(true)
      }, 500)
    }))
  }

  useEffect(() => {
    if (isTimeoutFinished) setMatrix(currentMatrix)
  }, [currentMatrix, isTimeoutFinished])

  const overlayAnimations = [...Array(10).keys()].map(e =>
    `@keyframes tcOverlay${e + 1} {
      0%   { transform: rotate(${e * 10}deg); }
      50%  { transform: rotate(${(e + 1) * 10}deg); }
      100% { transform: rotate(${e * 10}deg); }
    }`
  ).join(' ')

  return (
    <div
      ref={ref}
      style={{ display: 'inline-block', cursor: 'default' }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <style>{overlayAnimations}</style>
      <div style={{ transform: `perspective(700px) matrix3d(${matrix})`, transformOrigin: 'center center', transition: 'transform 200ms ease-out' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
          <defs>
            <filter id="tcBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <mask id="tcMask">
              <rect width={W} height={H} fill="white" rx="12" />
            </mask>
          </defs>
          <rect width={W} height={H} rx="12" fill="#dddddd" />
          <rect x="1" y="1" width={W - 2} height={H - 2} rx="11" fill="transparent" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <g transform="translate(37, 25) scale(0.27)" fill="#666666">
            <rect x="59.91" y="47.15" width="20.09" height="78.59" />
            <polygon points="20.09 31.29 20.09 -0.08 0 -0.08 0 125.74 20.09 125.74 20.09 47.15 59.91 47.15 59.91 31.29 20.09 31.29" />
          </g>
          <line x1="83" y1="18" x2="83" y2="66" stroke="#666666" strokeWidth="2.5" opacity="0.35" />
          <text
            fontFamily="Tomorrow, sans-serif"
            fontSize="21"
            fontWeight="600"
            fill="#666666"
            x={83 + (W - 83) / 2}
            y={H / 2 + 8}
            textAnchor="middle"
            letterSpacing="0.04em"
          >
            {text}
          </text>
          <g style={{ mixBlendMode: 'overlay' }} mask="url(#tcMask)">
            {overlayColors.map((color, i) => (
              <g
                key={i}
                style={{
                  transform: `rotate(${firstOverlayPosition + i * 10}deg)`,
                  transformOrigin: 'center center',
                  transition: !disableInOutOverlayAnimation ? 'transform 200ms ease-out' : 'none',
                  animation: disableOverlayAnimation ? 'none' : `tcOverlay${i + 1} 5s infinite`,
                  willChange: 'transform',
                }}
              >
                <polygon points={`0,0 ${W},${H} ${W},0 0,${H}`} fill={color} filter="url(#tcBlur)" opacity="0.5" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
