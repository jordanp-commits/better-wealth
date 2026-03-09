'use client'

import { useState } from 'react'
import FadeIn from '@/components/FadeIn'
import WaitlistModal from '@/components/WaitlistModal'

export default function BottomCTA() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Background image — filtered for warmth */}
      <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.55) saturate(0.75) sepia(0.25)' }} />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 2 }} aria-hidden="true">
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <FadeIn>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="w-12 border-t-2 border-[#C4926A]/60 mx-auto mb-6"></div>
          <h2 className="mb-4 md:mb-6">
            <span className="block text-3xl md:text-4xl font-serif font-bold italic text-white">Ready to Build</span>
            <span className="block text-5xl md:text-6xl font-serif font-bold text-white">Something Real.</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed text-base md:text-lg" style={{ color: 'rgba(250,250,248,0.8)' }}>
            Join a community of professionals who are serious about growth. Not just talking about it.
          </p>
          <button onClick={() => setIsWaitlistModalOpen(true)} className="btn-copper inline-block px-6 py-2.5 text-white rounded-lg font-semibold text-base shadow-lg hover:scale-105 transition-transform duration-200">Become a Member</button>
        </div>
      </FadeIn>

      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </section>
  )
}
