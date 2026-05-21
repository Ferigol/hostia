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
      services:   'Descubre',
      howItWorks: 'El método',
      about:      'Tu sombra',
      contact:    'Da el paso',
    },
    hero: {
      headline: 'Lo sabíamos.||Lo dejaste pasar',
      subtitle: [
        'La IA no es el futuro. Es ahora.',
        'Y tú todavía no estás en el juego',
      ],
      pillars: [
        { title: 'Landing Page',  sub: 'convierten ventas' },
        { title: 'Branding',      sub: 'identidad visual'  },
        { title: 'Contenido digital', sub: 'cuentamos tu historia' },
      ],
    },
    howItWorks: {
      steps: [
        {
          title: 'Llevas tiempo mirando||desde afuera.',
          desc:  'Ves cómo otros crecen. Cómo llenan calendarios. Cómo convierten seguidores en clientes. Y te preguntas qué saben ellos que tú no sabes.',
        },
        {
          title: 'La respuesta no era trabajo.||Era sistema.',
          desc:  'No te faltó esfuerzo. Te faltó la herramienta correcta. La IA no reemplaza lo que haces. Multiplica lo que ya eres.',
        },
        {
          title: 'Empiezas a recibir clientes.',
          desc:  'Y entonces lo entiendes. No fue magia. ||Fue estrategia. Fue IA. Fue decidir, por ||fin, que tu negocio merece más.',
        },
      ],
    },
    services: {
      label:    'Lo que hacemos',
      title:    'Lo que necesitas||para crecer con IA',
      items: [
        {
          title:    'Landing Page',
          subtitle: 'Un visitante tiene 8 segundos de paciencia',
          body:     'O lo conviertes o lo pierdes para siempre. Creamos la página||que captura, convence y cierra. Sin fricción, sin excusas.',
        },
        {
          title:    'Branding',
          subtitle: 'La primera impresión no se negocia',
          body:     'La identidad visual no es estética. Es el arma silenciosa ||que hace que te recuerden a ti y olviden a tu competencia.',
        },
        {
          title:    'Contenido digital',
          subtitle: 'Publica todos los días. Sin agotarte',
          body:     'Contenido con IA, con tu voz y tu identidad. ||Imágenes y videos que paran, enganchan y convierten.',
        },
      ],
    },
    nosotros: {
      label: 'Nosotros',
      title: 'Las personas detrás||de Hostia',
      members: [
        {
          name: '¡Ey, si a ti!',
          designation: 'Co-fundador & Director de Estrategia',
          quote: 'El que llegó hasta acá ya sabe lo que||quiere. Cuéntame y me encargo.',
          src: '/nosotros-chico.webp',
        },
        {
          name: '¡Silencio!',
          designation: 'Co-fundadora & Directora Creativa',
          quote: 'Esto solo para ti. Llena el formulario||y deja que hagamos lo nuestro.',
          src: '/nosotros-chica.webp',
        },
        {
          name: 'Win siempre estuvo aquí.',
          designation: 'Agente Encubierto',
          quote: 'Nos observa a todos. Y cuando alguien||llena el formulario, ronronea.',
          src: '/nosotros-gato.webp',
        },
      ],
    },
    contact: {
      tag:      'Contacto',
      headline: 'Hablemos',
      sub:      'Aún no lo tienes claro. Cuéntanos dónde estás y te decimos hacia dónde ir.',
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
      thanks:   'Gracias, te contactaremos',
      next:     'Siguiente',
      back:     'Volver',
      steps: [
        {
          title:         'Tú',
          nameLabel:     'Nombre',
          emailLabel:    'Email',
          whatsappLabel: 'Teléfono',
        },
        {
          title:          'Tu proyecto',
          businessLabel:  '¿A qué se dedica tu negocio?',
          serviceLabel:   '¿Qué servicio te interesa?',
          serviceOptions: [
            { value: 'landing',   label: 'Landing page'      },
            { value: 'branding',  label: 'Branding'          },
            { value: 'contenido', label: 'Contenido digital' },
          ],
        },
        {
          title:          'Tu inversión',
          budgetLabel:    '¿Qué inversión tienes disponible para tu proyecto?',
          budgetOptions:  [
            { value: '<500',      label: 'Menos de $500'         },
            { value: '500-1000',  label: 'Entre $500 y $1,000'   },
            { value: '1000-3000', label: 'Entre $1,000 y $3,000' },
            { value: '>3000',     label: 'Más de $3,000'         },
          ],
          extraLabel:     '¿Hay algo más que consideres importante?',
          blockedMessage: 'Gracias por llegar hasta aquí. Nuestros proyectos arrancan desde $500 USD. Por ahora no encajamos, pero cuando estés listo, aquí estaremos.',
          cta:            'Quiero que me encuentren.',
        },
      ],
      errors: {
        nameRequired:     'Escribe tu nombre',
        emailInvalid:     'El correo debe incluir @',
        prefixRequired:   'Selecciona el prefijo de tu país',
        phoneDigits:      'El número debe tener %d dígitos',
        businessRequired: 'Describe tu negocio',
        serviceRequired:  'Selecciona un servicio',
      },
    },
  },

  en: {
    nav: {
      services:   'Descubre',
      howItWorks: 'El método',
      about:      'Tu sombra',
      contact:    'Da el paso',
    },
    hero: {
      headline: 'We knew it.||You let it pass.',
      subtitle: [
        'AI is not the future. It\'s now.',
        'And you\'re still not in the game.',
      ],
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
          title:    'Landing',
          subtitle: 'A visitor has 8 seconds of patience.',
          body:     'You either convert them or lose them. Forever. We design the page that captures, convinces and closes. No friction. No excuses.',
        },
        {
          title:    'Branding',
          subtitle: 'They choose you before you open your mouth.',
          body:     'Visual identity is not aesthetics. It is the silent weapon that makes them remember you and forget your competition. We build it to last.',
        },
        {
          title:    'Digital content',
          subtitle: 'Post every day. Without burning out.',
          body:     'Images and videos created with AI, in your voice and identity. Content that stops the scroll, hooks and converts. Your brand active, consistent and unstoppable.',
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
        {
          name: 'Win has been here from the start.',
          designation: 'Director of Records',
          quote: 'Watches over us all. And when someone||fills out the form, he purrs.',
          src: '/nosotros-gato.webp',
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
      next:     'Next',
      back:     'Back',
      steps: [
        {
          title:         'You',
          nameLabel:     'Name',
          emailLabel:    'Email',
          whatsappLabel: 'Teléfono',
        },
        {
          title:          'Your project',
          businessLabel:  'What does your business do?',
          serviceLabel:   'Which service interests you?',
          serviceOptions: [
            { value: 'landing',   label: 'Landing page'    },
            { value: 'branding',  label: 'Branding'        },
            { value: 'contenido', label: 'Digital content' },
          ],
        },
        {
          title:          'Your investment',
          budgetLabel:    'What budget do you have available?',
          budgetOptions:  [
            { value: '<500',      label: 'Under $500'                 },
            { value: '500-1000',  label: 'Between $500 and $1,000'   },
            { value: '1000-3000', label: 'Between $1,000 and $3,000' },
            { value: '>3000',     label: 'Over $3,000'               },
          ],
          extraLabel:     "Anything else you'd like us to know?",
          blockedMessage: "Thanks for making it this far. Our projects start at $500 USD. We're not the right fit right now, but when you're ready, we'll be here.",
          cta:            'I want to be found.',
        },
      ],
      errors: {
        nameRequired:     'Enter your name',
        emailInvalid:     'Email must include @',
        prefixRequired:   'Select your country prefix',
        phoneDigits:      'Number must have %d digits',
        businessRequired: 'Describe your business',
        serviceRequired:  'Select a service',
      },
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
        <Hero key={lang} t={t} />
        <Services t={t} />
        <HowItWorks t={t} />
        <Nosotros t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  )
}
