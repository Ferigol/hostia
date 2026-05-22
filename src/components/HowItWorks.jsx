import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './HowItWorks.css'

const SPRING_OPACITY = { stiffness: 48, damping: 20, mass: 1.1 }
const SPRING_X       = { stiffness: 58, damping: 22, mass: 0.9 }

const Step = ({ num, title, desc, align }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'start -10%'],
  })

  // Text slides from its side (same as before)
  const xDir    = align === 'right' ? 75 : -75
  // Number converges from the opposite side, ending at center
  const numXDir = align === 'right' ? -75 : 75

  const opacityRaw = useTransform(scrollYProgress, [0, 0.13, 0.50, 0.88], [0, 1, 1, 0])
  const xRaw       = useTransform(scrollYProgress, [0, 0.17, 1], [xDir,    0, 0])
  const numXRaw    = useTransform(scrollYProgress, [0, 0.17, 1], [numXDir, 0, 0])

  const opacity = useSpring(opacityRaw, SPRING_OPACITY)
  const x       = useSpring(xRaw,       SPRING_X)
  const numX    = useSpring(numXRaw,    SPRING_X)

  return (
    <div ref={ref} className={`how-step how-step--${align}`}>

      {/* Number — desktop/tablet: absolutely centered horizontally */}
      <div className="how-step__num-wrap">
        <motion.span className="how-step__num" style={{ x: numX, opacity }}>
          {num}
        </motion.span>
      </div>

      {/* Content row — same animation as before, without number */}
      <motion.div
        className="how-step__row"
        style={{
          x, opacity,
          display: 'flex',
          width: '100%',
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        {/* Number for mobile only (order: -1 via CSS) */}
        <span className="how-step__num how-step__num--mobile">{num}</span>
        <div className="how-step__content">
          <h3 className="how-step__title">
            {title.split('||').map((part, i) => <span key={i}>{i > 0 && <br />}{part}</span>)}
          </h3>
          <p className="how-step__desc">
            {desc.split('||').map((part, i) => <span key={i}>{i > 0 && <br />}{part}</span>)}
          </p>
        </div>
      </motion.div>

    </div>
  )
}

export default function HowItWorks({ t }) {
  return (
    <section id="como-funciona" className="how">
      <div className="how__blobs" aria-hidden="true">
        <div className="how__blob how__blob--1" />
        <div className="how__blob how__blob--2" />
        <div className="how__blob how__blob--3" />
      </div>
      <div className="how__inner section-inner" style={{ position: 'relative', zIndex: 1 }}>
        {t.howItWorks.steps.map((step, i) => (
          <Step
            key={i}
            num={String(i + 1).padStart(3, '0')}
            title={step.title}
            desc={step.desc}
            align={i % 2 === 0 ? 'right' : 'left'}
          />
        ))}
      </div>
    </section>
  )
}
