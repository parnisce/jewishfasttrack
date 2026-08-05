import ScrollReveal, { ScrollRevealGroup, ScrollRevealText } from './ScrollReveal'
import './WhyUs.css'

const reasons = [
  {
    stat: '2-in-1',
    statLabel: 'tracker',
    title: 'Fasting + Autophagy',
    description:
      'Most apps do calendars or fasting science. Jewish FastTrack does both — sacred timing and cellular healing insight in one calm app.',
  },
  {
    stat: '25h',
    statLabel: 'major fasts',
    title: 'Built for Long Fasts',
    description:
      'Yom Kippur and Tisha B’Av are long enough for meaningful metabolic shifts. See when fat burning and autophagy may begin for you.',
  },
  {
    stat: 'Dawn',
    statLabel: 'to nightfall',
    title: 'Major & Minor Fasts',
    description:
      'Countdowns stay aligned with local start and end times so minor dawn–nightfall fasts never become a guessing game.',
  },
  {
    stat: '100%',
    statLabel: 'personalized',
    title: 'Your Body, Your Timeline',
    description:
      'Autophagy estimates adapt to your age, weight, and activity — so guidance feels relevant, not generic.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="why-us section-dark">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="ornament-divider" aria-hidden="true">
            <span />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 15.2 7.2 17.6l.9-5.3-3.8-3.7 5.3-.8L12 3z" />
            </svg>
            <span />
          </div>
          <span className="section-label">Why Us</span>
        </ScrollReveal>
        <ScrollRevealText
          text="Why Jewish FastTrack?"
          className="section-title section-title--light section-header-title"
        />
        <ScrollReveal className="section-header" delay={100}>
          <p className="section-subtitle section-subtitle--light">
            The Jewish fasting tracker that also shows when autophagy may start —
            so every fast has spiritual purpose and bodily clarity.
          </p>
        </ScrollReveal>

        <ScrollRevealGroup className="why-grid" stagger={100}>
          {reasons.map((reason) => (
            <article key={reason.title} className="why-card scroll-reveal-item">
              <div className="why-stat">
                <strong>{reason.stat}</strong>
                <span>{reason.statLabel}</span>
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </article>
          ))}
        </ScrollRevealGroup>

        <ScrollReveal className="why-cta" delay={200}>
          <a href="#download" className="btn btn-primary">
            Download Free App
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
