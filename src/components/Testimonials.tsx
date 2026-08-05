import { useEffect, useState } from 'react'
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
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const total = testimonials.length

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % total)
    }, 6000)
    return () => clearInterval(timer)
  }, [total])

  const item = testimonials[active]

  return (
    <section id="testimonials" className="testimonials section-dark">
      <div className="container testimonials-layout">
        <ScrollReveal className="testimonials-intro">
          <span className="section-label">Testimonials</span>
          <h2 className="testimonials-title">Why They Track With Us</h2>
          <p className="testimonials-desc">
            People use Jewish FastTrack to stay on time for fast days — and to
            understand when autophagy may begin during the fast.
          </p>
          <div className="testimonials-stat">
            <strong className="testimonials-stat-value">2</strong>
            <div className="testimonials-stat-meta">
              <span>Trackers in one app</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="testimonials-panel" delay={120}>
          <article className="testimonial-card" key={item.name}>
            <div className="testimonial-stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
            <div className="testimonial-author">
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          </article>

          <div className="testimonial-dots">
            {testimonials.map((t, index) => (
              <button
                key={t.name}
                type="button"
                className={`testimonial-dot${index === active ? ' active' : ''}`}
                onClick={() => setActive(index)}
                aria-label={`Show testimonial from ${t.name}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
