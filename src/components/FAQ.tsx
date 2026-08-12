import { useState } from 'react'
import { faqs } from '../data/faqs'
import ScrollReveal, { ScrollRevealGroup, ScrollRevealText } from './ScrollReveal'
import './FAQ.css'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="faq section-dark">
      <div className="container">
        <ScrollReveal className="faq-header">
          <span className="section-label">Let&apos;s Get You Started</span>
        </ScrollReveal>
        <ScrollRevealText
          text="We're Here to Help"
          className="section-title faq-header-title"
        />
        <ScrollReveal className="faq-header" delay={100}>
          <p className="section-subtitle">
            Common questions about Jewish fasting tracking and autophagy insight.
          </p>
        </ScrollReveal>

        <ScrollRevealGroup className="faq-list" stagger={70}>
          {faqs.map((item, i) => (
            <div key={item.q} className={`faq-item scroll-reveal-item ${open === i ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {item.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  )
}
