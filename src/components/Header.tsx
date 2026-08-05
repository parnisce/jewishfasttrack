import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './Header.css'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Autophagy', href: '/#day-guide' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'FAQ', href: '/#faq' },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="header-theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme } = useTheme()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo" onClick={closeMenu}>
          <img src="/logo.png" alt="Jewish FastTrack" />
        </Link>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="header-link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <div className="header-nav-theme">
            <ThemeToggle />
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </div>
          <a href="/#download" className="header-link header-link--mobile-cta" onClick={closeMenu}>
            Download App
          </a>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a href="/#download" className="header-download">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="header-download-text">Download</span>
          </a>

          <button
            type="button"
            className={`header-menu-btn ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
