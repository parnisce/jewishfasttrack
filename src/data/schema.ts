import { faqs } from './faqs'
import { blogPosts } from './blogPosts'
import {
  APP_STORE_URL,
  CONTACT_EMAIL,
  FACEBOOK_URL,
  PLAY_STORE_URL,
  SITE_NAME,
  SITE_URL,
} from './site'
import { absoluteUrl, pageMeta } from './pageMeta'

export type JsonLd = Record<string, unknown>

function logoImage(): JsonLd {
  return {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/logo.png`,
    contentUrl: `${SITE_URL}/logo.png`,
    caption: SITE_NAME,
  }
}

function orgSchema(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ['Jewish Fast', 'JewishFastTrack'],
    url: SITE_URL,
    email: CONTACT_EMAIL,
    logo: logoImage(),
    image: `${SITE_URL}/logo.png`,
    sameAs: [FACEBOOK_URL],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      url: absoluteUrl('/contact'),
    },
  }
}

function softwareAppSchema(): JsonLd {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#app`,
    name: SITE_NAME,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, Android',
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    description: pageMeta.home.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    downloadUrl: [PLAY_STORE_URL, APP_STORE_URL],
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

function webSiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: pageMeta.home.description,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  }
}

function faqPageSchema(): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

function breadcrumb(items: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

function wrap(...graph: JsonLd[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function homeSchema(): JsonLd {
  return wrap(orgSchema(), softwareAppSchema(), webSiteSchema(), faqPageSchema())
}

export function blogIndexSchema(): JsonLd {
  return wrap(
    {
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      name: 'Jewish Fasting & Autophagy Blog',
      description: pageMeta.blog.description,
      url: absoluteUrl('/blog'),
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
      blogPost: blogPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        image: absoluteUrl(post.image),
        description: post.excerpt,
        datePublished: post.dateIso,
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/blog#itemlist`,
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/blog/${post.slug}`),
        name: post.title,
      })),
    },
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
  )
}

export function blogPostSchema(post: {
  slug: string
  title: string
  excerpt: string
  date: string
  dateIso: string
  image: string
}): JsonLd {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return wrap(
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.excerpt,
      image: {
        '@type': 'ImageObject',
        url: absoluteUrl(post.image),
      },
      datePublished: post.dateIso,
      dateModified: post.dateIso,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: logoImage(),
      },
      isPartOf: { '@id': `${SITE_URL}/blog#blog` },
      inLanguage: 'en',
    },
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  )
}

export function contactSchema(): JsonLd {
  return wrap(
    {
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#webpage`,
      name: pageMeta.contact.title,
      description: pageMeta.contact.description,
      url: absoluteUrl('/contact'),
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      mainEntity: { '@id': `${SITE_URL}/#organization` },
    },
    orgSchema(),
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  )
}

export function webPageSchema(opts: {
  path: string
  name: string
  description: string
}): JsonLd {
  const url = absoluteUrl(opts.path)
  return wrap(
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: opts.name,
      description: opts.description,
      url,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'en',
    },
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: opts.name, path: opts.path },
    ]),
  )
}
