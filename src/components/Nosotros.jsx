import { useState } from 'react'
import { motion } from 'framer-motion'
import CircularTestimonials from './ui/CircularTestimonials'
import { LampContainer } from './ui/Lamp'
import './Nosotros.css'

function ScrollArrow() {
  return (
    <div className="nosotros__scroll">
      <a href="#contacto" className="nosotros__scroll-link" aria-label="Ir a Contacto">
        <div className="nosotros__scroll-line" />
        <div className="nosotros__scroll-head" />
      </a>
    </div>
  )
}

export default function Nosotros({ t }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="nosotros" className="nosotros">
      <LampContainer />
      <div className="nosotros__blobs" aria-hidden="true">
        <div className="nosotros__blob nosotros__blob--1" />
        <div className="nosotros__blob nosotros__blob--2" />
      </div>

      {/* Contenido: aparece tras la lámpara (delay = lamp_delay 0.3 + lamp_duration 0.8 = 1.1s) */}
      <motion.div
        className="section-inner nosotros__inner"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >

        <div className="nosotros__carousel">
          <CircularTestimonials
            testimonials={t.nosotros.members}
            onIndexChange={setActiveIndex}
            autoplay={false}
            colors={{
              name:                '#ffffff',
              designation:         '#ffffff',
              testimony:           '#ffffff',
              arrowBackground:     '#1a1a1a',
              arrowForeground:     '#f1f1f7',
              arrowHoverBackground:'#f86943',
            }}
            fontSizes={{
              name:        'clamp(24px, 3vw, 38px)',
              designation: '14px',
              quote:       '22px',
            }}
          />
        </div>

      </motion.div>

      {activeIndex === 2 && <ScrollArrow />}
    </section>
  )
}
