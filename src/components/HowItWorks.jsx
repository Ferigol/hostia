import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './HowItWorks.css'

// Spring suave para opacidad, más responsive para posición
const SPRING_OPACITY = { stiffness: 48, damping: 20, mass: 1.1 }
const SPRING_X       = { stiffness: 58, damping: 22, mass: 0.9 }

const Step = ({ num, title, desc, align }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'start -10%'],
  })

  const xDir = align === 'right' ? 75 : -75

  const opacityRaw = useTransform(
    scrollYProgress,
    [0, 0.13, 0.50, 0.88],
    [0,  1,    1,   0  ]
  )

  const xRaw = useTransform(
    scrollYProgress,
    [0,    0.17, 1],
    [xDir, 0,    0]
  )

  const opacity = useSpring(opacityRaw, SPRING_OPACITY)
  const x       = useSpring(xRaw,       SPRING_X)

  const content = align === 'left'
    ? <><div className="how-step__content"><h3 className="how-step__title">{title.split('||').map((part, i) => <span key={i}>{i > 0 && <br />}{part}</span>)}</h3><p className="how-step__desc">{desc.split('||').map((part, i) => <span key={i}>{i > 0 && <br />}{part}</span>)}</p></div><span className="how-step__num">{num}</span></>
    : <><span className="how-step__num">{num}</span><div className="how-step__content"><h3 className="how-step__title">{title.split('||').map((part, i) => <span key={i}>{i > 0 && <br />}{part}</span>)}</h3><p className="how-step__desc">{desc.split('||').map((part, i) => <span key={i}>{i > 0 && <br />}{part}</span>)}</p></div></>

  return (
    <div ref={ref} className={`how-step how-step--${align}`}>
      <motion.div className="how-step__row" style={{ x, opacity, display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {content}
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
