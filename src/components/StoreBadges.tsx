import './StoreBadges.css'

const badges = [
  {
    href: '#download',
    label: 'Get it on Google Play',
    store: 'Google Play',
    kicker: 'GET IT ON',
  },
  {
    href: '#download',
    label: 'Download on the App Store',
    store: 'App Store',
    kicker: 'Download on the',
  },
] as const

export default function StoreBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`store-badges${className ? ` ${className}` : ''}`}>
      {badges.map((badge) => (
        <a
          key={badge.label}
          href={badge.href}
          className="store-badge"
          aria-label={badge.label}
        >
          <span className="store-badge-icon" aria-hidden="true">
            {badge.store === 'Google Play' ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.6 2.8a1.2 1.2 0 0 0-.6 1v16.4a1.2 1.2 0 0 0 .6 1l10.2-9.2L3.6 2.8zm11.3 6.4 2.4 1.4-2.4 1.3-2.1-1.35 2.1-1.35zm-1.3 3.1 2.3 2.1-8.5 4.9a1.1 1.1 0 0 1-.4.1l6.6-7.1zm0-4.4L5.1 3.9c.13-.04.27-.06.4-.06l8.1 4.66z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.4 12.3c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.7-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.4-.9-2.4-3.7zm-2.2-6.5c.6-.8 1.1-1.8.9-2.9-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.8 1.1.1 2.2-.5 3-1.4z" />
              </svg>
            )}
          </span>
          <span className="store-badge-text">
            <span className="store-badge-kicker">{badge.kicker}</span>
            <span className="store-badge-name">{badge.store}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
