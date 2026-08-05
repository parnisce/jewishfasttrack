import type { ReactNode } from 'react'
import ScrollReveal, { ScrollRevealGroup, ScrollRevealText } from './ScrollReveal'
import './AppFeatures.css'

const features: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    title: 'Jewish Fasting Tracker',
    description:
      'Track every fast — major and minor — with location-based start and end times, streaks, and calm daily check-ins.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 3v18M8 7c2-2 8-2 8 0s-6 2-8 0M8 17c2 2 8 2 8 0s-6-2-8 0" />
      </svg>
    ),
    title: 'Autophagy Tracker',
    description:
      'See estimated windows for fat burning and autophagy during your fast — personalized to your age, weight, and activity.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 15.2 7.2 17.6l.9-5.3-3.8-3.7 5.3-.8L12 3z" />
      </svg>
    ),
    title: 'Fast Calendar',
    description:
      'Yom Kippur, Tisha B’Av, and the minor fasts on one calendar so you always know what is coming next.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Break-fast Countdown',
    description:
      'Precise countdowns and gentle reminders so you never miss the start or end of the fast.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'Autophagy Timeline',
    description:
      'A clear visual of glucose burn, ketosis, and autophagy phases as your fast progresses.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    title: 'Hydration Guidance',
    description:
      'Tips for recovering after the fast and preparing well for the next long day.',
  },
]

export default function AppFeatures() {
  return (
    <section id="features" className="app-features section-dark">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="ornament-divider" aria-hidden="true">
            <span />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 15.2 7.2 17.6l.9-5.3-3.8-3.7 5.3-.8L12 3z" />
            </svg>
            <span />
          </div>
          <span className="section-label">App Features</span>
        </ScrollReveal>
        <ScrollRevealText
          text="Fasting for Faith. Tracking for Clarity."
          className="section-title section-title--light section-header-title"
        />
        <ScrollReveal className="section-header" delay={100}>
          <p className="section-subtitle section-subtitle--light">
            Tools for Jewish fast days — plus science-backed autophagy insight
            during every fast.
          </p>
        </ScrollReveal>

        <ScrollRevealGroup className="features-grid" stagger={90}>
          {features.map((feature) => (
            <article key={feature.title} className="feature-card scroll-reveal-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  )
}
