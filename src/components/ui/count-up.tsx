import { useEffect, useRef, useState } from 'react'

// A number that counts up from 0 when it scrolls into view
const CountUp = ({ value, suffix = '', duration = 1500, className = '' }: { value: number; suffix?: string; duration?: number; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(value)
      setStarted(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  useEffect(() => {
    if (!started) return
    let frame = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3)))) // ease-out
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, value, duration])

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString()}
      {suffix}
    </span>
  )
}

export default CountUp
