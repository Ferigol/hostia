import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ContainerTextScroll } from './ui/ContainerTextScroll'
import './Services.css'

// Placeholder images — replace each src with your video:
// <video src="/videos/landing.mp4" className="w-full h-full object-cover" muted autoPlay loop playsInline />
const SERVICE_IMAGES = [
  '/servicio-1.webp',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80',
  '/servicio-2.webp',
]

export default function Services({ t }) {
  const headerRef = useRef(null)

  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left:       Math.random() * 100,
      top:        Math.random() * 100,
      maxOpacity: Math.random() * 0.5 + 0.4,
      duration:   Math.random() * 3 + 2,
      delay:      Math.random() * 6,
    }))
  , [])

  // Scroll-driven: el título aparece mientras mueves el scroll hacia él
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start 90%', 'start 30%'],
  })

  const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1])
  const yRaw       = useTransform(scrollYProgress, [0, 1], [50, 0])
  const blurRaw    = useTransform(scrollYProgress, [0, 1], [12, 0])

  const opacity = useSpring(opacityRaw, { stiffness: 60, damping: 20 })
  const y       = useSpring(yRaw,       { stiffness: 60, damping: 20 })
  const filter  = useTransform(blurRaw, v => `blur(${v}px)`)

  return (
    <section className="services" id="servicios">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {stars.map(s => (
          <motion.div
            key={s.id}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{ left: `${s.left}%`, top: `${s.top}%` }}
            animate={{ opacity: [0, s.maxOpacity, 0] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="services__inner section-inner">

        {/* Título — aparece suavemente conforme mueves el scroll */}
        <motion.div
          ref={headerRef}
          className="services__header"
          style={{ opacity, y, filter }}
        >
          <h2 className="services__title text-center">
            {t.services.title.split('||').map((part, i) => (
              <span key={i}>
                {i > 0 && <>{' '}<br className="md:hidden" /></>}
                {part}
              </span>
            ))}
          </h2>
        </motion.div>

      </div>

      {/* Un contenedor por servicio */}
      {t.services.items.map((item, i) => (
        <ContainerTextScroll
          key={i}
          inputStart={i === 0 ? 0.3 : 0}
          titleComponent={
            <div className="flex flex-col items-center gap-5 mt-[190px] md:mt-[320px]">
              {i === 0 && (
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              <h3 className="text-[clamp(24px,3vw,40px)] font-semibold text-white leading-tight">
                {item.title}
              </h3>
              <p className="text-base md:text-2xl text-white font-normal max-w-2xl md:max-w-none leading-relaxed">
                {item.desc.split('||').map((part, i) => (
                  <span key={i}>
                    {i > 0 && <br className="hidden md:block" />}
                    {part}
                  </span>
                ))}
              </p>
            </div>
          }
        >
          <img
            src={SERVICE_IMAGES[i]}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </ContainerTextScroll>
      ))}
    </section>
  )
}
