import './Testimonials.css'

const AVATARS = [
  { src: 'https://i.pravatar.cc/150?img=3',  alt: 'Cliente' },
  { src: 'https://i.pravatar.cc/150?img=7',  alt: 'Cliente' },
  { src: 'https://i.pravatar.cc/150?img=11', alt: 'Cliente' },
  { src: 'https://i.pravatar.cc/150?img=16', alt: 'Cliente' },
  { src: 'https://i.pravatar.cc/150?img=21', alt: 'Cliente' },
  { src: 'https://i.pravatar.cc/150?img=26', alt: 'Cliente' },
  { src: 'https://i.pravatar.cc/150?img=33', alt: 'Cliente' },
  { src: 'https://i.pravatar.cc/150?img=40', alt: 'Cliente' },
]

const ORBIT_RADIUS  = 300
const ORBIT_DURATION = 50

export default function Testimonials({ t }) {
  return (
    <section className="testi">
      {/* Concentric dashed circles */}
      <div className="testi__circles" aria-hidden="true">
        <div className="testi__circle testi__circle--sm" />
        <div className="testi__circle testi__circle--lg" />
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
