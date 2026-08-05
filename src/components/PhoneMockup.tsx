import './PhoneMockup.css'

type PhoneVariant = 'dashboard' | 'countdown' | 'calendar'

export default function PhoneMockup({
  variant = 'dashboard',
  className = '',
}: {
  variant?: PhoneVariant
  className?: string
}) {
  return (
    <div className={`phone-mockup ${className}`}>
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          {variant === 'countdown' ? (
            <div className="phone-countdown">
              <p className="screen-kicker">Today · Yom Kippur</p>
              <p className="screen-title">Break-fast in</p>
              <strong className="countdown-time">06:42:18</strong>
              <div className="countdown-bar">
                <div className="countdown-bar-fill" />
              </div>
              <div className="countdown-meta">
                <span>Autophagy ~16h</span>
                <span>Nightfall 7:48 PM</span>
              </div>
            </div>
          ) : variant === 'calendar' ? (
            <div className="phone-prayers">
              <p className="screen-title">Fast Calendar</p>
              {[
                ['Yom Kippur', '25h'],
                ["Tisha B'Av", '25h'],
                ['Tzom Gedaliah', 'Dawn'],
                ['Asarah B’Tevet', 'Dawn'],
                ['Ta’anit Esther', 'Dawn'],
              ].map(([name, time]) => (
                <div
                  key={name}
                  className={`prayer-row${name === 'Yom Kippur' ? ' prayer-row--next' : ''}`}
                >
                  <span>{name}</span>
                  <strong>{time}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="phone-app">
              <p className="app-greeting">Shalom</p>
              <div className="app-card">
                <span className="app-card-label">Autophagy status</span>
                <strong>Active · 16h 05m</strong>
              </div>
              <ul className="app-menu">
                <li>Jewish fasting tracker</li>
                <li>Autophagy timeline</li>
                <li>Break-fast alerts</li>
                <li>Fast calendar</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
