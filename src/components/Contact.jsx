import { useRef, useState, useEffect, useMemo } from 'react'
import ThanksCard from './ui/ThanksCard'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { FlipCountdown } from './ui/FlipCountdown'
import './Contact.css'

const SPRING      = { stiffness: 52, damping: 22, mass: 1 }

const PREFIXES = [
  { code: 'ES', dial: '+34',  flag: '🇪🇸', name: 'España' },
  { code: 'MX', dial: '+52',  flag: '🇲🇽', name: 'México' },
  { code: 'AR', dial: '+54',  flag: '🇦🇷', name: 'Argentina' },
  { code: 'CO', dial: '+57',  flag: '🇨🇴', name: 'Colombia' },
  { code: 'CL', dial: '+56',  flag: '🇨🇱', name: 'Chile' },
  { code: 'PE', dial: '+51',  flag: '🇵🇪', name: 'Perú' },
  { code: 'VE', dial: '+58',  flag: '🇻🇪', name: 'Venezuela' },
  { code: 'EC', dial: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: 'BO', dial: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: 'UY', dial: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: 'CR', dial: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: 'PA', dial: '+507', flag: '🇵🇦', name: 'Panamá' },
  { code: 'DO', dial: '+1',   flag: '🇩🇴', name: 'Rep. Dominicana' },
  { code: 'GT', dial: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: 'US', dial: '+1',   flag: '🇺🇸', name: 'Estados Unidos' },
  { code: 'CA', dial: '+1',   flag: '🇨🇦', name: 'Canadá' },
  { code: 'BR', dial: '+55',  flag: '🇧🇷', name: 'Brasil' },
  { code: 'PT', dial: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: 'FR', dial: '+33',  flag: '🇫🇷', name: 'Francia' },
  { code: 'DE', dial: '+49',  flag: '🇩🇪', name: 'Alemania' },
  { code: 'IT', dial: '+39',  flag: '🇮🇹', name: 'Italia' },
  { code: 'GB', dial: '+44',  flag: '🇬🇧', name: 'Reino Unido' },
  { code: 'NL', dial: '+31',  flag: '🇳🇱', name: 'Países Bajos' },
  { code: 'CH', dial: '+41',  flag: '🇨🇭', name: 'Suiza' },
  { code: 'SE', dial: '+46',  flag: '🇸🇪', name: 'Suecia' },
  { code: 'NO', dial: '+47',  flag: '🇳🇴', name: 'Noruega' },
  { code: 'PL', dial: '+48',  flag: '🇵🇱', name: 'Polonia' },
  { code: 'AU', dial: '+61',  flag: '🇦🇺', name: 'Australia' },
  { code: 'JP', dial: '+81',  flag: '🇯🇵', name: 'Japón' },
  { code: 'CN', dial: '+86',  flag: '🇨🇳', name: 'China' },
  { code: 'IN', dial: '+91',  flag: '🇮🇳', name: 'India' },
  { code: 'ZA', dial: '+27',  flag: '🇿🇦', name: 'Sudáfrica' },
  { code: 'MA', dial: '+212', flag: '🇲🇦', name: 'Marruecos' },
]
const TOTAL_STEPS = 3

const PHONE_DIGITS = {
  ES: 9,  MX: 10, AR: 10, CO: 10, CL: 9,  PE: 9,  VE: 10, EC: 9,
  BO: 8,  UY: 9,  CR: 8,  PA: 8,  DO: 10, GT: 8,  US: 10, CA: 10,
  BR: 11, PT: 9,  FR: 9,  DE: 10, IT: 10, GB: 10, NL: 9,  CH: 9,
  SE: 9,  NO: 8,  PL: 9,  AU: 9,  JP: 10, CN: 11, IN: 10, ZA: 9,  MA: 9,
}

const slideVariants = {
  enter:  dir => ({ opacity: 0, x: dir * 52 }),
  center:      { opacity: 1, x: 0 },
  exit:   dir => ({ opacity: 0, x: dir * -52 }),
}

