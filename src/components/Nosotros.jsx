import { useState } from 'react'
import CircularTestimonials from './ui/CircularTestimonials'
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
      <div className="nosotros__blobs" aria-hidden="true">
        <div className="nosotros__blob nosotros__blob--1" />
        <div className="nosotros__blob nosotros__blob--2" />
      </div>

      <div className="section-inner nosotros__inner">

        <div className="nosotros__carousel">
          <CircularTestimonials
            testimonials={t.nosotros.members}
            onIndexChange={setActiveIndex}
            autoplay={true}
            autoplayInterval={6000}
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

      </div>

      {activeIndex === 1 && <ScrollArrow />}
    </section>
  )
}
