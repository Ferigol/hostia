import { useRef, useState, useEffect } from 'react'
import { useMotionValue, useSpring, motion } from 'framer-motion'

const SPRING         = { stiffness: 80, damping: 22, mass: 0.8 }
const SPRING_SOFT    = { stiffness: 60, damping: 20, mass: 1.0 }
const SPRING_OPACITY = { stiffness: 35, damping: 18, mass: 1.3 }

const Card = ({ rotate, scale, children }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
    }}
    className="relative h-[24rem] md:h-[33rem] w-full border border-white/15 bg-[#111111] rounded-[30px] overflow-hidden"
  >
    {children}
  </motion.div>
)

function getProgress(el) {
  const rect  = el.getBoundingClientRect()
  const vh    = window.innerHeight
  const total = rect.height + vh
  return Math.max(0, Math.min(1, (vh - rect.top) / total))
}

export const ContainerTextScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const rotateRaw      = useMotionValue(-20)
  const scaleRaw       = useMotionValue(0.9)
  const translateYRaw  = useMotionValue(100)
  const textYRaw       = useMotionValue(100)
  const textScaleRaw   = useMotionValue(0.8)
  const opacityRaw     = useMotionValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const p     = getProgress(el)
      const minSc = isMobile ? 0.8 : 0.9

      // ── Opacidad: rango ampliado para que la disolución sea visible ──
      let o
      if      (p < 0.35) o = p / 0.35
      else if (p < 0.75) o = 1
      else               o = (1 - p) / 0.25
      opacityRaw.set(Math.max(0, Math.min(1, o)))

      // ── Tilt rotateX: -20° → 0° → -20° ──
      let r
      if      (p < 0.25) r = -20 + 20 * (p / 0.25)
      else if (p < 0.75) r = 0
      else               r = -20 * ((p - 0.75) / 0.25)
      rotateRaw.set(r)

      // ── Scale card ──
      let s
      if      (p < 0.25) s = minSc + (1 - minSc) * (p / 0.25)
      else if (p < 0.75) s = 1
      else               s = 1 - (1 - minSc) * ((p - 0.75) / 0.25)
      scaleRaw.set(s)

      // ── Slide vertical card ──
      translateYRaw.set(p < 0.25 ? 100 - 100 * (p / 0.25) : 0)

      // ── Slide + escala del texto ──
      textYRaw.set(p < 0.25 ? 100 - 100 * (p / 0.25) : 0)
      textScaleRaw.set(p < 0.25 ? 0.8 + 0.2 * (p / 0.25) : 1)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [isMobile, opacityRaw, rotateRaw, scaleRaw, translateYRaw, textYRaw, textScaleRaw])

  const rotate     = useSpring(rotateRaw,     SPRING)
  const scale      = useSpring(scaleRaw,      SPRING)
  const translateY = useSpring(translateYRaw, SPRING)
  const textY      = useSpring(textYRaw,      SPRING_SOFT)
  const textScale  = useSpring(textScaleRaw,  SPRING_SOFT)
  const opacity    = useSpring(opacityRaw,    SPRING_OPACITY)

  return (
    <div
      ref={containerRef}
      className="h-[38rem] md:h-[49rem] flex items-center justify-center px-4 md:px-16"
      style={{ perspective: '1200px' }}
    >
      <motion.div style={{ translateY, opacity }} className="w-full max-w-5xl">
        <Card rotate={rotate} scale={scale}>
          <div className="absolute inset-0">
            {children}
          </div>


          <motion.div
            style={{ translateY: textY, scale: textScale }}
            className="absolute inset-0"
          >
            {titleComponent}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
