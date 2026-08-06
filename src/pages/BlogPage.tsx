import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { blogPosts } from '../data/blogPosts'
import './LegalPage.css'
import './BlogPage.css'

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="legal-page">
        <section className="legal-hero">
          <div className="container">
            <h1>Blog</h1>
            <p className="legal-updated">
              Guides on Jewish fasting, autophagy timing, and using FastTrack
              with clarity.
            </p>
          </div>
        </section>

        <section className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="blog-card"
              >
                <div className="blog-card-image-wrap">
                  <img
                    src={post.image}
                    alt=""
                    className="blog-card-image"
                    loading="lazy"
                  />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-card-tag">{post.tag}</span>
                    <time dateTime={post.dateIso}>{post.date}</time>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="blog-card-more">Read article</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="blog-back">
            <Link to="/">Back to home</Link>
          </p>
        </section>
      </div>
      <Footer />
    </>
  )
}
