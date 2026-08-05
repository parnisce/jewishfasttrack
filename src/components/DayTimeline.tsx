import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import ScrollReveal, { ScrollRevealText } from './ScrollReveal'
import './DayTimeline.css'

const STAGE_DURATION = 5000

type Stage = {
  id: string
  label: string
  time: string
  progress: number
  color: string
  headline: string
  explanation: string
  tip: string
  icon: ReactNode
}

const stages: Stage[] = [
  {
    id: 'fast-begins',
    label: 'Fast Begins',
    time: '0 – 12 h',
    progress: 0,
    color: '#c8ccd4',
    headline: 'From nightfall or dawn into the fast',
    explanation:
      'As the fast begins — at nightfall for major fasts, or at dawn for minor ones — your body uses glucose and stored glycogen. Jewish FastTrack tracks your window while you stay focused on the day.',
    tip: 'Set a start reminder so the fast begins calm — not rushed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 3v3M8 7h8M6 10h12v2a6 6 0 0 1-12 0v-2z" />
        <path d="M9 21h6" />
      </svg>
    ),
  },
  {
    id: 'fat-burn',
    label: 'Fat Burning',
    time: '12 – 16 h',
    progress: 33.33,
    color: '#2f4468',
    headline: 'Your body shifts toward fat for fuel',
    explanation:
      'As glycogen runs lower, fat burning ramps up. On longer fasts like Yom Kippur, this phase often arrives well before nightfall — shown clearly on your autophagy timeline.',
    tip: 'Stay occupied with prayer, study, and rest. Hunger usually softens in this window.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M21 12a9 9 0 1 1-9-9" />
        <polyline points="21 3 21 9 15 9" />
      </svg>
    ),
  },
  {
    id: 'autophagy',
    label: 'Autophagy',
    time: '16 – 18 h+',
    progress: 66.66,
    color: '#9aa1ad',
    headline: 'Cellular cleanup may become active',
    explanation:
      'Autophagy is your body’s cleanup process. The tracker estimates when it may begin for your profile — so you understand the healing side of your fast, not just the clock.',
    tip: 'Times are personalized estimates, not medical advice. The meaning of the day comes first.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 3v18M8 7c2-2 8-2 8 0s-6 2-8 0M8 17c2 2 8 2 8 0s-6-2-8 0" />
      </svg>
    ),
  },
  {
    id: 'break-fast',
    label: 'Break-fast',
    time: 'Nightfall',
    progress: 100,
    color: '#1c2a44',
    headline: 'Break the fast with intention',
    explanation:
      'At nightfall, ease into a nourishing meal. Your fasting streak updates — and the next fast day’s autophagy window resets with intention.',
    tip: 'Enable break-fast alerts so nightfall never sneaks up when you are busy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 3a7 7 0 0 0 7 7 7 7 0 1 1-7-7z" />
        <path d="M5 19h14" />
      </svg>
    ),
  },
]

export default function DayTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [timerKey, setTimerKey] = useState(0)

  const stage = stages[current]

  const goToStage = useCallback((index: number) => {
    setCurrent(index)
    setTimerKey((k) => k + 1)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % stages.length)
      setTimerKey((k) => k + 1)
    }, STAGE_DURATION)

    return () => clearTimeout(timer)
  }, [started, current, timerKey])

  return (
    <section
      ref={sectionRef}
      id="day-guide"
      className={`day-timeline${started ? ' day-timeline--started' : ''}`}
      aria-label="Jewish Fasting and Autophagy Timeline"
    >
      <div className="container">
        <ScrollReveal className="timeline-header">
          <div className="ornament-divider" aria-hidden="true">
            <span />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 15.2 7.2 17.6l.9-5.3-3.8-3.7 5.3-.8L12 3z" />
            </svg>
            <span />
          </div>
          <span className="section-label">Fasting &amp; Autophagy</span>
        </ScrollReveal>
        <ScrollRevealText
          text="Your Autophagy Timeline on a Fast Day"
          className="timeline-title timeline-header-title"
        />
        <ScrollReveal className="timeline-header" delay={100}>
          <p className="timeline-subtitle">
            From the start of the fast to nightfall — see stages and when cellular healing may begin
          </p>
        </ScrollReveal>

        <ScrollReveal className="timeline-panel" delay={100}>
          <div className="timeline-bar-wrap">
            <div className="timeline-bar-track">
              <div
                className="timeline-bar-fill"
                style={{ width: `${stage.progress}%` }}
              />
              <div
                className="timeline-bar-thumb"
                style={{ left: `${stage.progress}%` }}
              />
              {stages.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`timeline-marker${i === current ? ' active' : ''}${i < current ? ' done' : ''}`}
                  style={{ left: `${s.progress}%` }}
                  onClick={() => goToStage(i)}
                  aria-label={`Go to ${s.label}`}
                />
              ))}
            </div>
          </div>

          <div className="timeline-stages">
            {stages.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`timeline-stage${i === current ? ' timeline-stage--active' : ''}${i < current ? ' timeline-stage--done' : ''}`}
                onClick={() => goToStage(i)}
                style={{ '--stage-color': s.color } as CSSProperties}
              >
                <div className="timeline-stage-icon">{s.icon}</div>
                <span className="timeline-stage-label">{s.label}</span>
                <span className="timeline-stage-time">{s.time}</span>
              </button>
            ))}
          </div>

          <div className="timeline-explainer" key={stage.id}>
            <div
              className="timeline-explainer-glow"
              style={{ background: stage.color }}
            />
            <div className="timeline-explainer-inner">
              <div
                className="timeline-explainer-icon"
                style={{ color: stage.color, background: `${stage.color}22` }}
              >
                {stage.icon}
              </div>
              <div className="timeline-explainer-body">
                <div className="timeline-explainer-meta">
                  <span className="timeline-explainer-badge">{stage.label}</span>
                  <span className="timeline-explainer-time">{stage.time}</span>
                </div>
                <h3 className="timeline-explainer-headline">{stage.headline}</h3>
                <p className="timeline-explainer-text">{stage.explanation}</p>
                <p className="timeline-explainer-tip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  {stage.tip}
                </p>
              </div>
            </div>

            <div className="timeline-timer" key={timerKey}>
              <div className="timeline-timer-fill" />
            </div>
          </div>

          <p className="timeline-hint">
            Auto-advances every 5 seconds · Tap a stage to jump
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
