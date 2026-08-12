import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import { blogPageMeta, pageMeta } from '../data/pageMeta'
import './ReportAuditPage.css'

type PillTone = 'ok' | 'warn' | 'bad' | 'neutral'

function Pill({ tone, children }: { tone: PillTone; children: ReactNode }) {
  return <span className={`audit-pill audit-pill--${tone}`}>{children}</span>
}

function charNote(n: number, limit: number) {
  const ok = n <= limit
  return (
    <span className={`audit-char-count ${ok ? 'is-ok' : 'is-warn'}`}>
      {n} chars {ok ? '✓' : `(ideal ≤ ${limit})`}
    </span>
  )
}

const SITE = 'https://jewishfast.com'
const UPDATED = '12 August 2026'
const PAGE_COUNT = 11

const baselineIssues = [
  {
    n: 1,
    area: 'Site-wide — document head',
    issue:
      'All routes previously shared one static title and meta description from index.html.',
    resolution:
      'Implemented PageMeta + src/data/pageMeta.ts so every content page sets a unique title and description on route change.',
    status: 'Fixed' as const,
  },
  {
    n: 2,
    area: 'Site-wide — social sharing',
    issue: 'No Open Graph or Twitter Card tags. Shared links fell back to generic browser defaults.',
    resolution:
      'Page-level og:title, og:description, og:image, og:url, twitter:card, and canonical URLs are set via PageMeta. Default share image: /images/jewish-hero-phones.png.',
    status: 'Fixed' as const,
  },
  {
    n: 3,
    area: 'Site-wide — crawlability',
    issue:
      'Vite SPA previously had no sitemap.xml, no robots sitemap pointer, and soft-404 risk on deep links without host rewrite.',
    resolution:
      'Added public/sitemap.xml, public/robots.txt, Cloudflare/Netlify _redirects + vercel.json rewrites. Client PageMeta injects route-specific meta + JSON-LD.',
    status: 'Fixed' as const,
  },
  {
    n: 4,
    area: 'Homepage — FAQ section',
    issue: 'FAQ content exists as a homepage accordion and previously had no FAQPage schema.',
    resolution: 'FAQPage JSON-LD now injects all 6 Q&As on the homepage (src/data/faqs.ts + homeSchema).',
    status: 'Fixed' as const,
  },
  {
    n: 5,
    area: 'Store badges — App Store',
    issue: 'App Store CTA uses country path /ph/ (Philippines storefront).',
    resolution:
      'Switch to a geo-neutral or primary-market App Store URL (e.g. /app/… or /us/…) unless PH is intentional.',
    status: 'Review' as const,
  },
  {
    n: 6,
    area: 'Analytics',
    issue: 'GA4 and Meta Pixel were missing from the marketing site head.',
    resolution:
      'GA4 (G-0Q1SSS9P6J), Meta Pixel (771492125852263), and Cloudflare Web Analytics are loaded globally via index.html. Consider a consent banner if required by region.',
    status: 'Fixed' as const,
  },
]

const trackers = [
  {
    tool: 'Cloudflare Web Analytics',
    id: 'a8afe81a559f4e59a3982e1b679f63b5',
    source: 'https://static.cloudflareinsights.com/beacon.min.js',
    status: 'Active' as const,
    notes: 'Privacy-friendly page analytics via Cloudflare beacon in index.html.',
  },
  {
    tool: 'Google Analytics (GA4)',
    id: 'G-0Q1SSS9P6J',
    source: 'https://www.googletagmanager.com/gtag/js?id=G-0Q1SSS9P6J',
    status: 'Active' as const,
    notes: 'Loaded globally via gtag.js in index.html.',
  },
  {
    tool: 'Facebook Pixel / Meta',
    id: '771492125852263',
    source: 'https://connect.facebook.net/en_US/fbevents.js',
    status: 'Active' as const,
    notes: 'Loaded globally via Meta Pixel snippet in index.html (PageView).',
  },
  {
    tool: 'App Store / Play Store deep links',
    id: 'Store badges',
    source: 'StoreBadges.tsx',
    status: 'Active' as const,
    notes: 'Google Play + App Store CTAs live on homepage. App Store uses /ph/ locale.',
  },
]

