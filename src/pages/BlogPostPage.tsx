import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageMeta from '../components/PageMeta'
import { blogPosts, getPostBySlug } from '../data/blogPosts'
import { blogPageMeta, pageMeta } from '../data/pageMeta'
import { blogPostSchema } from '../data/schema'
import './LegalPage.css'
import './BlogPage.css'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined
  const meta = slug ? blogPageMeta[slug] : undefined

  if (!post || !meta) {
    return (
      <>
        <PageMeta
          title={`Post not found | ${pageMeta.blog.title}`}
          description={pageMeta.blog.description}
          path="/blog"
          noindex
        />
        <Header />
        <div className="legal-page">
          <section className="legal-hero">
            <div className="container">
              <h1>Post not found</h1>
              <p className="legal-updated">
                That article doesn&apos;t exist or may have moved.
              </p>
            </div>
          </section>
          <section className="container">
            <p className="blog-back">
              <Link to="/blog">Back to blog</Link>
            </p>
          </section>
        </div>
        <Footer />
      </>
    )
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <PageMeta
        title={meta.title}
        description={meta.description}
        path={meta.path}
        image={post.image}
        jsonLd={blogPostSchema(post)}
      />
      <Header />
      <article className="legal-page blog-post-page">
        <section className="legal-hero">
          <div className="container blog-post-hero">
            <p className="blog-post-breadcrumb">
              <Link to="/blog">Blog</Link>
              <span aria-hidden="true"> / </span>
              <span>{post.tag}</span>
            </p>
            <div className="blog-card-meta blog-post-meta">
              <span className="blog-card-tag">{post.tag}</span>
              <time dateTime={post.dateIso}>{post.date}</time>
            </div>
            <h1>{post.title}</h1>
            <p className="legal-updated">{post.excerpt}</p>
          </div>
        </section>

        <div className="container">
          <div className="blog-post-image-wrap">
            <img src={post.image} alt="" className="blog-post-image" />
          </div>

          <div className="blog-post-content">
            {post.content.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          <div className="blog-post-related">
            <h2>More articles</h2>
            <div className="blog-related-grid">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/blog/${item.slug}`}
                  className="blog-related-card"
                >
                  <img src={item.image} alt="" loading="lazy" />
                  <strong>{item.title}</strong>
                </Link>
              ))}
            </div>
          </div>

          <p className="blog-back">
            <Link to="/blog">Back to blog</Link>
            {' · '}
            <Link to="/">Home</Link>
          </p>
        </div>
      </article>
      <Footer />
    </>
  )
}
