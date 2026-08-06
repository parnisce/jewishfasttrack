import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import ScrollReveal from './ScrollReveal'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Rachel M.',
    role: 'Yom Kippur faster',
    quote:
      'I finally understand both my break-fast countdown and when autophagy may start. Faith and clarity in one place.',
  },
  {
    name: 'David L.',
    role: 'Intermittent faster year-round',
    quote:
      'Fast calendar for the Jewish year, autophagy timeline for every fast. This is the tracker I wish I had years ago.',
  },
  {
    name: 'Sarah K.',
    role: 'Busy parent',
    quote:
      'Start reminders keep our household on time, and the autophagy view helps me stay grounded through long days.',
  },
  {
    name: 'Jonathan S.',
    role: 'Traveling professional',
    quote:
      'Location-based nightfall times plus personalized healing windows — even when I change cities mid-year.',
  },
  {
    name: 'Miriam A.',
    role: 'Community educator',
    quote:
      'Students ask when healing phases begin. Jewish FastTrack makes that conversation clear without drowning out the meaning of the fast.',
  },
]

const AUTO_MS = 6000
const PAUSE_MS = 8000
const DRAG_THRESHOLD = 72

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const pauseUntil = useRef(0)
  const pointerStartX = useRef<number | null>(null)
  const draggingRef = useRef(false)
  const total = testimonials.length

  function goTo(index: number) {
    setActive(((index % total) + total) % total)
    pauseUntil.current = Date.now() + PAUSE_MS
    setDragOffset(0)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() < pauseUntil.current || draggingRef.current) return
      setActive((current) => (current + 1) % total)
    }, AUTO_MS)
    return () => clearInterval(timer)
  }, [total])

  function stackIndexFor(index: number) {
    return (index - active + total) % total
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    pointerStartX.current = event.clientX
    draggingRef.current = true
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return
    setDragOffset(event.clientX - pointerStartX.current)
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return
    const delta = event.clientX - pointerStartX.current
    pointerStartX.current = null
    draggingRef.current = false
    setIsDragging(false)

    if (delta <= -DRAG_THRESHOLD) {
      goTo(active + 1)
    } else if (delta >= DRAG_THRESHOLD) {
      goTo(active - 1)
    } else {
      setDragOffset(0)
      pauseUntil.current = Date.now() + PAUSE_MS
    }
  }

  return (
    <section id="testimonials" className="testimonials section-dark">
      <div className="container testimonials-layout">
        <ScrollReveal className="testimonials-intro">
          <span className="section-label">Testimonials</span>
          <h2 className="testimonials-title">Why They Track With Us</h2>
          <p className="testimonials-desc">
            Real fasters trust Jewish FastTrack because it shows when healing may
            begin — not just when a timer runs out.
          </p>
          <div className="testimonials-stat">
            <strong className="testimonials-stat-value">99%</strong>
            <div className="testimonials-stat-meta">
              <span>Positive Reviews</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="testimonials-slider-wrap" delay={120}>
          <div
            className={`testimonial-stack${isDragging ? ' is-dragging' : ''}`}
            aria-live="polite"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {testimonials.map((item, index) => {
              const stackIndex = stackIndexFor(index)
              if (stackIndex > 3) return null

              const layerDrag =
                stackIndex === 0 ? dragOffset : stackIndex === 1 ? dragOffset * 0.35 : 0

              return (
                <article
                  key={item.name}
                  className={`testimonial-card${stackIndex === 0 ? ' is-active' : ''}`}
                  style={
                    {
                      '--stack-index': stackIndex,
                      '--drag-offset': `${layerDrag}px`,
                    } as CSSProperties
                  }
                  aria-hidden={stackIndex !== 0}
                >
                  <div className="testimonial-rating">
                    <span className="testimonial-rating-badge">Rating</span>
                    <div className="testimonial-stars" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="testimonial-score">5.0</span>
                  </div>

                  <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>

                  <div className="testimonial-author">
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="testimonial-dots">
            {testimonials.map((t, index) => (
              <button
                key={t.name}
                type="button"
                className={`testimonial-dot${index === active ? ' active' : ''}`}
                onClick={() => goTo(index)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={index === active ? 'true' : undefined}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
