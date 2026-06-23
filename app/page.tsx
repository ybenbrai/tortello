import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { Featured } from '@/components/home/featured'
import { Reviews } from '@/components/home/reviews'
import { DeliveryPreview } from '@/components/home/delivery-preview'
import { FaqAccordion } from '@/components/faq-accordion'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Featured />
      <Reviews />
      <DeliveryPreview />
      <FaqAccordion />
    </>
  )
}
