import { Link } from 'react-router-dom'
import './Footer.css'

const footerLinks = {
  app: [
    { label: 'Fasting Tracker', href: '/#features' },
    { label: 'Autophagy Tracker', href: '/#day-guide' },
    { label: 'Download App', href: '/#download' },
  ],
  explore: [
    { label: 'Why Us', href: '/#why-us' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'Blog', to: '/blog' },
  ],
  support: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  ],
}

type FooterLinkItem = { label: string; href?: string; to?: string }

function FooterLink({ link }: { link: FooterLinkItem }) {
  if (link.to) {
    return <Link to={link.to}>{link.label}</Link>
  }
  return <a href={link.href}>{link.label}</a>
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-tagline" lang="he" dir="rtl">צום קל</p>
        <p className="footer-tagline footer-tagline--sub">
          Jewish fasting tracker with autophagy insight — faith first, science clear.
        </p>

        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/">
              <img src="/logo.png" alt="Jewish FastTrack" />
            </Link>
          </div>

          <div className="footer-links">
            <div>
              <h4>Get App</h4>
              <ul>
                {footerLinks.app.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a
              href="https://www.facebook.com/jewishfasttrack"
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jewish FastTrack on Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.18 2.09 15.95 2 14.65 2 11.95 2 10 3.72 10 6.61V9.5H7.5v4H10V22h4v-8.5z" />
              </svg>
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Jewish FastTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
