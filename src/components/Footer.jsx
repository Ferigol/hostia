import { useMemo } from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

const NAV_LINKS = [
  { key: 'services',   href: '#servicios'     },
  { key: 'howItWorks', href: '#como-funciona' },
  { key: 'about',      href: '#nosotros'      },
  { key: 'contact',    href: '#contacto'      },
]

const SOCIAL_LINKS = [
  { label: 'INSTAGRAM', href: '#' },
  { label: 'LINKEDIN',  href: '#' },
]

export default function Footer({ t, lang }) {
  const stars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top:  Math.random() * 100,
      maxOpacity: Math.random() * 0.5 + 0.3,
      duration:   Math.random() * 3 + 2,
      delay:      Math.random() * 6,
    }))
  , [])
  const footerLinks = [
    {
      title: lang === 'en' ? 'Navigate' : 'Navegar',
      links: NAV_LINKS.slice(0, 2).map(l => ({ label: t.nav[l.key], href: l.href })),
    },
    {
      title: lang === 'en' ? 'Company' : 'Empresa',
      links: NAV_LINKS.slice(2).map(l => ({ label: t.nav[l.key], href: l.href })),
    },
  ]

  return (
    <footer className="footer" style={{ position:'relative' }}>
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
      <div className="footer__inner" style={{ position:'relative', zIndex:1 }}>
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <img src="/logo-hostia-agency.svg" alt="hostia" className="footer__logo" />
            <p className="footer__brand-desc">
              {lang === 'en'
                ? <>Intelligence that builds.<br />Creativity that converts.</>
                : <>Inteligencia que construye.<br />Creatividad que convierte.</>}
            </p>
          </div>

          {/* Link columns — sin títulos */}
          {footerLinks.map(section => (
            <div key={section.title} className="footer__links-col">
              <ul className="footer__links-list">
                {section.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Base */}
          <div className="footer__contact-col">
            <h4 className="footer__col-title">Base</h4>
            <ul className="footer__links-list">
              <li><span className="footer__link footer__link--location">Lima — Madrid</span></li>
            </ul>
          </div>
        </div>

        <hr className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} hostIA agency.{' '}
            {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
        </div>
      </div>

      {/* Background gradient */}
      <div className="footer__gradient" />
    </footer>
  )
}
