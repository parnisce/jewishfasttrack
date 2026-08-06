import StoreBadges from './StoreBadges'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-media" aria-hidden="true">
        <div className="hero-bg-shade" />
        <div className="hero-pattern" />
      </div>

      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <svg className="hero-star" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 8l6.5 12.8 14.1 2-10.2 10 2.4 14.1L32 39.6 19.2 46.9l2.4-14.1-10.2-10 14.1-2L32 8z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M32 16l8 14H24z" stroke="currentColor" strokeWidth="1.25" />
          <path d="M32 48l-8-14h16z" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </div>

      <div className="hero-content">
        <p className="hero-hebrew" lang="he" dir="rtl">
          צום קל
        </p>
        <div className="hero-ornament" aria-hidden="true">
          <span />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 15.2 7.2 17.6l.9-5.3-3.8-3.7 5.3-.8L12 3z" />
          </svg>
          <span />
        </div>
        <h1 className="hero-title">
          Jewish fasting tracker with autophagy insight.
        </h1>
        <p className="hero-subtitle">
          Track Yom Kippur, Tisha B&apos;Av, and minor fasts — plus see when
          cellular healing likely begins. Faith first. Science clear.
        </p>
        <div className="hero-actions">
          <StoreBadges />
        </div>
      </div>

      <div className="hero-phones-clip">
        <img
          src="/images/jewish-hero-phones.png"
          alt="Jewish FastTrack app screens showing home, autophagy calculator, and Torah guidance"
          className="hero-phones-image"
        />
      </div>
    </section>
  )
}
