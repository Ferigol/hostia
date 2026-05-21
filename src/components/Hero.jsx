import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BackgroundGradientAnimation } from './ui/BackgroundGradientAnimation'
import DraggableImage from './DraggableImage'
import './Hero.css'

const STEP = 130      // ms between each word
const LINE_GAP = 200  // ms gap between line 1 and line 2
const LINE1_START = 2000  // empieza después de que las imágenes terminen (~1.9s)

export default function Hero({ t }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const pillarsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const pillarsY       = useTransform(scrollYProgress, [0, 0.3], [0, 20])

  // Split headline into lines and compute staggered delays
  const lines = t.hero.headline.split('||').map(l => l.trim())
  const line1Words  = lines[0].split(' ').length
  const LINE2_START = LINE1_START + line1Words * STEP + LINE_GAP
  const line2Words  = lines[1] ? lines[1].split(' ').length : 0
  const PILLARS_START = LINE2_START + line2Words * STEP + 350

  const SUBTITLE_START = LINE2_START + line2Words * STEP + 150

  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top:  Math.random() * 100,
      maxOpacity: Math.random() * 0.5 + 0.4,
      duration:   Math.random() * 3 + 2,
      delay:      Math.random() * 6,
    }))
  , [])

  return (
    <div ref={heroRef}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(0, 0, 0)"
        gradientBackgroundEnd="rgb(0, 0, 0)"
        firstColor="248, 105, 67"
        secondColor="80, 15, 245"
        thirdColor="248, 105, 67"
        fourthColor="80, 15, 245"
        fifthColor="248, 105, 67"
        pointerColor="80, 15, 245"
        size="70%"
        blendingValue="screen"
        interactive={true}
        containerClassName="hero-bg"
      >
        {/* Twinkling stars */}
        <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
          {stars.map(s => (
            <motion.div
              key={s.id}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ left: `${s.left}%`, top: `${s.top}%` }}
              animate={{ opacity: [0, s.maxOpacity, 0] }}
              transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div id="hero" className="absolute inset-0 z-50 flex flex-col items-center justify-center hero-content-wrapper">

          {/* Images — absolutely positioned behind the title */}
          <div className="hero__img-left">
            <DraggableImage src="/image-hero-1.webp" alt="Proyecto web 1" width={210} height={272} floatPhase={0} />
          </div>
          <div className="hero__img-right">
            <DraggableImage src="/image-hero-2.webp" alt="Proyecto web 2" width={210} height={272} floatPhase={Math.PI} />
          </div>

          {/* Headline – word-by-word animation, in front of images */}
          <h1 className="hero__headline">
            {lines.map((line, lineIdx) => {
              const lineStart = lineIdx === 0 ? LINE1_START : LINE2_START
              const words = line.split(' ')
              return (
                <span key={lineIdx} style={{ display: 'block' }}>
                  {words.flatMap((word, i) => {
                    const span = (
                      <span
                        key={`${word}-${i}`}
                        className="word-animate"
                        style={{ animationDelay: `${lineStart + i * STEP}ms` }}
                      >
                        {word}
                      </span>
                    )
                    return i < words.length - 1 ? [span, ' '] : [span]
                  })}
                </span>
              )
            })}
          </h1>

          {/* Subtitle — dos líneas bajo el headline */}
          <div className="hero__subtitle">
            {t.hero.subtitle.map((line, i) => (
              <p
                key={i}
                className="link-animate"
                style={{ animationDelay: `${SUBTITLE_START + i * 180}ms` }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Scroll arrow — debajo del subtítulo */}
          <div className="hero__scroll">
            <a
              href="#servicios"
              className="hero__scroll-link"
              aria-label="Ir a Servicios"
              style={{ animationDelay: `${SUBTITLE_START + t.hero.subtitle.length * 180 + 600}ms` }}
            >
              <div className="hero__scroll-line" />
              <div className="hero__scroll-head" />
            </a>
          </div>

          {/* Pillars — pie del hero */}
          <motion.div
            className="hero__pillars"
            style={{ opacity: pillarsOpacity, y: pillarsY }}
          >
            <div className="hero__pillar">
              <span className="pillar__title link-animate" style={{ animationDelay: `${PILLARS_START}ms` }}>
                {t.hero.pillars[0].title}
              </span>
              <span className="pillar__sub link-animate" style={{ animationDelay: `${PILLARS_START + 100}ms` }}>
                {t.hero.pillars[0].sub}
              </span>
            </div>
            <div className="hero__pillar hero__pillar--center">
              <span className="pillar__title link-animate" style={{ animationDelay: `${PILLARS_START + 200}ms` }}>
                {t.hero.pillars[1].title}
              </span>
              <span className="pillar__sub link-animate" style={{ animationDelay: `${PILLARS_START + 300}ms` }}>
                {t.hero.pillars[1].sub}
              </span>
            </div>
            <div className="hero__pillar hero__pillar--right">
              <span className="pillar__title link-animate" style={{ animationDelay: `${PILLARS_START + 400}ms` }}>
                {t.hero.pillars[2].title}
              </span>
              <span className="pillar__sub link-animate" style={{ animationDelay: `${PILLARS_START + 500}ms` }}>
                {t.hero.pillars[2].sub}
              </span>
            </div>
          </motion.div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  )
}
