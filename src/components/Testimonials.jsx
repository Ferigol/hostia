import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Testimonials.css'

const AVATARS = [
  { src: '/Clientes-1.webp', alt: 'Cliente' },
  { src: '/Clientes-2.webp', alt: 'Cliente' },
  { src: '/Clientes-3.webp', alt: 'Cliente' },
  { src: '/Clientes-4.webp', alt: 'Cliente' },
  { src: '/Clientes-5.webp', alt: 'Cliente' },
  { src: '/Clientes-6.webp', alt: 'Cliente' },
  { src: '/Clientes-7.webp', alt: 'Cliente' },
  { src: '/Clientes-8.webp', alt: 'Cliente' },
]

const ORBIT_DURATION = 50

export default function Testimonials({ t }) {
  const stars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id:         i,
      left:       Math.random() * 100,
      top:        Math.random() * 100,
      maxOpacity: Math.random() * 0.5 + 0.3,
      duration:   Math.random() * 3 + 2,
      delay:      Math.random() * 6,
    }))
  , [])

  const [orbitRadius, setOrbitRadius] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 900 ? 145 : 300
  )

  useEffect(() => {
    const handler = () => setOrbitRadius(window.innerWidth <= 900 ? 145 : 300)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <section className="testi">
      {/* Stars */}
      <div style={{ position:'absolute', inset:0, zIndex:0, overflow:'hidden', pointerEvents:'none' }} aria-hidden="true">
        {stars.map(s => (
          <motion.div
            key={s.id}
            className="absolute bg-white rounded-full"
            style={{ left:`${s.left}%`, top:`${s.top}%`, width:'2px', height:'2px' }}
            animate={{ opacity: [0, s.maxOpacity, 0] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="testi__content">
        <h2 className="testi__title">{t.testimonials.title}</h2>
        <p className="testi__desc">
          {t.testimonials.desc.split('||').map((line, i) => (
            <span key={i}>{i > 0 && <br />}{line}</span>
          ))}
        </p>
      </div>

      {/* Orbit container — absolute on desktop, relative block on mobile */}
      <div className="testi__orbit-area" aria-hidden="true">
        <div
          className="testi__orbit"
          style={{ '--orbit-duration': `${ORBIT_DURATION}s` }}
        >
          {AVATARS.map((avatar, i) => {
            const angle = (i / AVATARS.length) * 2 * Math.PI
            const x = Math.cos(angle) * orbitRadius
            const y = Math.sin(angle) * orbitRadius
            return (
              <div
                key={i}
                className="testi__avatar-anchor"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <div
                  className="testi__avatar-float"
                  style={{ animationDelay: `-${i * 0.75}s` }}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="testi__avatar-img"
                    style={{ '--orbit-duration': `${ORBIT_DURATION}s` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
