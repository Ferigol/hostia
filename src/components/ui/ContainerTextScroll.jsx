import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, useSpring, motion } from 'framer-motion'

const SPRING = { stiffness: 80, damping: 22, mass: 0.8 }

const Card = ({ rotate, scale, children }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 20px 40px rgba(0,0,0,0.4)',
    }}
    className="relative h-[24rem] md:h-[33rem] w-full border border-white/10 bg-[#0a0a0a] rounded-2xl overflow-hidden"
  >
    {children}
  </motion.div>
)

export const ContainerTextScroll = ({ titleComponent, children, inputStart = 0 }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // inputStart retrasa el inicio de la animación de entrada (0 = inmediato, 0.3 = espera a estar más en vista)
  const s = inputStart
  const rotateRaw     = useTransform(scrollYProgress, [s, Math.min(s + 0.45, 1)], [-8, 0])
  const scaleRaw      = useTransform(scrollYProgress, [s, Math.min(s + 0.45, 1)], isMobile ? [0.85, 1] : [0.93, 1])
  const translateYRaw = useTransform(scrollYProgress, [s, Math.min(s + 0.45, 1)], [50, 0])

  const rotate     = useSpring(rotateRaw, SPRING)
  const scale      = useSpring(scaleRaw, SPRING)
  const translateY = useSpring(translateYRaw, SPRING)

  // Opacity en el wrapper: todo el contenedor (card + textos) aparece junto
  const opacityRaw = useTransform(scrollYProgress, [s, Math.min(s + 0.3, 1)], [0, 1])
  const opacity    = useSpring(opacityRaw, { stiffness: 60, damping: 20 })

  const textY = useTransform(scrollYProgress, [s, Math.min(s + 0.45, 1)], [30, 0])

  return (
    <div
      ref={containerRef}
      className="h-[38rem] md:h-[49rem] flex items-center justify-center px-4 md:px-16"
      style={{ perspective: '1200px' }}
    >
      {/* opacity aquí: card + imagen + textos aparecen y desaparecen juntos */}
      <motion.div style={{ translateY, opacity }} className="w-full max-w-5xl">
        <Card rotate={rotate} scale={scale}>
          <div className="absolute inset-0">
            {children}
          </div>

          <div className="absolute inset-0 bg-black/0" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />

          <motion.div
            style={{ translateY: textY }}
            className="absolute inset-0 flex items-center justify-center text-center px-8 md:px-16"
          >
            {titleComponent}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
