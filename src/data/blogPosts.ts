export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  dateIso: string
  tag: string
  image: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'yom-kippur-autophagy',
    title: 'Yom Kippur fasting and when autophagy may begin',
    excerpt:
      'How the 25-hour fast connects to cellular cleansing — and how Jewish FastTrack maps both the countdown and the healing window.',
    date: 'August 1, 2026',
    dateIso: '2026-08-01',
    tag: 'Fast days',
    image: '/images/blog/yom-kippur-autophagy.jpg',
    content: [
      'Yom Kippur is the longest fast many people keep each year. From nightfall to nightfall, the day is about atonement, prayer, and presence — not optimization.',
      'Still, a 25-hour window is long enough that metabolic shifts can become relevant. Glucose stores gradually lower, fat burning increases, and for many people autophagy may become more active later in the fast.',
      'Jewish FastTrack keeps those layers distinct. The countdown stays tied to local nightfall. The autophagy timeline is educational — a map of what may be happening in the body while you stay focused on the meaning of the day.',
      'Use the estimates as context, not as medical advice. If you have a health condition, are pregnant, nursing, or taking medication, speak with a clinician before fasting.',
    ],
  },
  {
    slug: 'minor-fasts-calendar',
    title: 'A calm calendar for the Jewish year’s minor fasts',
    excerpt:
      'From Tzom Gedaliah to Asara B’Tevet — stay on time with location-based start and nightfall alerts.',
    date: 'July 18, 2026',
    dateIso: '2026-07-18',
    tag: 'Calendar',
    image: '/images/blog/minor-fasts-calendar.jpg',
    content: [
      'Minor fasts are shorter than Yom Kippur and Tisha B’Av, but they still ask for intention. Dawn-to-nightfall timing can be easy to miss when life is busy.',
      'A clear calendar helps you prepare the evening before, set a gentle morning reminder, and know when the fast ends without constant clock-watching.',
      'Jewish FastTrack lists the year’s fast days in one place and uses location-aware start and end times so the schedule stays practical wherever you are.',
      'When your community uses a different local table, follow that guidance. The app is a companion — not a replacement for trusted communal practice.',
    ],
  },
  {
    slug: 'faith-first-science-clear',
    title: 'Faith first, science clear: why we built two trackers in one',
    excerpt:
      'Religious timing is non-negotiable. Autophagy insight is educational. Here’s how we keep those lanes distinct.',
    date: 'July 2, 2026',
    dateIso: '2026-07-02',
    tag: 'Product',
    image: '/images/blog/faith-first-science-clear.jpg',
    content: [
      'Most fasting apps optimize for streak charts. Most Jewish calendars optimize for dates. We wanted both — without letting one drown out the other.',
      'Faith first means the sacred schedule leads: major and minor fasts, nightfall, and reminders that respect the purpose of the day.',
      'Science clear means autophagy and metabolic phases are shown as estimates personalized to a simple profile — educational context, never a substitute for medical care.',
      'That separation is intentional. The spiritual reason for fasting stays primary. The body science sits beside it, quietly, for people who want both.',
    ],
  },
  {
    slug: 'traveling-on-fast-days',
    title: 'Fasting while traveling: location and nightfall',
    excerpt:
      'Tips for keeping accurate end times when you change cities mid-year — without losing the spiritual focus of the day.',
    date: 'June 20, 2026',
    dateIso: '2026-06-20',
    tag: 'Guides',
    image: '/images/blog/traveling-on-fast-days.jpg',
    content: [
      'Travel can scramble fasting times. Crossing time zones, landing near dusk, or switching cities mid-fast all change when nightfall arrives.',
      'Enable location updates so Jewish FastTrack can recalculate start and end times for where you actually are.',
      'If you are unsure which local practice to follow, ask your rabbi or community before the day begins. Technology should reduce friction — not create new doubts.',
      'Pack a simple break-fast plan in advance. When the fast ends, a calm meal helps body and spirit settle after a long day.',
    ],
  },
  {
    slug: 'autophagy-explained',
    title: 'Autophagy explained for Jewish fasters',
    excerpt:
      'A plain-language look at cellular cleanup during longer fasts — and how to read the timeline without turning worship into metrics.',
    date: 'June 5, 2026',
    dateIso: '2026-06-05',
    tag: 'Science',
    image: '/images/blog/autophagy-explained.jpg',
    content: [
      'Autophagy is your body’s process of clearing damaged cell components and recycling them. It tends to increase when fasting lasts long enough for fuel sources to shift.',
      'On major Jewish fasts, many people reach windows where fat burning and later autophagy estimates become relevant. Exact timing varies by age, activity, and metabolism.',
      'Jewish FastTrack shows those phases on a timeline so you can understand the day physiologically — while the app still centers prayer times, countdowns, and the spiritual purpose of the fast.',
      'Treat every estimate as educational. It is not a diagnosis, treatment plan, or guarantee of a health outcome.',
    ],
  },
  {
    slug: 'preparing-for-dawn-fasts',
    title: 'Preparing the night before a dawn-to-nightfall fast',
    excerpt:
      'Simple habits for hydration, rest, and intention before minor fasts — so the day starts grounded instead of rushed.',
    date: 'May 22, 2026',
    dateIso: '2026-05-22',
    tag: 'Guides',
    image: '/images/blog/preparing-for-dawn-fasts.jpg',
    content: [
      'Minor fasts begin at dawn. The most common mistake is waking up already behind — thirsty, tired, and scrambling.',
      'The evening before, drink steadily, eat a nourishing meal, and set your start reminder. A calm night is better preparation than a frantic morning.',
      'Decide how you will spend the day: prayer, study, work, or rest. Intention reduces the sense that the fast is only about enduring the clock.',
      'When nightfall arrives, break the fast gently. Jewish FastTrack’s end alert is there so you can close the day with clarity, not guesswork.',
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
