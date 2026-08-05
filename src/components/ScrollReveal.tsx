import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import './ScrollReveal.css'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
} & HTMLAttributes<HTMLElement>

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal${visible ? ' is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}

type ScrollRevealTextProps = {
  text: string
  className?: string
  delay?: number
  as?: ElementType
  stagger?: number
}

export function ScrollRevealText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h2',
  stagger = 55,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const words = text.trim().split(/\s+/)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -32px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal-text${visible ? ' is-visible' : ''} ${className}`.trim()}
      style={
        {
          '--text-delay': `${delay}ms`,
          '--text-stagger': `${stagger}ms`,
        } as CSSProperties
      }
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="scroll-reveal-word"
          style={{ '--word-index': i } as CSSProperties}
        >
          <span className="scroll-reveal-word-inner">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}

type ScrollRevealGroupProps = {
  children: ReactNode
  className?: string
  stagger?: number
}

export function ScrollRevealGroup({
  children,
  className = '',
  stagger = 100,
}: ScrollRevealGroupProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`scroll-reveal-group${visible ? ' is-visible' : ''} ${className}`.trim()}
      style={{ '--stagger': `${stagger}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