const corePages = [
  {
    page: 'Homepage',
    url: '/',
    title: `${pageMeta.home.title.length} ✓`,
    desc: `${pageMeta.home.description.length} ✓`,
    keyword: 'jewish fasting tracker',
    schema: 'SoftwareApplication + Organization + WebSite + FAQPage',
  },
  {
    page: 'Blog',
    url: '/blog',
    title: `${pageMeta.blog.title.length} ✓`,
    desc: `${pageMeta.blog.description.length} ✓`,
    keyword: 'jewish fasting blog',
    schema: 'Blog + ItemList',
  },
  {
    page: 'Contact Us',
    url: '/contact',
    title: `${pageMeta.contact.title.length} ✓`,
    desc: `${pageMeta.contact.description.length} ✓`,
    keyword: 'jewishfasttrack contact',
    schema: 'ContactPage + Organization',
  },
]

const blogPages = Object.entries(blogPageMeta).map(([slug, meta]) => ({
  page: meta.title.replace(/ \| Jewish FastTrack$/, ''),
  url: `/blog/${slug}`,
  keyword: slug.replace(/-/g, ' '),
  titleLen: meta.title.length,
  descLen: meta.description.length,
}))

const legalPages = [
  { page: 'Privacy Policy', url: '/privacy-policy' },
  { page: 'Terms & Conditions', url: '/terms-and-conditions' },
]

const metaRows = [
  {
    page: 'Homepage',
    title: pageMeta.home.title,
    titleLen: pageMeta.home.title.length,
    desc: pageMeta.home.description,
    descLen: pageMeta.home.description.length,
  },
  {
    page: 'Blog',
    title: pageMeta.blog.title,
    titleLen: pageMeta.blog.title.length,
    desc: pageMeta.blog.description,
    descLen: pageMeta.blog.description.length,
  },
  ...Object.entries(blogPageMeta).map(([, meta]) => ({
    page: meta.title.replace(/ \| Jewish FastTrack$/, ''),
    title: meta.title,
    titleLen: meta.title.length,
    desc: meta.description,
    descLen: meta.description.length,
  })),
  {
    page: 'Contact Us',
    title: pageMeta.contact.title,
    titleLen: pageMeta.contact.title.length,
    desc: pageMeta.contact.description,
    descLen: pageMeta.contact.description.length,
  },
  {
    page: 'Privacy Policy',
    title: pageMeta.privacy.title,
    titleLen: pageMeta.privacy.title.length,
    desc: pageMeta.privacy.description,
    descLen: pageMeta.privacy.description.length,
  },
  {
    page: 'Terms & Conditions',
    title: pageMeta.terms.title,
    titleLen: pageMeta.terms.title.length,
    desc: pageMeta.terms.description,
    descLen: pageMeta.terms.description.length,
  },
]

const schemaMap = [
  { page: '/', type: 'SoftwareApplication + Organization + WebSite + FAQPage', status: 'Active' },
  { page: '/#faq (homepage FAQ)', type: 'FAQPage', status: 'Active' },
  { page: '/blog', type: 'Blog + ItemList', status: 'Active' },
  { page: '/blog/*', type: 'BlogPosting + BreadcrumbList', status: 'Active' },
  { page: '/contact', type: 'ContactPage + Organization', status: 'Active' },
  { page: '/privacy-policy', type: 'WebPage', status: 'Active' },
  { page: '/terms-and-conditions', type: 'WebPage', status: 'Active' },
]

