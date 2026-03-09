'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import MobileNav from '@/components/MobileNav'
import WaitlistModal from '@/components/WaitlistModal'
import MarqueeTicker from '@/components/MarqueeTicker'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const labelColor = { color: '#9d6d47' }
  const mutedLight = { color: '#B8D4C5' }
  const mutedDark = { color: 'rgba(0,0,0,0.35)' }

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
            <Link href="/about" className="pointer-events-auto text-base font-medium transition-colors duration-200" style={{ color: '#C4926A' }}>About</Link>
            <Link href="/partnerships" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">Partnerships</Link>
            <Link href="/contact" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="hidden lg:block bg-[#C4926A] hover:bg-[#B07D57] text-white text-base font-medium px-5 py-2 rounded-lg transition-all duration-200"
            >
              Become a Member
            </button>
            <MobileNav currentPage="about" onBecomeMember={() => setIsWaitlistModalOpen(true)} />
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
      <section className="py-36 md:py-48 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35) saturate(0.7) sepia(0.3)' }} />
        <div className="absolute inset-0 bg-black/60" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-white text-5xl md:text-7xl font-serif font-bold mb-6">
              Behind the Brand
            </h1>
            <p className="text-base leading-relaxed max-w-2xl mx-auto text-white/80">
              Better Wealth was founded on a straightforward belief: proximity influences direction. The people you spend time with affect your thinking, your opportunities and your standards. We are building a network anchored in real estate and finance, while remaining open to founders and operators aligned with that ecosystem. Our approach is measured. We are not building for noise. We are building for longevity.
            </p>
          </div>
        </FadeIn>
      </section>

      <MarqueeTicker />

      {/* Our Approach Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0A1F10' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeIn>
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                  How We Build
                </h2>
                <div className="w-10 border-t-2 border-[#C4926A]/50 mt-4 mb-6"></div>
                <p className="font-serif italic text-xl" style={{ color: '#C4926A' }}>
                  Better Wealth is designed for individuals who think beyond short-term cycles.
                </p>
              </div>
            </FadeIn>

            <div>
              <FadeIn delay={0}>
                <div className="flex items-start gap-4 mb-6">
                  <span className="font-serif text-3xl leading-none flex-shrink-0" style={{ color: 'rgba(196,146,106,0.4)' }}>01</span>
                  <span className="text-base leading-relaxed" style={{ color: 'rgba(237,232,224,0.8)' }}>Smaller rooms</span>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="flex items-start gap-4 mb-6">
                  <span className="font-serif text-3xl leading-none flex-shrink-0" style={{ color: 'rgba(196,146,106,0.4)' }}>02</span>
                  <span className="text-base leading-relaxed" style={{ color: 'rgba(237,232,224,0.8)' }}>Clear commercial relevance</span>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="flex items-start gap-4 mb-6">
                  <span className="font-serif text-3xl leading-none flex-shrink-0" style={{ color: 'rgba(196,146,106,0.4)' }}>03</span>
                  <span className="text-base leading-relaxed" style={{ color: 'rgba(237,232,224,0.8)' }}>Thoughtful growth</span>
                </div>
              </FadeIn>
              <FadeIn delay={240}>
                <div className="flex items-start gap-4 mb-6">
                  <span className="font-serif text-3xl leading-none flex-shrink-0" style={{ color: 'rgba(196,146,106,0.4)' }}>04</span>
                  <span className="text-base leading-relaxed" style={{ color: 'rgba(237,232,224,0.8)' }}>Trusted introductions</span>
                </div>
              </FadeIn>
              <FadeIn delay={320}>
                <div className="flex items-start gap-4">
                  <span className="font-serif text-3xl leading-none flex-shrink-0" style={{ color: 'rgba(196,146,106,0.4)' }}>05</span>
                  <span className="text-base leading-relaxed" style={{ color: 'rgba(237,232,224,0.8)' }}>Long-term relationships</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Charitable Commitment Section */}
      <section className="py-24 px-6 border-t border-[#C4926A]/25" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald">
                Charitable Commitment
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-base leading-relaxed text-center max-w-3xl mx-auto" style={mutedDark}>
              A percentage of workshop revenue supports charities aligned with housing access and financial education. Commercial progress and social responsibility are not separate ideas.
            </p>
            <div className="mt-12 text-center">
              <p className="text-base uppercase tracking-widest mb-6 font-medium" style={labelColor}>We donate through:</p>
              <div className="w-24 border-t border-[#C4926A]/20 mx-auto mt-8 mb-10"></div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-16" style={{ animation: 'logoScroll 20s linear infinite', width: 'fit-content' }}>
                  <img src="/logos/GoFundMe%20logo.png" alt="GoFundMe" className="object-contain transition-all duration-300 flex-shrink-0" style={{ height: '22px', width: 'auto', filter: 'grayscale(100%) opacity(35%)', mixBlendMode: 'multiply' }} onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) opacity(65%)')} onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) opacity(35%)')} />
                  <img src="/logos/JustGiving.png" alt="JustGiving" className="object-contain transition-all duration-300 flex-shrink-0" style={{ height: '18px', width: 'auto', filter: 'grayscale(100%) opacity(35%)', mixBlendMode: 'multiply' }} onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) opacity(65%)')} onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) opacity(35%)')} />
                  <img src="/logos/Crowdfunder.png" alt="Crowdfunder" className="object-contain transition-all duration-300 flex-shrink-0" style={{ height: '24px', width: 'auto', filter: 'grayscale(100%) opacity(35%)', mixBlendMode: 'multiply' }} onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) opacity(65%)')} onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) opacity(35%)')} />
                  <img src="/logos/paypal.svg" alt="PayPal" className="object-contain transition-all duration-300 flex-shrink-0" style={{ height: '32px', width: 'auto', filter: 'grayscale(100%) opacity(35%)', mixBlendMode: 'multiply' }} onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) opacity(65%)')} onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) opacity(35%)')} />
                  {/* Duplicate set for seamless loop */}
                  <img src="/logos/GoFundMe%20logo.png" alt="" aria-hidden="true" className="object-contain transition-all duration-300 flex-shrink-0" style={{ height: '22px', width: 'auto', filter: 'grayscale(100%) opacity(35%)', mixBlendMode: 'multiply' }} onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) opacity(65%)')} onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) opacity(35%)')} />
                  <img src="/logos/JustGiving.png" alt="" aria-hidden="true" className="object-contain transition-all duration-300 flex-shrink-0" style={{ height: '18px', width: 'auto', filter: 'grayscale(100%) opacity(35%)', mixBlendMode: 'multiply' }} onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) opacity(65%)')} onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) opacity(35%)')} />
                  <img src="/logos/Crowdfunder.png" alt="" aria-hidden="true" className="object-contain transition-all duration-300 flex-shrink-0" style={{ height: '24px', width: 'auto', filter: 'grayscale(100%) opacity(35%)', mixBlendMode: 'multiply' }} onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) opacity(65%)')} onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) opacity(35%)')} />
                  <img src="/logos/paypal.svg" alt="" aria-hidden="true" className="object-contain transition-all duration-300 flex-shrink-0" style={{ height: '32px', width: 'auto', filter: 'grayscale(100%) opacity(35%)', mixBlendMode: 'multiply' }} onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) opacity(65%)')} onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) opacity(35%)')} />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#033A22]">
                What We Stand For
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0} className="h-full">
              <div className="p-8 rounded-xl h-full flex flex-col border border-[#C4926A]/15 border-t-2 border-t-[#C4926A] shadow-md" style={{ backgroundColor: '#0D2418' }}>
                <h3 className="font-serif text-lg font-bold mb-3" style={{ color: '#C4926A' }}>Quality Over Volume</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,232,224,0.85)' }}>
                  We don't chase numbers. Every member is vetted, every workshop is curated, and every connection is intentional. We'd rather build something exceptional for the right people than something average for everyone.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={50} className="h-full">
              <div className="p-8 rounded-xl h-full flex flex-col border border-[#C4926A]/15 border-t-2 border-t-[#C4926A] shadow-md" style={{ backgroundColor: '#0D2418' }}>
                <h3 className="font-serif text-lg font-bold mb-3" style={{ color: '#C4926A' }}>Practitioners, Not Theorists</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,232,224,0.85)' }}>
                  Everything inside Better Wealth comes from people who are actively building. Our members, speakers, and sessions are grounded in real experience, not recycled frameworks or textbook strategy.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100} className="h-full">
              <div className="p-8 rounded-xl h-full flex flex-col border border-[#C4926A]/15 border-t-2 border-t-[#C4926A] shadow-md" style={{ backgroundColor: '#0D2418' }}>
                <h3 className="font-serif text-lg font-bold mb-3" style={{ color: '#C4926A' }}>Wealth Built on Your Terms</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,232,224,0.85)' }}>
                  We believe financial independence looks different for everyone. Better Wealth exists to give founders and operators the network, tools, and knowledge to build wealth in a way that fits their business and their life.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150} className="h-full">
              <div className="p-8 rounded-xl h-full flex flex-col border border-[#C4926A]/15 border-t-2 border-t-[#C4926A] shadow-md" style={{ backgroundColor: '#0D2418' }}>
                <h3 className="font-serif text-lg font-bold mb-3" style={{ color: '#C4926A' }}>Long-Term Thinking</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,232,224,0.85)' }}>
                  We're not interested in quick wins or short-term noise. The conversations, relationships, and strategies inside Better Wealth are built with longevity in mind, because lasting wealth takes a long view.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <div className="p-8 rounded-xl h-full flex flex-col border border-[#C4926A]/15 border-t-2 border-t-[#C4926A] shadow-md" style={{ backgroundColor: '#0D2418' }}>
                <h3 className="font-serif text-lg font-bold mb-3" style={{ color: '#C4926A' }}>A Network Worth Being Part Of</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,232,224,0.85)' }}>
                  The people around you shape what's possible. We take the composition of our community seriously, which is why membership is application-based and why members consistently cite the network as the most valuable thing we offer.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={250} className="h-full">
              <div className="p-8 rounded-xl h-full flex flex-col border border-[#C4926A]/15 border-t-2 border-t-[#C4926A] shadow-md" style={{ backgroundColor: '#0D2418' }}>
                <h3 className="font-serif text-lg font-bold mb-3" style={{ color: '#C4926A' }}>Openness Within Trust</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,232,224,0.85)' }}>
                  Our members share openly — strategies, mistakes, wins, and lessons. That level of honesty is only possible because everyone in the room has earned their place in it.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35) saturate(0.7) sepia(0.3)' }} />
        <div className="absolute inset-0 bg-black/60" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="w-12 border-t-2 border-[#C4926A]/60 mx-auto mb-8"></div>
            <h2 className="mb-8 text-center">
              <span className="block text-3xl md:text-4xl font-serif font-bold italic text-white">Ready to Get</span>
              <span className="block text-5xl md:text-6xl font-serif font-bold text-white">Involved.</span>
            </h2>
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="btn-copper px-8 py-3 text-white rounded-md font-semibold text-base shadow-lg block mx-auto"
            >
              Become a Member
            </button>
          </div>
        </FadeIn>
      </section>

      <Footer />
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </main>
  )
}
