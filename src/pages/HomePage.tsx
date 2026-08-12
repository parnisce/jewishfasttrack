import Header from '../components/Header'
import Hero from '../components/Hero'
import HeroIntro from '../components/HeroIntro'
import DayTimeline from '../components/DayTimeline'
import AppFeatures from '../components/AppFeatures'
import WhyUs from '../components/WhyUs'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import DownloadCTA from '../components/DownloadCTA'
import Footer from '../components/Footer'
import PageMeta from '../components/PageMeta'
import { pageMeta } from '../data/pageMeta'
import { homeSchema } from '../data/schema'

export default function HomePage() {
  return (
    <>
      <PageMeta
        title={pageMeta.home.title}
        description={pageMeta.home.description}
        path={pageMeta.home.path}
        jsonLd={homeSchema()}
      />
      <Header />
      <main>
        <Hero />
        <HeroIntro />
        <DayTimeline />
        <AppFeatures />
        <WhyUs />
        <FAQ />
        <Testimonials />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  )
}