/* ── Phone field with prefix ────────────────────────────────────────────────── */
function PhoneField({ placeholder, prefix, onPrefixChange, onPrefixSelect, prefixSelected, value, onChange, error, searchPlaceholder }) {
  const [open, setOpen]   = useState(false)
  const [search, setSearch] = useState('')
  const wrapRef   = useRef(null)
  const searchRef = useRef(null)

  const selected = PREFIXES.find(p => p.code === prefix) || PREFIXES[0]
  const filtered = search.trim()
    ? PREFIXES.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.dial.includes(search))
    : PREFIXES

  useEffect(() => { if (open && searchRef.current) searchRef.current.focus() }, [open])
  useEffect(() => { if (!open) setSearch('') }, [open])
  useEffect(() => {
    const handler = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="contact__field contact__phone-field" ref={wrapRef} style={{ position: 'relative' }}>
      <div className="contact__phone-row">
        <div className="contact__prefix-wrap">
          <button type="button" className="contact__prefix-box" onClick={() => setOpen(v => !v)}>
            {prefixSelected && <span className="contact__prefix-dial">{selected.dial}</span>}
            <svg className={`contact__prefix-chevron${open ? ' contact__prefix-chevron--open' : ''}`}
              width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div className="contact__prefix-panel contact__dropdown-panel"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="contact__prefix-search">
                  <input ref={searchRef} type="text" value={search} onChange={e => setSearch(e.target.value)}
                    className="contact__prefix-search-input" placeholder={searchPlaceholder} />
                </div>
                <div className="contact__prefix-list">
                  {filtered.map(p => (
                    <button key={p.code} type="button"
                      className={`contact__dropdown-item${prefix === p.code ? ' contact__dropdown-item--active' : ''}`}
                      onClick={() => { onPrefixChange(p.code); onPrefixSelect(true); setOpen(false) }}>
                      <span style={{ fontSize: '15px', flexShrink: 0 }}>{p.flag}</span>
                      <span className="contact__dropdown-item-label">{p.name}</span>
                      <span className="contact__dropdown-item-line" />
                      <span style={{ fontSize: '12px', color: 'var(--white-50)', flexShrink: 0 }}>{p.dial}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <input
          name="whatsapp"
          className="contact__input contact__phone-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && (
        <motion.span
          className="contact__error-msg"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.span>
      )}
    </div>
  )
}

/* ── Custom dropdown ────────────────────────────────────────────────────────── */
function CustomSelect({ label, name, value, onChange, options, delay = 0, error }) {
  const [open, setOpen] = useState(false)
  const wrapRef         = useRef(null)
  const selected        = options.find(o => o.value === value)

  useEffect(() => {
    const handler = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = opt => { onChange({ target: { name, value: opt.value } }); setOpen(false) }

  return (
    <div className="contact__field" ref={wrapRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className={`contact__input contact__dropdown-trigger${open ? ' contact__dropdown-trigger--open' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        <span className={selected ? '' : 'contact__dropdown-placeholder'}>
          {selected ? selected.label : label}
        </span>
        <svg
          className={`contact__dropdown-chevron${open ? ' contact__dropdown-chevron--open' : ''}`}
          width="12" height="7" viewBox="0 0 12 7" fill="none"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

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
      {error && (
        <motion.span
          className="contact__error-msg"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.span>
      )}
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────────────────────── */
export default function Contact({ t }) {
  const sectionRef = useRef(null)
  const [step, setStep] = useState(1)
  const [dir,  setDir]  = useState(1)
  const [sent, setSent]             = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [countdownStarted, setCountdownStarted] = useState(false)
  const [prefixSelected, setPrefixSelected] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '', phonePrefix: 'ES',
    businessDesc: '', service: '',
    budget: '', extra: '',
  })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 85%', 'start 35%'] })
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1])
  const yRaw       = useTransform(scrollYProgress, [0, 1], [40, 0])
  const opacity    = useSpring(opacityRaw, SPRING)
  const y          = useSpring(yRaw, SPRING)

  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top:  Math.random() * 100,
      maxOpacity: Math.random() * 0.5 + 0.3,
      duration:   Math.random() * 3 + 2,
      delay:      Math.random() * 6,
    }))
  , [])

  const ct    = t.contact
  const steps = ct.steps

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const handleChange = e => {
    const { name, value } = e.target
    set(name, value)
    setErrors(prev => { if (!prev[name]) return prev; const n = { ...prev }; delete n[name]; return n })
  }

  const validate = () => {
    const errs = {}
    if (step === 1) {
      if (!form.name.trim())
        errs.name = ct.errors.nameRequired
      if (!form.email.includes('@') || form.email.trim().length <= 3)
        errs.email = ct.errors.emailInvalid
      if (!prefixSelected) {
        errs.whatsapp = ct.errors.prefixRequired
      } else {
        const digits   = form.whatsapp.replace(/\D/g, '').length
        const expected = PHONE_DIGITS[form.phonePrefix]
        if (!expected || digits !== expected)
          errs.whatsapp = ct.errors.phoneDigits.replace('%d', expected ?? '?')
      }
    }
    if (step === 2) {
      if (!form.businessDesc.trim()) errs.businessDesc = ct.errors.businessRequired
      if (!form.service)             errs.service      = ct.errors.serviceRequired
    }
    return errs
  }

  const canProceed = () => Object.keys(validate()).length === 0

  const goNext = () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setDir(1)
    setStep(s => s + 1)
  }
  const goBack = () => { setErrors({}); setDir(-1); setStep(s => s - 1) }

  const isBlocked = step === 3 && form.budget === '<500'
  const canSubmit = step === 3 && form.budget && form.budget !== '<500'

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return
    setSubmitting(true)
    setSubmitError(false)
    const prefix = PREFIXES.find(p => p.code === form.phonePrefix)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key:  'e096a947-d950-47d7-ab8d-5348f0ac691f',
          name:        form.name,
          email:       form.email,
          phone:       `${prefix?.dial ?? ''} ${form.whatsapp}`,
          business:    form.businessDesc,
          service:     form.service,
          budget:      form.budget,
          extra:       form.extra,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Step content ──────────────────────────────────────────────────────── */
  const renderStep = () => {
    switch (step) {
      case 1: return (
        <div className="contact__step">
          <div className="contact__field" style={{ position: 'relative' }}>
            <input name="name" className="contact__input" placeholder={steps[0].nameLabel} value={form.name} onChange={handleChange} onFocus={() => setCountdownStarted(true)} />
            {errors.name && (
              <motion.span className="contact__error-msg" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                {errors.name}
              </motion.span>
            )}
          </div>
          <div className="contact__step-row">
            <div className="contact__field" style={{ flex: 1, position: 'relative' }}>
              <input name="email" type="email" className="contact__input" placeholder={steps[0].emailLabel} value={form.email} onChange={handleChange} />
              {errors.email && (
                <motion.span className="contact__error-msg" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  {errors.email}
                </motion.span>
              )}
            </div>
            <PhoneField
              placeholder={steps[0].whatsappLabel}
              prefix={form.phonePrefix}
              onPrefixChange={code => {
                set('phonePrefix', code)
                setErrors(prev => { const n = { ...prev }; delete n.whatsapp; return n })
              }}
              onPrefixSelect={setPrefixSelected}
              prefixSelected={prefixSelected}
              value={form.whatsapp}
              onChange={handleChange}
              error={errors.whatsapp}
              searchPlaceholder={ct.searchPlaceholder}
            />
          </div>
        </div>
      )

      case 2: return (
        <div className="contact__step">
          <div className="contact__field" style={{ position: 'relative' }}>
            <input name="businessDesc" className="contact__input" placeholder={steps[1].businessLabel} value={form.businessDesc} onChange={handleChange} />
            {errors.businessDesc && (
              <motion.span className="contact__error-msg" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                {errors.businessDesc}
              </motion.span>
            )}
          </div>
          <CustomSelect
            label={steps[1].serviceLabel}
            name="service"
            value={form.service}
            onChange={handleChange}
            options={steps[1].serviceOptions}
            error={errors.service}
          />
        </div>
      )

      case 3: return (
        <div className="contact__step">
          <CustomSelect
            label={steps[2].budgetLabel}
            name="budget"
            value={form.budget}
            onChange={handleChange}
            options={steps[2].budgetOptions}
          />
          {!isBlocked && (
            <div className="contact__field" style={{ marginTop: '8px', paddingBottom: 0 }}>
              <textarea
                name="extra"
                className="contact__input contact__textarea"
                placeholder={steps[2].extraLabel}
                value={form.extra}
                onChange={handleChange}
                rows={1}
              />
            </div>
          )}
          {isBlocked && (
            <motion.p
              className="contact__blocked-msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {steps[2].blockedMessage}
            </motion.p>
          )}
        </div>
      )

      default: return null
    }
  }

  return (
    <section id="contacto" className="contact" ref={sectionRef} style={{ position: 'relative' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, overflow:'hidden' }}>
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
            <ThanksCard text={ct.thanks} />
          </motion.div>
        ) : (
          <div className="contact__multistep">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
              <FlipCountdown
                countFrom={150}
                countTo={0}
                intervalMs={1000}
                started={countdownStarted}
              />
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className={`contact__nav${step === 1 ? ' contact__nav--end' : ''}`}>
              {step > 1 && (
                <button type="button" className="btn btn-ghost" onClick={goBack}>
                  ← {ct.back}
                </button>
              )}

              {step < TOTAL_STEPS && (
                <button
                  type="button"
                  className="btn contact__btn-next"
                  onClick={goNext}
                >
                  {ct.next} →
                </button>
              )}

              {step === TOTAL_STEPS && (
                <button
                  type="button"
                  className="btn contact__btn-next"
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                >
                  {submitting ? '...' : steps[2].cta}
                </button>
              )}
            </div>

            <AnimatePresence>
              {submitError && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    textAlign: 'center',
                    marginTop: '16px',
                    fontFamily: 'Gilroy, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#f86943',
                  }}
                >
                  {ct.submitError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  )
}
