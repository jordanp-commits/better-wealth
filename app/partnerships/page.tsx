'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import MobileNav from '@/components/MobileNav'
import WaitlistModal from '@/components/WaitlistModal'
import Footer from '@/components/Footer'
import PartnershipCarousel from '@/components/PartnershipCarousel'
import MarqueeTicker from '@/components/MarqueeTicker'

export default function PartnershipsPage() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const labelColor = { color: '#9d6d47' }
  const mutedLight = { color: '#B8D4C5' }
  const mutedDark = { color: 'rgba(0,0,0,0.35)' }
  const cardBorder = {
    border: '1px solid rgba(0,0,0,0.07)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{ backgroundColor: '#0D2418' }}
      >
        <div className="relative h-16 px-6 max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <div style={{ height: '40px', overflow: 'hidden' }} className="flex items-center">
              <img
                src="/logo-single-line.svg"
                alt="Better Wealth - Home"
                style={{ height: '160px', width: 'auto' }}
              />
            </div>
          </Link>

          <div className="absolute left-0 right-0 hidden lg:flex justify-center gap-8 pointer-events-none">
            <Link href="/workshops" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">Events</Link>
            <Link href="/about" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">About</Link>
            <Link href="/partnerships" className="pointer-events-auto text-base font-medium transition-colors duration-200" style={{ color: '#C4926A' }}>Partnerships</Link>
            <Link href="/contact" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="hidden lg:block bg-[#C4926A] hover:bg-[#B07D57] text-white text-base font-medium px-5 py-2 rounded-lg transition-all duration-200"
            >
              Become a Member
            </button>
            <MobileNav currentPage="partnerships" onBecomeMember={() => setIsWaitlistModalOpen(true)} />
          </div>
        </div>
      </nav>

      {/* Grain noise filter */}
      <svg className="absolute" style={{ width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          </filter>
        </defs>
      </svg>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.55) saturate(0.7) sepia(0.3)' }} />
        <div className="absolute inset-0 bg-black/45" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-white text-5xl md:text-7xl font-serif font-bold mb-6">
              Building, Together
            </h1>
            <p className="text-base leading-relaxed max-w-2xl mx-auto text-white/80">
              We partner with firms, networks, and organisations that share our commitment to raising standards in financial services and real estate marketing.
            </p>
          </div>
        </FadeIn>
      </section>

      <MarqueeTicker />

      {/* How We Work Together */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0A1F10' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                How We Work Together
              </h2>
            </div>
          </FadeIn>

          <PartnershipCarousel />
        </div>
      </section>

      {/* Partnership Profiles */}
      <section className="py-24 px-6 border-t border-[#C4926A]/25" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: '#C4926A' }}>OUR PARTNERS</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#033A22]">
                Partnership Profiles
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="overflow-hidden">
              <div className="flex items-center gap-16" style={{ animation: 'logoScroll 25s linear infinite', width: 'fit-content' }}>
                <a href="https://www.rgaproperty.co.uk/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <img src="/logos/RGA%20Colour%20Logo.png" alt="RGA Property Solutions" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </a>
                <a href="https://aegisintelligence.co.uk/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <img src="/logos/AEGIS%20Logo.jpeg" alt="AEGIS Intelligence" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </a>
                <div className="flex-shrink-0">
                  <img src="/logos/AIMS%20Logo.jpeg" alt="AIMS" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </div>
                <a href="https://www.smallcitymarketing.com/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <img src="/logos/SC%20primary%20logo_Primary%20Logo.png" alt="Small City Marketing" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </a>
                <a href="https://www.packholidays.co.uk/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <img src="/logos/Pack%20Holidays%20Logo.webp" alt="Pack Holidays" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </a>
                {/* Duplicate set for seamless loop */}
                <a href="https://www.rgaproperty.co.uk/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" aria-hidden="true" tabIndex={-1}>
                  <img src="/logos/RGA%20Colour%20Logo.png" alt="" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </a>
                <a href="https://aegisintelligence.co.uk/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" aria-hidden="true" tabIndex={-1}>
                  <img src="/logos/AEGIS%20Logo.jpeg" alt="" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </a>
                <div className="flex-shrink-0" aria-hidden="true">
                  <img src="/logos/AIMS%20Logo.jpeg" alt="" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </div>
                <a href="https://www.smallcitymarketing.com/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" aria-hidden="true" tabIndex={-1}>
                  <img src="/logos/SC%20primary%20logo_Primary%20Logo.png" alt="" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </a>
                <a href="https://www.packholidays.co.uk/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" aria-hidden="true" tabIndex={-1}>
                  <img src="/logos/Pack%20Holidays%20Logo.webp" alt="" className="h-8 w-auto object-contain transition-all duration-300" style={{ mixBlendMode: 'multiply' }} />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35) saturate(0.7) sepia(0.3)' }} />
        <div className="absolute inset-0 bg-black/60" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="mb-6">
              <span className="block text-3xl md:text-4xl font-serif italic font-normal text-[#C4926A]">Apply for</span>
              <span className="block text-5xl md:text-6xl font-serif font-bold text-white">Membership.</span>
            </h2>
            <p className="max-w-xl mx-auto mb-8 leading-relaxed text-base text-white/75">
              Join a private network of founders and operators building long-term wealth. Applications reviewed on a rolling basis.
            </p>
            <Link
              href="/contact"
              className="btn-copper-invert px-8 py-3 rounded-md font-semibold text-base block mx-auto w-fit"
            >
              Get In Touch
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </main>
  )
}
