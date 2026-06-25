// ============================================================
// Home Page
// Composes all homepage sections: Hero, HowItWorks, Featured,
// Reviews, FAQ
// ============================================================

import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { Featured } from '@/components/home/featured'
import { Reviews } from '@/components/home/reviews'
import { FaqAccordion } from '@/components/faq-accordion'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Featured />
      <Reviews />
      <FaqAccordion />
    </>
  )
}
