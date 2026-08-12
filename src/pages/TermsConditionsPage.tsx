import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageMeta from '../components/PageMeta'
import { pageMeta } from '../data/pageMeta'
import { webPageSchema } from '../data/schema'
import './LegalPage.css'

export default function TermsConditionsPage() {
  return (
    <>
      <PageMeta
        title={pageMeta.terms.title}
        description={pageMeta.terms.description}
        path={pageMeta.terms.path}
        jsonLd={webPageSchema({
          path: pageMeta.terms.path,
          name: 'Terms & Conditions',
          description: pageMeta.terms.description,
        })}
      />
      <Header />
      <div className="legal-page">
        <section className="legal-hero">
          <div className="container">
            <h1>Terms &amp; Conditions</h1>
            <p className="legal-updated">Updated: August 5, 2026</p>
          </div>
        </section>

        <section className="container">
          <div className="legal-content">
            <p>
              By using Jewish FastTrack websites or apps, you agree to these Terms
              &amp; Conditions. If you do not agree, please do not use the service.
            </p>

            <h2>Use of the Service</h2>
            <p>
              Jewish FastTrack provides Jewish fasting tracking and autophagy
              estimates. Fasting times are based on calculation methods and device
              location. Autophagy timelines are educational estimates, not medical
              advice. Always follow your local community or trusted authority when
              religious guidance differs.
            </p>

            <h2>Not Religious Authority</h2>
            <p>
              The app is a convenience companion. It does not issue rulings or
              replace rabbinic or community guidance.
            </p>

            <h2>Not Medical Advice</h2>
            <p>
              Autophagy and metabolic phase estimates are for educational purposes
              only. They are not a diagnosis, treatment, or substitute for advice
              from a qualified healthcare professional. Consult a clinician before
              fasting if you have a medical condition, are pregnant, nursing, or
              taking medication.
            </p>

            <h2>Accounts &amp; Conduct</h2>
            <p>
              You are responsible for activity under your account and for using the
              service lawfully and respectfully. Do not misuse the service, attempt
              unauthorized access, or interfere with other users.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The Jewish FastTrack name, logo, website, and app content are owned by
              us or our licensors. You may not copy, modify, or redistribute them
              without permission, except as allowed by law.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms as the product evolves. Continued use after
              updates means you accept the revised terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent via our{' '}
              <Link to="/contact">Contact Us</Link> page.
            </p>

            <p>
              <Link to="/">Back to home</Link>
              {' · '}
              <Link to="/privacy-policy">Privacy Policy</Link>
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
