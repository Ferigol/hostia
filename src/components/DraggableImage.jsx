import { useRef, useEffect } from 'react'

const lerp = (a, b, n) => (1 - n) * a + n * b

let zTop = 4   // headline está en z-50, las imágenes nunca lo superan en uso normal

export default function DraggableImage({ src, alt, width = 240, height = 310 }) {
  const outerRef = useRef(null)
  const imgRef  = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const img   = imgRef.current

    const s = {
      dragging: false,
      startX: 0, startY: 0,
      tx: 0, ty: 0,
      lx: 0, ly: 0,
      outerScale: 1,
      imgScale: 1,
    }

    let raf

    function tick() {
      s.lx = lerp(s.lx, s.tx, 0.1)
      s.ly = lerp(s.ly, s.ty, 0.1)
      s.outerScale = lerp(s.outerScale, s.dragging ? 0.95 : 1,   0.1)
      s.imgScale   = lerp(s.imgScale,   s.dragging ? 1.06 : 1,   0.1)

      outer.style.transform = `translate(${s.lx}px, ${s.ly}px) scale(${s.outerScale})`
      // Inner img: scale from top-right so the notch corner stays anchored
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

    outer.addEventListener('pointerdown', onDown)
    outer.addEventListener('pointermove', onMove)
    outer.addEventListener('pointerup',   onUp)
    outer.addEventListener('pointercancel', onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      outer.removeEventListener('pointerdown', onDown)
      outer.removeEventListener('pointermove', onMove)
      outer.removeEventListener('pointerup',   onUp)
      outer.removeEventListener('pointercancel', onUp)
    }
  }, [])

  return (
    <div
      ref={outerRef}
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        touchAction: 'none',
        willChange: 'transform',
        borderRadius: 0,       // esquinas rectas
        flexShrink: 0,
        cursor: 'grab',
        zIndex: 20,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top right', // el recorte superior derecho siempre visible
          transformOrigin: 'top right', // el scale se expande hacia abajo-izquierda
          willChange: 'transform',
          pointerEvents: 'none',
          display: 'block',
        }}
      />
    </div>
  )
}
