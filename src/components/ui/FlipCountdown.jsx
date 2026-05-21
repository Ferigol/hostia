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
      overflow: 'hidden',
      width: '80px',
      height: '100px',
      borderRadius: '14px',
      border: 'none',
      boxShadow: '0 0 18px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
      flexShrink: 0,
    }}>
      {/* dark gradient bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, #1c1c28 0%, #0a0a0f 50%, #111118 100%)',
      }} />

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

      {/* scan lines */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity: 0.25 }}>
        <div style={{ position:'absolute', top:'10px', left:'6px', right:'6px', height:'1px', background:'linear-gradient(to right, transparent, #ffffff, transparent)' }} />
        <div style={{ position:'absolute', top:'50%', left:'6px', right:'6px', height:'1px', backgroundColor:'#4a4a5a', transform:'translateY(-50%)' }} />
        <div style={{ position:'absolute', bottom:'10px', left:'6px', right:'6px', height:'1px', background:'linear-gradient(to right, transparent, #ffffff, transparent)' }} />
      </div>

      {/* corner dots */}
      <div style={{ position:'absolute', top:'6px',  left:'6px',  width:'5px', height:'5px', borderRadius:'50%', backgroundColor:'#4a4a5a' }} />
      <div style={{ position:'absolute', top:'6px',  right:'6px', width:'5px', height:'5px', borderRadius:'50%', backgroundColor:'#4a4a5a' }} />
      <div style={{ position:'absolute', bottom:'6px', left:'6px',  width:'5px', height:'5px', borderRadius:'50%', backgroundColor:'#4a4a5a' }} />
      <div style={{ position:'absolute', bottom:'6px', right:'6px', width:'5px', height:'5px', borderRadius:'50%', backgroundColor:'#4a4a5a' }} />
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
          <FlipDigit key={i} value={digit} />
        ))}
      </div>
      <span style={{
        fontFamily: 'Tomorrow, sans-serif',
        fontWeight: 500,
        fontSize: '13px',
        letterSpacing: '0.2em',
        color: '#ffffff',
        textShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 22px rgba(255,255,255,0.5)',
        marginTop: '20px',
      }}>
        SEGUNDOS
      </span>
    </div>
  )
}
