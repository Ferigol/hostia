import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Nosotros from './components/Nosotros'
import Footer from './components/Footer'
import Contact from './components/Contact'

/* ── Translations ── */
const T = {
  es: {
    nav: {
      services:   'Servicios',
      howItWorks: 'Cómo funciona',
      about:      'Nosotros',
      contact:    'Contacto',
    },
    hero: {
      headline: 'Diseñamos el futuro||digital de tu marca',
      pillars: [
        { title: 'Landing Page',  sub: 'convierten ventas' },
        { title: 'Páginas web',   sub: 'cuentan tu historia' },
        { title: 'Branding',      sub: 'identidad visual'  },
      ],
    },
    howItWorks: {
      steps: [
        {
          title: 'Analizamos tu marca',
          desc:  'Estudiamos tu negocio y tu competencia para||crear una estrategia digital personalizada.',
        },
        {
          title: 'Diseñamos tu web',
          desc:  'Creamos un diseño a medida, optimizado||para atraer y generar conexiones directas.',
        },
        {
          title: 'Empiezas a recibir clientes',
          desc:  'Lanzamos tu web, activamos el SEO y comienzas||ver resultados desde las primeras semanas.',
        },
      ],
    },
    services: {
      label:    'Lo que hacemos',
      title:    'Lo que necesitas||para crecer con IA',
      items: [
        {
          title: 'Landing Page',
          desc:  'De visita a cliente en segundos. Diseñamos landing pages||que captan leads, generan confianza y cierran ventas sin fricciones.',
        },
        {
          title: 'Páginas web',
          desc:  'Tu negocio en línea, disponible 24/7. Una web profesional que te posiciona sobre la competencia y atrae clientes mientras te dedicas a lo que importa.',
        },
        {
          title: 'Branding',
          desc:  'Sé reconocido, recordado y elegido. Creamos la identidad visual que diferencia tu marca y la hace memorable en cada contacto con tu cliente.',
        },
      ],
    },
    nosotros: {
      label: 'Nosotros',
      title: 'Las personas detrás||de Hostia',
      members: [
        {
          name: '¡Ey si, a ti!',
          designation: 'Co-fundador & Director de Estrategia',
          quote: 'Te estaba esperando, y sí puedo||ayudarte con tu contenido digital.',
          src: '/nosotros-chico.webp',
        },
        {
          name: '¡Silencio!',
          designation: 'Co-fundadora & Directora Creativa',
          quote: 'Esto es solo para tí. Desliza hacía||abajo y rellena el formulario.',
          src: '/nosotros-chica.webp',
        },
      ],
    },
    contact: {
      tag:      'Contacto',
      headline: 'Hablemos',
      sub:      'Cuéntanos tu proyecto. Te respondemos en menos de 24 horas.',
      name:     'Nombre',
      email:    'Email',
      phone:    'Teléfono',
      serviceLabel: 'Servicio',
      serviceOptions: [
        { value: 'landing',  label: 'Landing page'  },
        { value: 'web',      label: 'Página web'    },
        { value: 'branding', label: 'Branding'      },
        { value: 'otros',    label: 'Otros'         },
      ],
      message:  'Mensaje',
      cta:      'Enviar',
      thanks:   'Gracias. Te contactamos pronto.',
    },
  },

  en: {
    nav: {
      services:   'Services',
      howItWorks: 'How it works',
      about:      'About',
      contact:    'Contact',
    },
    hero: {
      headline: 'We design the digital||future of your brand',
      pillars: [
        { title: 'Landing Page', sub: 'convert sales'    },
        { title: 'Websites',     sub: 'build brands'     },
        { title: 'Branding',     sub: 'strategic'        },
      ],
    },
    howItWorks: {
      steps: [
        {
          title: 'We analyze your brand',
          desc:  'We study your business and competition to build a personalized digital strategy.',
        },
        {
          title: 'We design your website',
          desc:  'We craft a custom design optimized to attract visitors and generate direct connections.',
        },
        {
          title: 'You start getting clients',
          desc:  'We launch your site, activate SEO and you start seeing results within the first weeks.',
        },
      ],
    },
    services: {
      label:    'What we do',
      title:    'Everything you need to grow with AI',
      items: [
        {
          title: 'Landing Page',
          desc:  'From visitor to customer in seconds. We design landing pages||that capture leads, build trust and close sales without friction.',
        },
        {
          title: 'Websites',
          desc:  'Your business online, 24/7. A professional website that outranks competitors and attracts new clients while you focus on what matters.',
        },
        {
          title: 'Branding',
          desc:  'Be recognized, remembered and chosen. We build the visual identity that sets your brand apart and makes it unforgettable at every touchpoint.',
        },
      ],
    },
    nosotros: {
      label: 'About us',
      title: 'The people behind||Hostia',
      members: [
        {
          name: 'Hey you!',
          designation: 'Co-founder & Strategy Director',
          quote: 'I was waiting for you, and yes I can||help you with your digital content.',
          src: '/nosotros-chico.webp',
        },
        {
          name: 'Silence!',
          designation: 'Co-founder & Creative Director',
          quote: 'This is just for you. Scroll down||and fill out the form.',
          src: '/nosotros-chica.webp',
        },
      ],
    },
    contact: {
      tag:      'Contact',
      headline: "Let's talk",
      sub:      'Tell us about your project. We reply within 24 hours.',
      name:     'Name',
      email:    'Email',
      phone:    'Phone',
      serviceLabel: 'Service',
      serviceOptions: [
        { value: 'landing',  label: 'Landing page' },
        { value: 'web',      label: 'Website'      },
        { value: 'branding', label: 'Branding'     },
        { value: 'otros',    label: 'Other'        },
      ],
      message:  'Message',
      cta:      'Send',
      thanks:   'Thank you. We will be in touch soon.',
    },
  },
}

export default function App() {
  const [lang, setLang] = useState('es')
  const t = T[lang]

  return (
    <>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Services t={t} />
        <HowItWorks t={t} />
        <Nosotros t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  )
}
