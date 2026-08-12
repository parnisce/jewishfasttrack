import { useEffect } from 'react'
import { absoluteUrl } from '../data/pageMeta'
import { DEFAULT_OG_IMAGE, SITE_NAME } from '../data/site'

type PageMetaProps = {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
  return el
}

function upsertLink(rel: string, href: string): HTMLLinkElement {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
  return el
}

const JSON_LD_ATTR = 'data-page-meta-jsonld'

export default function PageMeta({
  title,
  description,
  path,
  image,
  noindex = false,
  jsonLd,
}: PageMetaProps) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = title

    const canonical = absoluteUrl(path)
    const ogImage = image
      ? image.startsWith('http')
        ? image
        : absoluteUrl(image)
      : DEFAULT_OG_IMAGE

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    upsertMeta('property', 'og:type', path.startsWith('/blog/') ? 'article' : 'website')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:locale', 'en_US')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    upsertLink('canonical', canonical)

    document.head.querySelectorAll(`script[${JSON_LD_ATTR}]`).forEach((node) => node.remove())

    if (jsonLdKey) {
      const payload = JSON.parse(jsonLdKey) as
        | Record<string, unknown>
        | Record<string, unknown>[]
      const payloads = Array.isArray(payload) ? payload : [payload]
      for (const entry of payloads) {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute(JSON_LD_ATTR, 'true')
        script.textContent = JSON.stringify(entry)
        document.head.appendChild(script)
      }
    }

    return () => {
      document.head.querySelectorAll(`script[${JSON_LD_ATTR}]`).forEach((node) => node.remove())
    }
  }, [title, description, path, image, noindex, jsonLdKey])

  return null
}
