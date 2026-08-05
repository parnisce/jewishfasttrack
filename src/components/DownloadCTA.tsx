import PhoneMockup from './PhoneMockup'
import ScrollReveal from './ScrollReveal'
import StoreBadges from './StoreBadges'
import './DownloadCTA.css'

export default function DownloadCTA() {
  return (
    <section id="download" className="download-cta section-dark">
      <div className="container download-cta-inner">
        <ScrollReveal className="download-cta-content">
          <p className="download-hebrew" lang="he" dir="rtl">צום מועיל</p>
          <span className="section-label">Start tracking today</span>
          <h2 className="section-title">
            Download the Jewish fasting &amp; autophagy tracker.
          </h2>
          <p className="section-subtitle">
            Break-fast alerts, fast calendars, and a personalized autophagy
            timeline — in one calm Jewish fasting app.
          </p>
          <StoreBadges />
        </ScrollReveal>

        <ScrollReveal className="download-cta-phones" delay={150} aria-hidden="true">
          <PhoneMockup variant="dashboard" className="dl-phone-left" />
          <PhoneMockup variant="countdown" className="dl-phone-right" />
        </ScrollReveal>
      </div>
    </section>
  )
}
