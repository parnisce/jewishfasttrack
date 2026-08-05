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
  ],
  support: [
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
          <p>&copy; {new Date().getFullYear()} Jewish FastTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
