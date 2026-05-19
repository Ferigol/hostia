import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(0, 0, 0)",
  gradientBackgroundEnd   = "rgb(0, 0, 0)",
  firstColor   = "248, 105, 67",
  secondColor  = "80, 15, 245",
  thirdColor   = "200, 60, 180",
  fourthColor  = "248, 105, 67",
  fifthColor   = "80, 15, 245",
  pointerColor = "180, 70, 160",
  size         = "70%",
  blendingValue = "screen",
  children,
  className,
  interactive = true,
  containerClassName,
}) => {
  const interactiveRef = useRef(null)

  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX,  setTgX]  = useState(0)
  const [tgY,  setTgY]  = useState(0)

  useEffect(() => {
    const el = document.body
    el.style.setProperty("--gradient-background-start", gradientBackgroundStart)
    el.style.setProperty("--gradient-background-end",   gradientBackgroundEnd)
    el.style.setProperty("--first-color",   firstColor)
    el.style.setProperty("--second-color",  secondColor)
    el.style.setProperty("--third-color",   thirdColor)
    el.style.setProperty("--fourth-color",  fourthColor)
    el.style.setProperty("--fifth-color",   fifthColor)
    el.style.setProperty("--pointer-color", pointerColor)
    el.style.setProperty("--size",          size)
    el.style.setProperty("--blending-value", blendingValue)
  }, [])

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return
      setCurX(c => {
        const next = c + (tgX - c) / 20
        interactiveRef.current.style.transform =
          `translate(${Math.round(next)}px, ${Math.round(curY + (tgY - curY) / 20)}px)`
        return next
      })
      setCurY(c => c + (tgY - c) / 20)
    }
    move()
  }, [tgX, tgY])

  const handleMouseMove = (event) => {
    if (!interactiveRef.current) return
    const rect = interactiveRef.current.getBoundingClientRect()
    setTgX(event.clientX - rect.left)
    setTgY(event.clientY - rect.top)
  }

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  return (
    <div
      onMouseMove={interactive ? handleMouseMove : undefined}
      className={cn(
        "h-screen w-full relative overflow-hidden top-0 left-0",
        "bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      {/* SVG goo filter */}
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Content slot — must be positioned above gradients */}
      <div className={cn("", className)}>{children}</div>

      {/* Animated gradient blobs */}
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        {/* Orb 1 — orange, moves vertically */}
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.9)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:center_center]",
          "animate-first opacity-100"
        )} />

        {/* Orb 2 — lila, moves in circle offset left */}
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.85)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%-400px)]",
          "animate-second opacity-100"
        )} />

        {/* Orb 3 — blend, moves in circle offset right */}
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%+400px)]",
          "animate-third opacity-100"
        )} />

        {/* Orb 4 — orange accent, moves horizontally */}
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%-200px)]",
          "animate-fourth opacity-70"
        )} />

        {/* Orb 5 — lila accent, moves in circle far offset */}
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%-800px)_calc(50%+800px)]",
          "animate-fifth opacity-100"
        )} />

        {/* Interactive pointer orb — follows cursor */}
        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.7)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2",
              "opacity-70"
            )}
          />
        )}
      </div>
    </div>
  )
}
