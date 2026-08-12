import { SITE_URL } from './site'

export type PageMetaEntry = {
  title: string
  description: string
  path: string
  ogImage?: string
  noindex?: boolean
}

/**
 * AI-recommended titles (≤60) and descriptions (≤160).
 * Primary keywords: jewish fasting tracker, autophagy, Yom Kippur, minor fasts.
 */
export const pageMeta = {
  home: {
    title: 'Jewish FastTrack – Fasting Tracker & Autophagy App',
    description:
      'Track Yom Kippur, Tisha B’Av, and minor fasts with location-based times—and see when autophagy may begin with personalized timelines.',
    path: '/',
  },
  blog: {
    title: 'Jewish Fasting & Autophagy Blog | Jewish FastTrack',
    description:
      'Guides on Jewish fast days, nightfall timing, and autophagy—clear tips for Yom Kippur, Tisha B’Av, and minor fasts.',
    path: '/blog',
  },
  contact: {
    title: 'Contact Jewish FastTrack Support',
    description:
      'Questions about fasting times, autophagy tracking, or the app? Email support or reach Jewish FastTrack on Facebook.',
    path: '/contact',
  },
  privacy: {
    title: 'Privacy Policy | Jewish FastTrack',
    description:
      'How Jewish FastTrack collects, uses, and protects personal information for the Jewish fasting and autophagy tracker app and website.',
    path: '/privacy-policy',
  },
  terms: {
    title: 'Terms & Conditions | Jewish FastTrack',
    description:
      'Terms governing use of the Jewish FastTrack website and app, including fasting tools and educational autophagy estimates.',
    path: '/terms-and-conditions',
  },
  reportAudit: {
    title: 'SEO & Site Audit Report | Jewish FastTrack',
    description: 'Internal SEO and site audit report for Jewish FastTrack. Not for public indexing.',
    path: '/report-audit',
    noindex: true,
  },
} as const satisfies Record<string, PageMetaEntry>

export const blogPageMeta: Record<
  string,
  { title: string; description: string; path: string }
> = {
  'yom-kippur-autophagy': {
    title: 'Yom Kippur Fasting: When Does Autophagy Begin?',
    description:
      'How the 25-hour Yom Kippur fast connects to cellular cleansing—and how Jewish FastTrack maps both the countdown and healing window.',
    path: '/blog/yom-kippur-autophagy',
  },
  'minor-fasts-calendar': {
    title: 'Jewish Minor Fasts Calendar with Nightfall Alerts',
    description:
      'Stay ready for Tzom Gedaliah, Asara B’Tevet, and more with location-based dawn and nightfall reminders in Jewish FastTrack.',
    path: '/blog/minor-fasts-calendar',
  },
  'faith-first-science-clear': {
    title: 'Faith First, Science Clear | Jewish FastTrack',
    description:
      'Why Jewish FastTrack keeps sacred fasting timing separate from educational autophagy insight—so faith leads and science stays clear.',
    path: '/blog/faith-first-science-clear',
  },
  'traveling-on-fast-days': {
    title: 'Fasting While Traveling: Nightfall by Location',
    description:
      'Keep accurate Jewish fast start and end times when you change cities—without losing the spiritual focus of the day.',
    path: '/blog/traveling-on-fast-days',
  },
  'autophagy-explained': {
    title: 'What Is Autophagy? A Guide for Jewish Fasters',
    description:
      'Plain-language autophagy explained for longer Jewish fasts—how to read the timeline without turning worship into metrics.',
    path: '/blog/autophagy-explained',
  },
  'preparing-for-dawn-fasts': {
    title: 'How to Prepare for Dawn-to-Nightfall Jewish Fasts',
    description:
      'Hydration, rest, and intention tips the night before a minor fast—so dawn starts calm instead of rushed.',
    path: '/blog/preparing-for-dawn-fasts',
  },
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') return `${SITE_URL}/`
  return `${SITE_URL}${normalized.replace(/\/+$/, '')}`
}
