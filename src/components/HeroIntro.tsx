import ScrollReveal from './ScrollReveal'
import './HeroIntro.css'

export default function HeroIntro() {
  return (
    <section className="hero-intro section-dark">
      <div className="container hero-intro-grid">
        <ScrollReveal as="article" className="intro-card" delay={0}>
          <p className="intro-hebrew" lang="he" dir="rtl">
            בְּרָכָה
          </p>
          <h2>Jewish fasting + autophagy, together</h2>
          <p>
            Jewish FastTrack is built for sacred fast days — Yom Kippur, Tisha
            B&apos;Av, and the minor fasts — with an autophagy tracker that shows
            when your body may enter deeper cellular cleanup.
          </p>
          <p>
            Stay present in the meaning of the day while understanding what your
            body is doing from dawn to nightfall — without turning the fast into
            a numbers game.
          </p>
        </ScrollReveal>

        <ScrollReveal as="article" className="intro-about" delay={120}>
          <p className="intro-shalom" lang="he" dir="rtl">
            שָׁלוֹם
          </p>
          <h2>
            About <span className="intro-accent">Jewish FastTrack</span>
          </h2>
          <p>
            One app for the rhythm of Jewish fast days and the science of fasting.
            Location-aware start and end times, gentle countdowns, and a
            personalized autophagy timeline based on your profile.
          </p>
          <p>
            Built for people who want structure for the fast — and clearer insight
            into when healing phases may begin during each day.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
