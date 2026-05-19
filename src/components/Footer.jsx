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
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <img src="/logo-hostia-agency.svg" alt="hostia" className="footer__logo" />
            <p className="footer__brand-desc">
              {lang === 'en'
                ? 'AI-powered digital marketing agency.'
                : 'Agencia de marketing digital con IA.'}
            </p>
            <a href="mailto:hola@hostia.agency" className="footer__email-link">
              <span className="footer__email-arrow">↗</span>
              <span className="footer__email-text">hola@hostia.agency</span>
            </a>
          </div>

          {/* Link columns */}
          {footerLinks.map(section => (
            <div key={section.title} className="footer__links-col">
              <h4 className="footer__col-title">{section.title}</h4>
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
              <li><span className="footer__link footer__link--location">Lima - Perú</span></li>
              <li><span className="footer__link footer__link--location">Madrid - España</span></li>
            </ul>
          </div>
        </div>

        <hr className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <div className="footer__socials">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="footer__social-icon">
                {label}
              </a>
            ))}
          </div>
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} hostia agency.{' '}
            {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
        </div>
      </div>

      {/* Background gradient */}
      <div className="footer__gradient" />
    </footer>
  )
}
