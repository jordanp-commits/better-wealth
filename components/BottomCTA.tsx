'use client'

import { useState } from 'react'
import FadeIn from '@/components/FadeIn'
import WaitlistModal from '@/components/WaitlistModal'

export default function BottomCTA() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: '#033A22' }}></div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(196, 146, 106, 0.12) 0%, transparent 55%)' }}></div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 60%, rgba(196, 146, 106, 0.08) 0%, transparent 50%)' }}></div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(3, 58, 34, 0.6) 0%, transparent 60%)' }}></div>
      <FadeIn>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: '#C4926A' }}></div>
          <h2 className="text-white text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6">Ready to Build Something Real?</h2>
          <p className="max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed text-base md:text-lg" style={{ color: 'rgba(250,250,248,0.8)' }}>
            Join a community of professionals who are serious about growth. Not just talking about it.
          </p>
          <button onClick={() => setIsWaitlistModalOpen(true)} className="btn-copper inline-block px-10 py-4 text-white rounded-lg font-semibold text-base md:text-lg shadow-lg hover:scale-105 transition-transform duration-200">Become a Member</button>
        </div>
      </FadeIn>

      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </section>
  )
}
