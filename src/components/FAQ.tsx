import { useState } from 'react'
import ScrollReveal, { ScrollRevealGroup, ScrollRevealText } from './ScrollReveal'
import './FAQ.css'

const faqs = [
  {
    q: 'What is Jewish FastTrack?',
    a: 'It is a Jewish fasting tracker with a built-in autophagy tracker. Track Yom Kippur, Tisha B’Av, and minor fasts — and see estimated windows when cellular cleanup may begin during your fast.',
  },
  {
    q: 'What is autophagy, and why track it on a fast day?',
    a: 'Autophagy is your body’s process of clearing damaged cells and regenerating healthier ones. It often increases during longer fasts. Major Jewish fasts are typically long enough that many people want to understand when that phase may begin — without losing focus on the meaning of the day.',
  },
  {
    q: 'How does the Autophagy Tracker work?',
    a: 'Enter simple profile details like age, weight, and activity level. The app estimates when fat burning and autophagy may start for your body during a fast, then shows those phases on a clear timeline.',
  },
  {
    q: 'Does this replace my community’s fast schedule?',
    a: 'No. Jewish FastTrack is a personal companion. When your local synagogue or community timetable differs, follow your trusted local guidance.',
  },
  {
    q: 'Is the app only useful on major fast days?',
    a: 'Major fasts are a core experience, but fasting and autophagy tracking can also support minor dawn–nightfall fasts and intentional fasts throughout the year.',
  },
  {
    q: 'Is Jewish FastTrack free?',
    a: 'Yes — download free on iOS and Android. Core fasting and autophagy tools are built to help you stay consistent without unnecessary friction.',
  },
]

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
