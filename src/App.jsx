import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
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
    testimonials: {
      title: 'No tenemos testimonios',
      desc:  'Nuestros clientes nos piden resultados,||no quieren pantalla.',
      cta:   'Da el primer paso',
    },
    nosotros: {
      label: 'Nosotros',
      title: 'Las personas detrás||de Hostia',
      members: [
        {
          name: '¡Ey, si a ti!',
          designation: 'Co-fundador & Director de Estrategia',
          quote: 'El que llegó hasta acá sabe lo que||quiere. Cuéntame y me encargo.',
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
      message:           'Mensaje',
      cta:               'Enviar',
      thanks:            'Gracias, te contactaremos',
      submitError:       'Algo falló. Inténtalo de nuevo.',
      next:              'Siguiente',
      back:              'Volver',
      searchPlaceholder: 'Buscar...',
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
      services:   'Discover',
      howItWorks: 'The method',
      about:      'Your shadow',
      contact:    'Take the step',
    },
    hero: {
      headline: 'We knew it.||You let it pass.',
      subtitle: [
        'AI is not the future. It\'s now.',
        'And you\'re still not in the game.',
      ],
      pillars: [
        { title: 'Landing Page',    sub: 'turn visitors into clients' },
        { title: 'Branding',        sub: 'visual identity'            },
        { title: 'Digital content', sub: 'we tell your story'         },
      ],
    },
    howItWorks: {
      steps: [
        {
          title: 'You\'ve been watching||from the outside.',
          desc:  'You see others growing. Filling their calendars. Turning followers into clients. And you wonder what they know that you don\'t.',
        },
        {
          title: 'The answer wasn\'t effort.||It was a system.',
          desc:  'You didn\'t lack effort. You lacked the right tool. AI doesn\'t replace what you do. It multiplies what you already are.',
        },
        {
          title: 'You start getting clients.',
          desc:  'And then you get it. It wasn\'t magic. ||It was strategy. It was AI. It was finally ||deciding your business deserves more.',
        },
      ],
    },
    services: {
      label:    'What we do',
      title:    'Everything you need||to grow with AI',
      items: [
        {
          title:    'Landing Page',
          subtitle: 'A visitor has 8 seconds of patience',
          body:     'You either convert them or lose them forever. We build the page||that captures, convinces and closes. No friction, no excuses.',
        },
        {
          title:    'Branding',
          subtitle: 'First impressions are non-negotiable',
          body:     'Visual identity is not aesthetics. It\'s the silent weapon ||that makes them remember you and forget your competition.',
        },
        {
          title:    'Digital content',
          subtitle: 'Post every day. Without burning out',
          body:     'Content with AI, in your voice and your identity. ||Images and videos that stop the scroll, hook and convert.',
        },
      ],
    },
    testimonials: {
      title: 'We have no testimonials',
      desc:  'Our clients ask for results,||not screen time.',
      cta:   'Take the first step',
    },
    nosotros: {
      label: 'About us',
      title: 'The people behind||Hostia',
      members: [
        {
          name: 'Hey, you!',
          designation: 'Co-founder & Strategy Director',
          quote: 'If you made it this far, you know||what you want. Tell me and I\'ll handle it.',
          src: '/nosotros-chico.webp',
        },
        {
          name: 'Shh.',
          designation: 'Co-founder & Creative Director',
          quote: 'This one\'s just for you. Fill the form||and let us do what we do.',
          src: '/nosotros-chica.webp',
        },
        {
          name: 'Win has always been here.',
          designation: 'Undercover Agent',
          quote: 'Watches over us all. And when someone||fills out the form, he purrs.',
          src: '/nosotros-gato.webp',
        },
      ],
    },
    contact: {
      tag:      'Contact',
      headline: "Let's talk",
      sub:      "Not sure yet? Tell us where you are and we'll tell you where to go.",
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
      message:            'Message',
      cta:                'Send',
      thanks:             "Thank you, we'll be in touch.",
      submitError:        'Something went wrong. Please try again.',
      next:               'Next',
      back:               'Back',
      searchPlaceholder:  'Search...',
      steps: [
        {
          title:         'You',
          nameLabel:     'Name',
          emailLabel:    'Email',
          whatsappLabel: 'Phone',
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
        <Testimonials t={t} />
        <Nosotros t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  )
}
