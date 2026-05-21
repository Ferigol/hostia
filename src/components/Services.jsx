import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ContainerTextScroll } from './ui/ContainerTextScroll'
import './Services.css'

const SERVICE_MEDIA = [
  { type: 'video', src: '/servicio-1.mp4' },
  { type: 'video', src: '/servicio-2.mp4' },
  { type: 'video', src: '/servicio-3.mp4' },
]

// ── Video con crossfade seamless entre dos elementos ────────────────────────
function ServiceVideo({ src, onPlay, onPause }) {
  const wrapRef = useRef(null)
  const aRef    = useRef(null)
  const bRef    = useRef(null)
  const s       = useRef({ showing: 'a', swapping: false, playing: false })
  const [showing, setShowing] = useState('a')

  useEffect(() => {
    const wrap = wrapRef.current
    const a    = aRef.current
    const b    = bRef.current
    if (!wrap || !a || !b) return

    const CROSSFADE_AHEAD = 0.5

    const crossfade = (cur, nxt) => {
      if (s.current.swapping) return
      s.current.swapping = true
      nxt.currentTime = 0
      nxt.play().catch(() => {})
      const next = s.current.showing === 'a' ? 'b' : 'a'
      s.current.showing = next
      setShowing(next)
      setTimeout(() => { cur.pause(); cur.currentTime = 0; s.current.swapping = false }, 350)
    }

    const onTimeUpdate = () => {
      if (s.current.swapping) return
      const cur = s.current.showing === 'a' ? a : b
      const nxt = s.current.showing === 'a' ? b : a
      if (cur.duration && cur.currentTime >= cur.duration - CROSSFADE_AHEAD) crossfade(cur, nxt)
    }

    a.addEventListener('timeupdate', onTimeUpdate)
    b.addEventListener('timeupdate', onTimeUpdate)

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!s.current.playing) { s.current.playing = true; onPlay?.() }
        const cur = s.current.showing === 'a' ? a : b
        cur.play().catch(() => {})
      } else {
        if (s.current.playing) { s.current.playing = false; onPause?.() }
        a.pause(); b.pause()
        a.currentTime = 0; b.currentTime = 0
        s.current.showing = 'a'; s.current.swapping = false
        setShowing('a')
      }
    }, { threshold: 0.5 })

    observer.observe(wrap)

    return () => {
      a.removeEventListener('timeupdate', onTimeUpdate)
      b.removeEventListener('timeupdate', onTimeUpdate)
      observer.disconnect()
    }
  }, [onPlay, onPause])

  const videoClass = 'w-full h-full object-cover'
  const baseStyle  = { position: 'absolute', inset: 0, transition: 'opacity 0.35s ease' }

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <video ref={aRef} src={src} className={videoClass}
        style={{ ...baseStyle, opacity: showing === 'a' ? 0.4 : 0 }} muted playsInline />
      <video ref={bRef} src={src} className={videoClass}
        style={{ ...baseStyle, opacity: showing === 'b' ? 0.4 : 0 }} muted playsInline />
    </div>
  )
}

// ── Vignette esquina inferior derecha ───────────────────────────────────────
const VIGNETTE_STYLE = {
  position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
  borderRadius: 'inherit',
  background: 'radial-gradient(circle at bottom right, rgba(0,0,0,0.97) 0%, transparent 28%)',
}

// ── Título sincronizado con el video ────────────────────────────────────────
function VideoServiceTitle({ item, videoPlaying }) {
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [bodyVisible,     setBodyVisible]     = useState(false)

  const SUBTITLE_DELAY = 2000
  const BODY_DELAY     = SUBTITLE_DELAY + 800 + 1000

  useEffect(() => {
    if (!videoPlaying) {
      setSubtitleVisible(false)
      setBodyVisible(false)
      return
    }
    const t1 = setTimeout(() => setSubtitleVisible(true), SUBTITLE_DELAY)
    const t2 = setTimeout(() => setBodyVisible(true),     BODY_DELAY)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [videoPlaying])

  return (
    <div className="relative w-full h-full text-center">
      <div style={VIGNETTE_STYLE} aria-hidden="true" />

      <div className="absolute top-[60px] inset-x-0 flex justify-center px-8 md:px-16" style={{ zIndex: 2 }}>
        <h3 className="text-[clamp(10px,0.9vw,13px)] font-semibold text-white leading-tight tracking-[0.35em] uppercase">
          {item.title}
        </h3>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 md:px-16" style={{ zIndex: 2 }}>
        <motion.p
          className="text-[clamp(20px,2.4vw,30px)] text-white"
          style={{ fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, fontFamily: 'Tomorrow, sans-serif', textTransform: 'uppercase' }}
          initial={{ opacity: 0, y: 24 }}
          animate={subtitleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {item.subtitle}
        </motion.p>
        <motion.p
          className="max-w-3xl"
          style={{ fontSize: 'clamp(16px, 1.4vw, 22px)', fontWeight: 400, lineHeight: 1.75, color: '#ffffff', fontFamily: 'Tomorrow, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={bodyVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {item.body.split('||').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
        </motion.p>
      </div>
    </div>
  )
}

// ── Contenedor de video (genérico para los 3) ───────────────────────────────
function VideoServiceContainer({ item, src }) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const handlePlay  = useCallback(() => setVideoPlaying(true),  [])
  const handlePause = useCallback(() => setVideoPlaying(false), [])

  return (
    <ContainerTextScroll titleComponent={<VideoServiceTitle item={item} videoPlaying={videoPlaying} />}>
      <ServiceVideo src={src} onPlay={handlePlay} onPause={handlePause} />
    </ContainerTextScroll>
  )
}

// ── Componente principal ────────────────────────────────────────────────────
export default function Services({ t }) {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left:       Math.random() * 100,
      top:        Math.random() * 100,
      maxOpacity: Math.random() * 0.5 + 0.4,
      duration:   Math.random() * 3 + 2,
      delay:      Math.random() * 6,
    }))
  , [])

  return (
    <section className="services" id="servicios">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
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

      {t.services.items.map((item, i) => (
        <VideoServiceContainer key={i} item={item} src={SERVICE_MEDIA[i].src} />
      ))}
    </section>
  )
}