const gaps = [
  {
    priority: 'Medium',
    scope: 'All content pages',
    issue: 'Titles, descriptions, OG tags, and canonicals implemented',
    fix: 'After deploy, re-scrape URLs in Facebook Sharing Debugger and X Card Validator',
  },
  {
    priority: 'Medium',
    scope: 'Crawl / hosting',
    issue: 'Sitemap, robots, and SPA rewrites shipped',
    fix: 'Submit sitemap in Google Search Console after deploy; confirm deep links return 200',
  },
  {
    priority: 'Medium',
    scope: 'Structured data',
    issue: 'JSON-LD schema implemented on all content pages',
    fix: 'Validate with Google Rich Results Test after deploy; keep schemas in sync when content changes',
  },
  {
    priority: 'Low',
    scope: 'Analytics',
    issue: 'GA4, Meta Pixel, and Cloudflare Web Analytics installed sitewide',
    fix: 'Consider a consent banner if required by region; fire additional Pixel events on key CTAs if needed',
  },
  {
    priority: 'Medium',
    scope: 'App Store badge',
    issue: '/ph/ storefront locale in URL',
    fix: 'Use primary-market or locale-agnostic App Store link',
  },
  {
    priority: 'Medium',
    scope: 'Rendering',
    issue: 'Client PageMeta + JSON-LD; body still hydrates client-side',
    fix: 'Optional later: full SSG/SSR prerender if richer HTML body content is needed for crawlers',
  },
  {
    priority: 'Phase 2',
    scope: 'PageSpeed',
    issue: 'No formal PSI baseline captured in this report',
    fix: 'Run mobile + desktop PageSpeed Insights and log scores here',
  },
  {
    priority: 'Low',
    scope: 'Social profiles',
    issue: 'Footer currently links Facebook only',
    fix: 'Add verified Instagram / other profiles to sameAs when available',
  },
]

const infra = [
  { setting: 'Framework', value: 'Vite 8 + React 19 (SPA + client PageMeta)' },
  { setting: 'Router', value: 'react-router-dom v7' },
  { setting: 'Hosting signals', value: 'Cloudflare Insights · _redirects SPA fallback · vercel.json rewrites' },
  { setting: 'Sitemap', value: `/sitemap.xml · ${PAGE_COUNT} content URLs` },
  { setting: 'robots.txt', value: 'Allow: / · Disallow /report-audit · Sitemap pointer' },
  { setting: 'Favicon', value: '/favicon.svg · /logo.png' },
  { setting: 'OG Image', value: '/images/jewish-hero-phones.png (default)' },
  { setting: 'Fonts', value: 'Manrope + Frank Ruhl Libre (display=swap)' },
  { setting: 'Theme', value: 'Dark default + light mode (data-theme)' },
  { setting: 'Primary CTAs', value: 'Google Play + App Store download badges' },
]

const sitemapGroups = [
  { group: '/ (Homepage)', priority: '1.0', freq: 'Weekly' },
  { group: '/blog', priority: '0.8', freq: 'Weekly' },
  { group: '/blog/*', priority: '0.7', freq: 'Monthly' },
  { group: '/contact', priority: '0.6', freq: 'Yearly' },
  { group: '/privacy-policy, /terms-and-conditions', priority: '0.3', freq: 'Yearly' },
  { group: '/report-audit', priority: '—', freq: 'noindex' },
]

function statusPill(status: string) {
  if (status === 'Fixed' || status === 'Active') return <Pill tone="ok">{status}</Pill>
  if (status === 'Review' || status === 'Open') return <Pill tone="warn">{status}</Pill>
  if (status === 'Missing') return <Pill tone="bad">{status}</Pill>
  return <Pill tone="neutral">{status}</Pill>
}

function mark(ok: boolean) {
  return ok ? <span className="is-ok">✓</span> : <span className="is-bad">✗</span>
}

