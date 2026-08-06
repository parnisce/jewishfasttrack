import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './LegalPage.css'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="legal-page">
        <section className="legal-hero">
          <div className="container">
            <h1>Privacy Policy</h1>
            <p className="legal-updated">Updated: August 5, 2026</p>
          </div>
        </section>

        <section className="container">
          <div className="legal-content">
            <p>
              This Privacy Policy describes how Jewish FastTrack (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or &ldquo;our&rdquo;) — a Jewish fasting tracker with autophagy
              tracking — collects, uses, and protects information when you use our
              website and mobile applications.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect:</p>
            <ul>
              <li>Account details such as name and email address</li>
              <li>Location data used to calculate fasting start and end times</li>
              <li>Profile details you provide for personalized autophagy estimates (such as age, weight, or activity level)</li>
              <li>App usage data that helps us improve reliability and features</li>
              <li>Device information needed to deliver notifications you enable</li>
            </ul>

            <h2>How We Use Information</h2>
            <p>
              We use information to provide accurate local timings, send optional
              reminders you enable, personalize educational fasting timelines,
              improve the product, and communicate important service updates.
            </p>

            <h2>Sharing</h2>
            <p>
              We do not sell personal information. We may share data with service
              providers who help operate the app, under confidentiality obligations,
              or when required by law.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain information only as long as needed to provide the service,
              comply with legal obligations, resolve disputes, and enforce our
              agreements. You may request deletion of account data through the app
              or our contact channels.
            </p>

            <h2>Your Choices</h2>
            <p>
              You can update profile details in the app, disable optional
              notifications in device settings, and request access or deletion of
              personal data by contacting us.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent through the support options
              listed in the app, or via our{' '}
              <Link to="/contact">Contact Us</Link> page.
            </p>

            <p>
              <Link to="/">Back to home</Link>
              {' · '}
              <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
