import { useRef, useEffect } from 'react'

const lerp = (a, b, n) => (1 - n) * a + n * b

let zTop = 4

export default function DraggableImage({ src, alt, width = 240, height = 310, floatPhase = 0 }) {
  const outerRef = useRef(null)
  const imgRef   = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const img   = imgRef.current

    const s = {
      dragging:    false,
      startX: 0,  startY: 0,
      tx: 0,      ty: 0,
      lx: 0,      ly: 0,
      outerScale:  1,
      imgScale:    1,
      floatFactor: 1,   // 1 = flotando libre, lerpa a 0 mientras arrastra
    }

    let raf
    const t0 = performance.now()

    function tick(now) {
      const t = (now - t0) / 1000   // segundos transcurridos

      // Factor de float: 1 en reposo, 0 mientras arrastra (transición suave)
      s.floatFactor = lerp(s.floatFactor, s.dragging ? 0 : 1, 0.03)

      // Movimiento orbital lento: Y principal + X secundario en fase distinta
      const floatY = Math.sin(t * 0.85 + floatPhase)        * 11 * s.floatFactor
      const floatX = Math.sin(t * 0.55 + floatPhase + 1.3)  *  5 * s.floatFactor

      s.lx = lerp(s.lx, s.tx, 0.1)
      s.ly = lerp(s.ly, s.ty, 0.1)
      s.outerScale = lerp(s.outerScale, s.dragging ? 0.95 : 1,   0.1)
      s.imgScale   = lerp(s.imgScale,   s.dragging ? 1.06 : 1,   0.1)

      outer.style.transform = `translate(${s.lx + floatX}px, ${s.ly + floatY}px) scale(${s.outerScale})`
      img.style.transform   = `scale(${s.imgScale})`

      raf = requestAnimationFrame(tick)
    }

    function onDown(e) {
      s.dragging = true
      s.startX = e.clientX - s.lx
      s.startY = e.clientY - s.ly
      outer.style.cursor = 'grabbing'
      outer.style.zIndex = ++zTop
      outer.setPointerCapture(e.pointerId)
    }

    function onMove(e) {
      if (!s.dragging) return
      s.tx = e.clientX - s.startX
      s.ty = e.clientY - s.startY
    }

    function onUp() {
      if (!s.dragging) return
      s.dragging = false
      outer.style.cursor = 'grab'
    }

    outer.addEventListener('pointerdown',   onDown)
    outer.addEventListener('pointermove',   onMove)
    outer.addEventListener('pointerup',     onUp)
    outer.addEventListener('pointercancel', onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      outer.removeEventListener('pointerdown',   onDown)
      outer.removeEventListener('pointermove',   onMove)
      outer.removeEventListener('pointerup',     onUp)
      outer.removeEventListener('pointercancel', onUp)
    }
  }, [floatPhase])

  return (
    <div
      ref={outerRef}
      style={{
        width,
        height,
        position:   'relative',
        overflow:   'hidden',
        userSelect: 'none',
        touchAction:'none',
        willChange: 'transform',
        borderRadius: 0,
        flexShrink: 0,
        cursor:     'grab',
        zIndex:     20,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position:        'absolute',
          inset:           0,
          width:           '100%',
          height:          '100%',
          objectFit:       'cover',
          objectPosition:  'top right',
          transformOrigin: 'top right',
          willChange:      'transform',
          pointerEvents:   'none',
          display:         'block',
        }}
      />
    </div>
  )
}
