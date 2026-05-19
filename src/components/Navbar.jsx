import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const NAV_LINKS = [
  { key: 'services',   href: '#servicios'     },
  { key: 'howItWorks', href: '#como-funciona' },
  { key: 'about',      href: '#nosotros'      },
  { key: 'contact',    href: '#contacto'      },
]

// Logo appears at 300ms, links stagger from 500ms (after header slides in at ~700ms)
const LOGO_DELAY  = 300
const LINK_START  = 500
const LINK_STEP   = 90
const LANG_DELAY  = 900
const BURGER_DELAY = 400

export default function Navbar({ lang, setLang, t }) {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <motion.header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: footerVisible ? -80 : 0, opacity: footerVisible ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar__inner">
        {/* Logo */}
        <a
          href="#"
          className="navbar__logo link-animate"
          style={{ animationDelay: `${LOGO_DELAY}ms` }}
          onClick={handleNavClick}
          aria-label="hostia — inicio"
        >
          <img src="/logo-hostia-agency.svg" alt="hostia" width="77" height="21" />
        </a>

        {/* Desktop links — 2 grupos de 3 */}
        <nav className="navbar__links" aria-label="Navegación principal">
          {[NAV_LINKS.slice(0, 2), NAV_LINKS.slice(2)].map((group, g) => (
            <div key={g} className="navbar__link-group">
              {group.map(({ key, href }, i) => (
                <a
                  key={key}
                  href={href}
                  className="navbar__link link-animate"
                  style={{ animationDelay: `${LINK_START + (g * 3 + i) * LINK_STEP}ms` }}
                >
                  {t.nav[key]}
                </a>
              ))}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="navbar__actions">
          <button
            className="navbar__lang link-animate"
            style={{ animationDelay: `${LANG_DELAY}ms` }}
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label="Cambiar idioma"
          >
            <span className={lang === 'es' ? 'active' : ''}>ES</span>
            <span className="navbar__lang-sep">|</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </button>

          {/* Hamburger */}
          <button
            className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''} link-animate`}
            style={{ animationDelay: `${BURGER_DELAY}ms` }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <nav className="navbar__drawer-list">
              {NAV_LINKS.map(({ key, href }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  className="navbar__drawer-link"
                  onClick={handleNavClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t.nav[key]}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
