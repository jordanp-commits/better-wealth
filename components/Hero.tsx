'use client'

import { useState } from 'react'
import CountUp from '@/components/CountUp'
import FadeIn from '@/components/FadeIn'
import WaitlistModal from '@/components/WaitlistModal'
import MarqueeTicker from '@/components/MarqueeTicker'

export default function Hero() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const muted = { color: '#B8D4C5' }
  const divider = { backgroundColor: 'rgba(250, 250, 248, 0.15)' }
  const subtext = { color: 'rgba(250, 250, 248, 0.88)' }
  return (
    <>
    <section className="relative overflow-hidden">
      {/* Background image — filtered for warmth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/luxury-villa-pool.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          filter: 'brightness(0.75) saturate(0.85) sepia(0.2)',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Hero content + divider — fills the viewport */}
      <div className="relative z-10 min-h-screen flex flex-col pt-16">
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-4">
              <img src="/brand-mark.svg" alt="Better Wealth logo" className="h-24 md:h-28 w-auto mx-auto" />
            </div>

            <h1 className="text-metallic font-serif font-bold leading-tight mb-5 text-4xl md:text-5xl lg:text-6xl">
              A Private Community for Independent Wealth Builders
            </h1>

            <div className="w-12 h-0.5 mx-auto mb-5" style={{ backgroundColor: 'rgba(196, 146, 106, 0.5)' }}></div>

            <p className="text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8 font-medium" style={subtext}>
              Better Wealth is a private network and events platform centred around real estate, financial services and growth-led business.
            </p>

            <div className="flex justify-center">
              <button onClick={() => setIsWaitlistModalOpen(true)} className="btn-copper px-6 py-2.5 rounded-lg font-semibold text-base shadow-lg">
                Become a Member
              </button>
            </div>
          </div>
        </div>

        {/* Copper divider — pinned at viewport bottom */}
        <div className="max-w-4xl mx-auto w-full px-6 pb-8">
          <div style={{ height: '1px', backgroundColor: 'rgba(196, 146, 106, 0.4)' }}></div>
        </div>
      </div>

      <MarqueeTicker />

      {/* Stats — below the fold */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="pt-10 pb-16 md:pt-12 md:pb-20 flex flex-col items-center">
            <hr className="w-12 border-t-2 border-copper/50 mb-10" />
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 lg:gap-16">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-serif italic font-bold">
                  <CountUp end={250} suffix="+" style={{ color: '#C4926A' }} />
                </div>
                <div className="text-base tracking-[0.25em] uppercase mt-2 font-medium" style={muted}>
                  Workshops Delivered
                </div>
              </div>
              <div className="hidden md:block w-px h-10" style={divider}></div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-serif italic font-bold">
                  <CountUp end={50} suffix="+" style={{ color: '#C4926A' }} />
                </div>
                <div className="text-base tracking-[0.25em] uppercase mt-2 font-medium" style={muted}>
                  Expert Speakers
                </div>
              </div>
              <div className="hidden md:block w-px h-10" style={divider}></div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-serif italic font-bold">
                  <CountUp end={95} prefix="£" suffix="k+" style={{ color: '#C4926A' }} />
                </div>
                <div className="text-base tracking-[0.25em] uppercase mt-2 font-medium" style={muted}>
                  Avg. Annual Income Growth
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
    <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </>
  )
}