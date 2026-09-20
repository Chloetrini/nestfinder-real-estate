import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

// Fades and slides its content in the first time it scrolls into view.
//   <Reveal>...</Reveal>                    rises from below
//   <Reveal from="left" delay={150}>...     slides in from the left after 150 ms
// Visitors who ask their device for less motion just see the content straight away.
type From = 'up' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  from?: From
  /** Milliseconds to wait before starting (use it to stagger neighbours) */
  delay?: number
  className?: string
  as?: ElementType
}

const hidden: Record<From, string> = {
  up: 'translate-y-8',
  left: '-translate-x-10',
  right: 'translate-x-10',
  none: '',
}

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const Reveal = ({ children, from = 'up', delay = 0, className = '', as: Tag = 'div' }: RevealProps) => {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(() => prefersReducedMotion() || typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  const style: CSSProperties = { transitionDelay: visible ? `${delay}ms` : '0ms' }

  return (
    <Tag
      ref={ref}
      style={style}
      className={`transition-all duration-700 ease-out ${visible ? 'translate-x-0 translate-y-0 opacity-100' : `opacity-0 ${hidden[from]}`} ${className}`}
    >
      {children}
    </Tag>
  )
}

export default Reveal
