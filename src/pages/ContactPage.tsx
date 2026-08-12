import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageMeta from '../components/PageMeta'
import { pageMeta } from '../data/pageMeta'
import { contactSchema } from '../data/schema'
import './LegalPage.css'
import './ContactPage.css'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()

    const subject = encodeURIComponent(`Jewish FastTrack contact from ${name || 'visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )
    window.location.href = `mailto:support@jewishfasttrack.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <>
      <PageMeta
        title={pageMeta.contact.title}
        description={pageMeta.contact.description}
        path={pageMeta.contact.path}
        jsonLd={contactSchema()}
      />
      <Header />
      <div className="legal-page">
        <section className="legal-hero">
          <div className="container">
            <h1>Contact Us</h1>
            <p className="legal-updated">
              Questions about fasting times, autophagy tracking, or the app —
              we&apos;re here to help.
            </p>
          </div>
        </section>

        <section className="container">
          <div className="contact-layout">
            <div className="contact-info">
              <h2>Get in touch</h2>
              <p>
                Reach out for product support, partnership inquiries, or feedback
                on Jewish FastTrack.
              </p>
              <ul className="contact-details">
                <li>
                  <span>Email</span>
                  <a href="mailto:support@jewishfasttrack.com">
                    support@jewishfasttrack.com
                  </a>
                </li>
                <li>
                  <span>Facebook</span>
                  <a
                    href="https://www.facebook.com/jewishfasttrack"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    facebook.com/jewishfasttrack
                  </a>
                </li>
              </ul>
              <p className="contact-note">
                <Link to="/">Back to home</Link>
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label>
                Email
                <input type="email" name="email" required autoComplete="email" />
              </label>
              <label>
                Message
                <textarea name="message" rows={6} required />
              </label>
              <button type="submit" className="btn btn-primary">
                Send message
              </button>
              {submitted && (
                <p className="contact-success" role="status">
                  Your email app should open with the message ready to send.
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
