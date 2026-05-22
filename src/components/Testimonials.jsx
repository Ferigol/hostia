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

const ORBIT_RADIUS  = 300
const ORBIT_DURATION = 50

export default function Testimonials({ t }) {
  return (
    <section className="testi">
      {/* Central content */}
      <div className="testi__content">
        <h2 className="testi__title">{t.testimonials.title}</h2>
        <p className="testi__desc">
          {t.testimonials.desc.split('||').map((line, i) => (
            <span key={i}>{i > 0 && <br />}{line}</span>
          ))}
        </p>
      </div>

      {/* Rotating ring of avatars */}
      <div
        className="testi__orbit"
        style={{ '--orbit-duration': `${ORBIT_DURATION}s` }}
        aria-hidden="true"
      >
        {AVATARS.map((avatar, i) => {
          const angle = (i / AVATARS.length) * 2 * Math.PI
          const x = Math.cos(angle) * ORBIT_RADIUS
          const y = Math.sin(angle) * ORBIT_RADIUS
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
    </section>
  )
}
