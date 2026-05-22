import { useState, useEffect, useMemo } from 'react'

function FlipDigit({ value }) {
  const [displayValue, setDisplayValue] = useState(value)
  const [fading, setFading]             = useState(false)

  useEffect(() => {
    if (value !== displayValue) {
      setFading(true)
      setTimeout(() => {
        setDisplayValue(value)
        setFading(false)
      }, 120)
    }
  }, [value, displayValue])

  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      width: '80px',
      height: '100px',
      flexShrink: 0,
    }}>
      {/* digit */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Tomorrow, sans-serif',
        fontWeight: 900,
        fontSize: '2.4rem',
        color: '#ffffff',
        textShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 22px rgba(255,255,255,0.5)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 120ms ease-out',
      }}>
        {displayValue}
      </div>

    </div>
  )
}

export function FlipCountdown({
  countFrom   = 120,
  countTo     = 0,
  intervalMs  = 1000,
  started     = true,
}) {
  const from           = useMemo(() => BigInt(countFrom), [countFrom])
  const to             = useMemo(() => BigInt(countTo),   [countTo])
  const isCountingDown = from > to
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!started) return
    if ((isCountingDown && count <= to) || (!isCountingDown && count >= to)) return
    const timer = setInterval(() => {
      setCount(prev => isCountingDown ? prev - 1n : prev + 1n)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [count, to, isCountingDown, intervalMs, started])

  const digits = useMemo(() => {
    const maxVal    = from > to ? from : to
    const numDigits = String(maxVal).length
    const display   = count < 0n ? 0n : count
    return String(display).padStart(numDigits, '0').split('').map(Number)
  }, [count, from, to])

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
      <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
        {digits.map((digit, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            {i > 0 && (
              <div style={{
                width: '1px',
                height: '48px',
                background: 'linear-gradient(to bottom, transparent, #ffffff 40%, #ffffff 60%, transparent)',
                flexShrink: 0,
                boxShadow: '0 0 8px 3px rgba(255,255,255,0.7), 0 0 18px 6px rgba(255,255,255,0.3)',
                maskImage: 'linear-gradient(to bottom, transparent, white 35%, white 65%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 35%, white 65%, transparent)',
              }} />
            )}
            <FlipDigit value={digit} />
          </div>
        ))}
      </div>
      <span style={{
        fontFamily: 'Tomorrow, sans-serif',
        fontWeight: 500,
        fontSize: '13px',
        letterSpacing: '0.2em',
        color: '#ffffff',
        textShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 22px rgba(255,255,255,0.5)',
        marginTop: '0px',
      }}>
        SEGUNDOS
      </span>
    </div>
  )
}
