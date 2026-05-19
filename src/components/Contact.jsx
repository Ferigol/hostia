import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import './Contact.css'

const SPRING = { stiffness: 52, damping: 22, mass: 1 }

const Field = ({ label, type = 'text', name, value, onChange, delay = 0, isTextarea = false }) => (
  <motion.div
    className="contact__field"
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
  >
    <label className="contact__label">{label}</label>
    {isTextarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="contact__input contact__textarea"
        rows={6}
        required
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="contact__input"
        required
      />
    )}
    <span className="contact__line" />
  </motion.div>
)

const CustomSelect = ({ label, name, value, onChange, options, delay = 0 }) => {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    const handler = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = opt => {
    onChange({ target: { name, value: opt.value } })
    setOpen(false)
  }

  return (
    <motion.div
      className="contact__field"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      ref={wrapRef}
      style={{ position: 'relative' }}
    >
      <label className="contact__label">{label}</label>

      {/* Trigger */}
      <button
        type="button"
        className={`contact__input contact__dropdown-trigger${open ? ' contact__dropdown-trigger--open' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        <span className={selected ? '' : 'contact__dropdown-placeholder'}>
          {selected ? selected.label : ''}
        </span>
        <svg
          className={`contact__dropdown-chevron${open ? ' contact__dropdown-chevron--open' : ''}`}
          width="12" height="7" viewBox="0 0 12 7" fill="none"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="contact__dropdown-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`contact__dropdown-item${value === opt.value ? ' contact__dropdown-item--active' : ''}`}
                onClick={() => select(opt)}
              >
                <span className="contact__dropdown-item-label">{opt.label}</span>
                <span className="contact__dropdown-item-line" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Contact({ t }) {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'start 35%'],
  })
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1])
  const yRaw       = useTransform(scrollYProgress, [0, 1], [40, 0])
  const opacity    = useSpring(opacityRaw, SPRING)
  const y          = useSpring(yRaw, SPRING)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
  }

  const ct = t.contact

  return (
    <section id="contacto" className="contact" ref={sectionRef}>
      <div className="contact__inner section-inner">

        <motion.div className="contact__header" style={{ opacity, y }}>
          <h2 className="contact__headline">{ct.headline}</h2>
          <p className="contact__sub">{ct.sub}</p>
        </motion.div>

        {sent ? (
          <motion.div
            className="contact__thanks"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="contact__thanks-icon">✦</span>
            <p>{ct.thanks}</p>
          </motion.div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__row">
              <Field label={ct.name}  name="name"  value={form.name}  onChange={handleChange} delay={0.05} />
              <Field label={ct.email} name="email" type="email" value={form.email} onChange={handleChange} delay={0.12} />
            </div>
            <div className="contact__row">
              <Field label={ct.phone} name="phone" type="tel" value={form.phone} onChange={handleChange} delay={0.18} />
              <CustomSelect
                label={ct.serviceLabel}
                name="service"
                value={form.service}
                onChange={handleChange}
                options={ct.serviceOptions}
                delay={0.24}
              />
            </div>
            <Field label={ct.message} name="message" value={form.message} onChange={handleChange} delay={0.30} isTextarea />

            <motion.div
              className="contact__footer-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
            >
              <button type="submit" className="btn contact__submit">
                {ct.cta}
                <span className="contact__submit-arrow">→</span>
              </button>
            </motion.div>
          </form>
        )}

      </div>
    </section>
  )
}