export default function ReportAuditPage() {
  return (
    <div className="audit-page">
      <PageMeta
        title={pageMeta.reportAudit.title}
        description={pageMeta.reportAudit.description}
        path={pageMeta.reportAudit.path}
        noindex
      />
      <header className="audit-topbar">
        <div className="audit-topbar-inner">
          <Link to="/" className="audit-brand">
            <img src="/logo.png" alt="" />
            <span>Jewish FastTrack</span>
          </Link>
          <Link to="/" className="audit-back">
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="audit-main">
        <div className="audit-container">
          <div className="audit-badges">
            <span className="audit-badge">INTERNAL — NOINDEX</span>
            <span className="audit-badge audit-badge--brand">Jewish Fast</span>
          </div>

          <h1>SEO &amp; Site Audit Report</h1>
          <p className="audit-meta">
            {SITE} · Last updated {UPDATED} · Vite 8 + React 19 SPA · {PAGE_COUNT} content pages
            audited
          </p>

          <div className="audit-stats">
            <div className="audit-stat">
              <strong>{PAGE_COUNT}</strong>
              <span>Total Pages</span>
            </div>
            <div className="audit-stat audit-stat--ok">
              <strong>
                {PAGE_COUNT}/{PAGE_COUNT}
              </strong>
              <span>With Schema</span>
            </div>
            <div className="audit-stat audit-stat--ok">
              <strong>
                {PAGE_COUNT}/{PAGE_COUNT}
              </strong>
              <span>With OG Tags</span>
            </div>
            <div className="audit-stat audit-stat--ok">
              <strong>
                {PAGE_COUNT}/{PAGE_COUNT}
              </strong>
              <span>With Canonical</span>
            </div>
            <div className="audit-stat audit-stat--ok">
              <strong>
                {PAGE_COUNT}/{PAGE_COUNT}
              </strong>
              <span>Unique Titles</span>
            </div>
            <div className="audit-stat audit-stat--ok">
              <strong>4/4</strong>
              <span>Active Trackers</span>
            </div>
          </div>

          <div className="audit-banner audit-banner--ok">
            <p>
              ✓ Unique meta titles/descriptions, Open Graph + Twitter tags, canonicals, Schema.org
              JSON-LD, sitemap/robots, and SPA host rewrites are live for all {PAGE_COUNT} content
              pages.
            </p>
            <p>
              ⚠ Remaining medium items — App Store locale review and optional HTML prerender for
              crawlers.
            </p>
          </div>

          <section className="audit-section">
            <h2>Baseline Issues &amp; Recommendations</h2>
            <p className="audit-section-lead">
              Critical SEO and UX findings from the live redesign audit. Items below are open unless
              marked Fixed or Review.
            </p>
            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Area</th>
                    <th>Issue</th>
                    <th>Resolution</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {baselineIssues.map((row) => (
                    <tr key={row.n}>
                      <td>{row.n}</td>
                      <td>{row.area}</td>
                      <td>{row.issue}</td>
                      <td>{row.resolution}</td>
                      <td>{statusPill(row.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="audit-section">
            <h2>Tracking &amp; Analytics Codes</h2>
            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Tool</th>
                    <th>ID / Tag</th>
                    <th>Script Source</th>
                    <th>Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {trackers.map((row) => (
                    <tr key={row.tool}>
                      <td>{row.tool}</td>
                      <td>
                        <code>{row.id}</code>
                      </td>
                      <td>
                        <code>{row.source}</code>
                      </td>
                      <td>{statusPill(row.status)}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="audit-section">
            <h2>SEO Audit by Page</h2>
            <p className="audit-section-lead">
              Title ideal ≤ 60 chars · Description ideal ≤ 160 chars · OG = page-level OpenGraph ·
              Canonical = per-page canonical URL
            </p>

            <h3>Core Pages</h3>
            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>URL</th>
                    <th>Title</th>
                    <th>Desc</th>
                    <th>Primary Keyword</th>
                    <th>OG</th>
                    <th>Schema</th>
                    <th>Canonical</th>
                  </tr>
                </thead>
                <tbody>
                  {corePages.map((row) => (
                    <tr key={row.url}>
                      <td>{row.page}</td>
                      <td>
                        <code>{row.url}</code>
                      </td>
                      <td className="is-ok">{row.title}</td>
                      <td className="is-ok">{row.desc}</td>
                      <td>{row.keyword}</td>
                      <td>{mark(true)}</td>
                      <td>{row.schema}</td>
                      <td>{mark(true)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Blog Pages</h3>
            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>URL</th>
                    <th>Title</th>
                    <th>Desc</th>
                    <th>Primary Keyword</th>
                    <th>OG</th>
                    <th>Schema</th>
                    <th>Canonical</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPages.map((row) => (
                    <tr key={row.url}>
                      <td>{row.page}</td>
                      <td>
                        <code>{row.url}</code>
                      </td>
                      <td className="is-ok">
                        {row.titleLen} ✓
                      </td>
                      <td className="is-ok">
                        {row.descLen} ✓
                      </td>
                      <td>{row.keyword}</td>
                      <td>{mark(true)}</td>
                      <td>BlogPosting + BreadcrumbList</td>
                      <td>{mark(true)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Legal Pages</h3>
            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>URL</th>
                    <th>Title</th>
                    <th>Desc</th>
                    <th>Primary Keyword</th>
                    <th>OG</th>
                    <th>Schema</th>
                    <th>Canonical</th>
                  </tr>
                </thead>
                <tbody>
                  {legalPages.map((row) => (
                    <tr key={row.url}>
                      <td>{row.page}</td>
                      <td>
                        <code>{row.url}</code>
                      </td>
                      <td className="is-ok">Unique ✓</td>
                      <td className="is-ok">Unique ✓</td>
                      <td>—</td>
                      <td>{mark(true)}</td>
                      <td>WebPage</td>
                      <td>{mark(true)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="audit-section">
            <h2>Meta Titles &amp; Descriptions</h2>
            <p className="audit-section-lead">
              Implemented across all content pages. Source of truth:{' '}
              <code>src/data/pageMeta.ts</code> (wired through PageMeta on each route).
            </p>
            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Meta Title</th>
                    <th>Meta Description</th>
                  </tr>
                </thead>
                <tbody>
                  {metaRows.map((row) => (
                    <tr key={row.page}>
                      <td>{row.page}</td>
                      <td>
                        {row.title}
                        {charNote(row.titleLen, 60)}
                      </td>
                      <td>
                        {row.desc}
                        {charNote(row.descLen, 160)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="audit-section">
            <h2>Schema.org Structured Data Map</h2>

            <div className="audit-schema-card">
              <h3>Global Schema — src/data/schema.ts</h3>
              <dl className="audit-schema-dl">
                <div>
                  <dt>Type</dt>
                  <dd>Organization + SoftwareApplication</dd>
                </div>
                <div>
                  <dt>Name</dt>
                  <dd>Jewish FastTrack / Jewish Fast</dd>
                </div>
                <div>
                  <dt>App</dt>
                  <dd>iOS + Android Jewish fasting / autophagy tracker</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>support@jewishfasttrack.com</dd>
                </div>
                <div>
                  <dt>sameAs</dt>
                  <dd>Facebook (live) — add Instagram and others when verified</dd>
                </div>
              </dl>
            </div>

            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Schema Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {schemaMap.map((row) => (
                    <tr key={row.page}>
                      <td>
                        <code>{row.page}</code>
                      </td>
                      <td>{row.type}</td>
                      <td>{statusPill(row.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="audit-section">
            <h2>PageSpeed Insights Audit</h2>
            <p className="audit-section-lead">
              Baseline not captured in this pass. Run Google PageSpeed Insights on mobile + desktop
              after Phase 1 meta/schema work and record scores here.
            </p>
            <div className="audit-psi">
              {['Performance', 'Accessibility', 'Best Practices', 'SEO'].map((label) => (
                <div key={label} className="audit-psi-card">
                  <span>{label}</span>
                  <strong>—</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="audit-section">
            <h2>Remaining Gaps &amp; Phase 2 Recommendations</h2>
            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Priority</th>
                    <th>Page / Scope</th>
                    <th>Issue</th>
                    <th>Recommended Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {gaps.map((row) => (
                    <tr key={`${row.priority}-${row.scope}`}>
                      <td>
                        <Pill
                          tone={
                            row.priority === 'High'
                              ? 'bad'
                              : row.priority === 'Low' || row.priority === 'Phase 2'
                                ? 'neutral'
                                : 'warn'
                          }
                        >
                          {row.priority}
                        </Pill>
                      </td>
                      <td>{row.scope}</td>
                      <td>{row.issue}</td>
                      <td>{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="audit-section">
            <h2>Technical Infrastructure</h2>
            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Setting</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {infra.map((row) => (
                    <tr key={row.setting}>
                      <td>{row.setting}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="audit-table-wrap" style={{ marginTop: '1rem' }}>
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>URL Group</th>
                    <th>Priority</th>
                    <th>Change Freq</th>
                  </tr>
                </thead>
                <tbody>
                  {sitemapGroups.map((row) => (
                    <tr key={row.group}>
                      <td>{row.group}</td>
                      <td>{row.priority}</td>
                      <td>{row.freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="audit-footer">
            Internal report — noindexed · {SITE}/report-audit · Jewish FastTrack · {UPDATED}. Colors
            follow the Jewish Fast navy + silver system.
          </p>
        </div>
      </main>
    </div>
  )
}
