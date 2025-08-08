'use client'

import { lazy, Suspense } from 'react'
import { WeddingData } from '../types'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// Import HeroSection directly as it should load immediately
import HeroSection from '../sections/HeroSection'
import CountdownSection from '../sections/CountdownSection'

// Lazy load all other sections
const CoupleProfileSection = lazy(() => import('../sections/CoupleProfileSection'))
const StorySection = lazy(() => import('../sections/StorySection'))
const GallerySection = lazy(() => import('../sections/GallerySection'))
const EventsSection = lazy(() => import('../sections/EventsSection'))
const FamiliesSection = lazy(() => import('../sections/FamiliesSection'))
const WeddingPartySection = lazy(() => import('../sections/WeddingPartySection'))

// Loading placeholder component
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-pulse">
      <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
    </div>
  </div>
)

// Lazy section wrapper component
interface LazySectionProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
}

function LazySection({ children, threshold = 0.1, rootMargin = '100px' }: LazySectionProps) {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true
  })

  return (
    <div ref={elementRef} className="min-h-[200px]">
      {isVisible ? (
        <Suspense fallback={<SectionLoader />}>
          {children}
        </Suspense>
      ) : (
        <div className="h-64" /> // Placeholder to maintain scroll height
      )}
    </div>
  )
}

interface Template001Props {
  data: WeddingData
}

export default function Template001({ data }: Template001Props) {
  return (
    <div className="wedding-template-001">
      {/* Hero and Countdown load immediately */}
      <HeroSection data={data} />
      <CountdownSection data={data} />

      {/* Lazy load remaining sections based on viewport visibility */}
      <LazySection>
        <CoupleProfileSection data={data} />
      </LazySection>

      <LazySection>
        <StorySection data={data} />
      </LazySection>

      <LazySection>
        <GallerySection data={data} />
      </LazySection>

      <LazySection>
        <EventsSection data={data} />
      </LazySection>

      <LazySection>
        <FamiliesSection data={data} />
      </LazySection>

      <LazySection>
        <WeddingPartySection data={data} />
      </LazySection>
    </div>
  )
}