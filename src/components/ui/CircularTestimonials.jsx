import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './CircularTestimonials.css'

function calculateGap(width) {
  const minWidth = 1024, maxWidth = 1456, minGap = 60, maxGap = 86
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

export default function CircularTestimonials({
  testimonials,
  autoplay = true,
  autoplayInterval = 5000,
  colors = {},
  fontSizes = {},
  onIndexChange,
}) {
  const colorName        = colors.name              ?? '#ffffff'
  const colorDesignation = colors.designation       ?? 'rgba(255,255,255,0.5)'
  const colorTestimony   = colors.testimony         ?? 'rgba(255,255,255,0.75)'
  const colorArrowBg     = colors.arrowBackground   ?? '#1a1a1a'
  const colorArrowFg     = colors.arrowForeground   ?? '#f1f1f7'
  const colorArrowHover  = colors.arrowHoverBackground ?? '#f86943'
  const fontSizeName     = fontSizes.name           ?? '1.5rem'
  const fontSizeDesig    = fontSizes.designation    ?? '0.925rem'
  const fontSizeQuote    = fontSizes.quote          ?? '1.125rem'

  const [activeIndex, setActiveIndex]       = useState(0)
  const [hoverNext, setHoverNext]           = useState(false)
  const [containerWidth, setContainerWidth] = useState(600)
  const [inView, setInView]                 = useState(false)

  const imageContainerRef  = useRef(null)
  const autoplayRef        = useRef(null)
  const sectionRef         = useRef(null)

  const len             = useMemo(() => testimonials.length, [testimonials])
  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials])

  useEffect(() => { onIndexChange?.(activeIndex) }, [activeIndex, onIndexChange])

  useEffect(() => {
    function onResize() {
      if (imageContainerRef.current) setContainerWidth(imageContainerRef.current.offsetWidth)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex(p => (p + 1) % len)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [len])

  const handlePrev = useCallback(() => {
    setActiveIndex(p => (p - 1 + len) % len)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [len])

  // Detecta cuando la sección entra en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(0)   // siempre empieza por el chico
          setInView(true)
        } else {
          setInView(false)
          if (autoplayRef.current) clearInterval(autoplayRef.current)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Autoplay solo cuando la sección es visible
  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    if (!autoplay || !inView) return

    autoplayRef.current = setInterval(() => {
      setActiveIndex(p => {
        if (p >= len - 1) {
          clearInterval(autoplayRef.current)
          return p
        }
        const next = p + 1
        if (next >= len - 1) clearInterval(autoplayRef.current)
        return next
      })
    }, autoplayInterval)

    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [autoplay, autoplayInterval, len, inView])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlePrev, handleNext])

  function getImageStyle(index) {
    const gap       = calculateGap(containerWidth)
    const maxStickUp = gap * 0.8
    const isActive  = index === activeIndex
    const isLeft    = (activeIndex - 1 + len) % len === index
    const isRight   = (activeIndex + 1) % len === index

    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: 'auto',
      transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    }
    if (isLeft) return {
      zIndex: 2, opacity: 1, pointerEvents: 'auto',
      transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    }
    if (isRight) return {
      zIndex: 2, opacity: 1, pointerEvents: 'auto',
      transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    }
    return { zIndex: 1, opacity: 0, pointerEvents: 'none', transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' }
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -20 },
  }

  return (
    <div className="ct-container" ref={sectionRef}>
      <div className="ct-grid">

        {/* Images */}
        <div className="ct-images" ref={imageContainerRef}>
          {testimonials.map((item, index) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.name}
              className="ct-image"
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* Content */}
        <div className="ct-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className="ct-name" style={{ color: colorName, fontSize: fontSizeName }}>
                {activeTestimonial.name}
              </h3>
              <p className="ct-designation" style={{ color: colorDesignation, fontSize: fontSizeDesig }}>
                {activeTestimonial.designation}
              </p>
              <motion.p className="ct-quote" style={{ color: colorTestimony, fontSize: fontSizeQuote }}>
                {activeTestimonial.quote.split('||').map((line, li) => (
                  <span key={li} style={{ display: 'block' }}>
                    {line.trim().split(' ').map((word, i) => (
                      <motion.span
                        key={`${li}-${i}`}
                        initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                        animate={{ filter: 'blur(0px)',  opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut', delay: 0.025 * (li * 10 + i) }}
                        style={{ display: 'inline-block' }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Arrows — sibling del grid para poder reordenarlo en mobile */}
        <div className="ct-arrows">
          <button
            className="ct-arrow"
            onClick={handleNext}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            style={{
              backgroundColor: hoverNext ? '#ffffff' : colorArrowBg,
              boxShadow: hoverNext
                ? '-10px 0 32px 12px rgba(80, 16, 245, 0.65), 10px 0 32px 12px rgba(248, 105, 67, 0.65)'
                : '-8px 0 26px 8px rgba(80, 16, 245, 0.4), 8px 0 26px 8px rgba(248, 105, 67, 0.4)',
            }}
            aria-label="Siguiente"
          >
            <motion.span
              style={{ display: 'flex' }}
              animate={hoverNext || activeIndex === len - 1 ? { x: 0 } : { x: [0, 5, 0] }}
              transition={hoverNext || activeIndex === len - 1 ? {} : {
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ArrowRight size={18} color={hoverNext ? '#000000' : colorArrowFg} />
            </motion.span>
          </button>
        </div>

      </div>
    </div>
  )
}
