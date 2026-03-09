'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import FadeIn from './FadeIn'

const slides = [
  {
    title: 'Corporate Training',
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    content: 'Bespoke workshops and development programmes designed to strengthen teams, improve performance, and raise professional standards. Our sessions are practical, engaging, and tailored to your organisation\'s objectives. We offer one-off training days, structured programmes, and ongoing support.',
    ideal: 'Teams of 8–50 professionals seeking practical growth and measurable impact.',
  },
  {
    title: 'Business Partnerships',
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    content: 'We collaborate with businesses that want to add value to their clients, audiences, or internal teams. This can include co-branded educational events, joint webinars or masterclasses, referral partnerships, thought leadership content, and strategic marketing collaborations. We focus on partnerships that are mutually beneficial, commercially aligned, and long-term.',
    ideal: 'Service-led businesses, consultancies, agencies, and growth-focused organisations.',
  },
  {
    title: 'Charity & Community Partnerships',
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    content: 'We actively support charities and community initiatives aligned with education, empowerment, and professional development. Partnership opportunities may include fundraising collaborations, sponsored training sessions, educational workshops for beneficiaries, awareness campaigns, and event support and speaking engagements. We believe in using our expertise to create real-world impact beyond business.',
    ideal: 'Registered charities and community-led initiatives seeking skills-based support.',
  },
  {
    title: 'Technology & Innovation Partners',
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    content: 'We work alongside technology providers to create integration workshops, co-created resources, and educational content that helps users maximise value. From collaborative events to product education, we help translate complex systems into practical, accessible knowledge.',
    ideal: 'Software providers, platforms, and innovation-led companies.',
  },
]

const cardBorder = {
  border: '1px solid rgba(0,0,0,0.07)',
  borderTop: '2px solid #C4926A',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
}

export default function PartnershipCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goTo = useCallback((index: number, dir: 'left' | 'right') => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const prev = useCallback(() => {
    goTo(current === 0 ? slides.length - 1 : current - 1, 'left')
  }, [current, goTo])

  const next = useCallback(() => {
    goTo(current === slides.length - 1 ? 0 : current + 1, 'right')
  }, [current, goTo])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prev, next])

  return (
    <FadeIn delay={100}>
      <div className="relative max-w-[700px] mx-auto">
        {/* Desktop arrows */}
        <button
          onClick={prev}
          className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-[#C4926A]/50 text-[#C4926A] transition-all duration-200 hover:bg-[#C4926A]/10"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-[#C4926A]/50 text-[#C4926A] transition-all duration-200 hover:bg-[#C4926A]/10"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Card */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            key={current}
            className="p-8 md:p-10 rounded-2xl flex flex-col animate-slide-in"
            style={{
              ...cardBorder,
              backgroundColor: '#F5F0EB',
              animationDuration: '400ms',
              animationTimingFunction: 'ease',
              animationFillMode: 'both',
              '--slide-direction': direction === 'right' ? '1' : '-1',
            } as React.CSSProperties}
          >
            <h3 className="font-serif text-xl font-bold text-[#033A22]">{slides[current].title}</h3>
            <div className="w-8 border-t border-[#C4926A]/50 mt-1 mb-4"></div>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.55)' }}>
              {slides[current].content}
            </p>
            <div>
              <span className="font-semibold text-xs uppercase tracking-widest" style={{ color: '#C4926A' }}>Ideal for</span>
              <p className="text-base mt-1" style={{ color: 'rgba(0,0,0,0.45)' }}>
                {slides[current].ideal}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile arrows + dots */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={prev}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#C4926A]/50 text-[#C4926A] transition-all duration-200 hover:bg-[#C4926A]/10"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'right' : 'left')}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ backgroundColor: i === current ? '#C4926A' : 'rgba(255,255,255,0.2)' }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#C4926A]/50 text-[#C4926A] transition-all duration-200 hover:bg-[#C4926A]/10"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </FadeIn>
  )
}
