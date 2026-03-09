import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import FadeIn from '@/components/FadeIn'
import Footer from '@/components/Footer'
import EventsTabs from '@/components/EventsTabs'
import MarqueeTicker from '@/components/MarqueeTicker'
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'Events & Workshops | Better Wealth',
  description: 'Better Wealth hosts member networking events and open workshops focused on property, financial services and growth-led business.',
  keywords: ['networking events', 'workshops', 'property', 'financial services', 'member events', 'Manchester'],
  alternates: {
    canonical: 'https://better-wealth.co.uk/workshops',
  },
  openGraph: {
    title: 'Events & Workshops | Better Wealth',
    description: 'Better Wealth hosts member networking events and open workshops focused on property, financial services and growth-led business.',
    url: 'https://better-wealth.co.uk/workshops',
    images: [{ url: 'https://better-wealth.co.uk/og-image.png', width: 1200, height: 630, alt: 'Better Wealth - Private Community for Independent Wealth Builders' }],
  },
}

export default function Workshops() {
  const labelColor = { color: '#9d6d47' }
  const mutedLight = { color: '#B8D4C5' }
  const mutedDark = { color: 'rgba(0,0,0,0.35)' }
  const cardBorder = {
    border: '1px solid rgba(0,0,0,0.07)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35) saturate(0.7) sepia(0.3)' }} />
        <div className="absolute inset-0 bg-black/60" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <defs>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center">
              <h1 className="text-white text-5xl md:text-7xl font-serif font-bold mb-6">
                Networking Events
              </h1>
              <p className="max-w-2xl mx-auto text-base leading-relaxed text-white/80">
                Better Wealth hosts member events throughout the year. These are curated gatherings designed to encourage meaningful discussion and direct introductions. Some are industry focused. Some are themed. Some are simply designed to bring the right people into the same room. Members attend without additional event fees, excluding select occasions.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <MarqueeTicker />

      <EventsTabs />

      {/* Upcoming Workshops */}
      <section className="py-16 md:py-20 lg:py-24 px-6" style={{ backgroundColor: '#0D2418' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="text-base tracking-[0.25em] uppercase mb-3" style={{ color: '#C4926A' }}>UPCOMING</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Upcoming Events</h2>
              <p className="mt-3 max-w-lg mx-auto text-base text-white/60">
                Limited places available. Each event is capped to ensure maximum value and personal attention.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Workshop Card 1: Paid Advertising */}
            <FadeIn delay={0} className="h-full">
              <Link href="/workshops/paid-advertising" className="block h-full">
                <article className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col cursor-pointer" style={cardBorder}>
                  <div className="relative overflow-hidden rounded-t-lg h-48">
                    <img
                      src="/cortland-dining.png"
                      alt="Elegant event venue interior"
                      className="w-full h-full object-cover rounded-lg"
                      style={{ filter: 'brightness(0.55) saturate(0.75) sepia(0.25)' }}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(rgba(196,146,106,0.08), rgba(0,0,0,0.2))' }}></div>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, transparent 40%)' }}></div>
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h2 className="text-emerald font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 md:min-h-[5rem]">
                      Paid Advertising Fundamentals for Lead Gen
                    </h2>
                    <p className="text-sm mb-5" style={mutedDark}>
                      Salford, Manchester • Full Day • £125
                    </p>
                    <div className="flex-1 space-y-4 mb-6 text-sm leading-relaxed" style={mutedDark}>
                      <p>
                        A practical, hands-on event where mortgage brokers learn to build profitable advertising campaigns from scratch. No fluff, no theory—you'll leave with a working ad ready to launch.
                      </p>
                      <p>
                        We cover platform fundamentals, targeting strategies that actually work in financial services, and how to structure campaigns that generate qualified leads without burning budget.
                      </p>
                      <p>
                        You'll also record your first video ad during the session with live feedback. This is execution-focused: by the end of the day, you'll have something built.
                      </p>
                    </div>
                    <div className="btn-copper-invert mt-auto w-full inline-block px-6 py-2.5 rounded-md text-sm text-center">
                      View Details
                    </div>
                  </div>
                </article>
              </Link>
            </FadeIn>

            {/* Workshop Card 2: Entering Financial Services */}
            <FadeIn delay={150} className="h-full">
              <Link href="/workshops/entering-financial-services" className="block h-full">
                <article className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col cursor-pointer" style={cardBorder}>
                  <div className="relative overflow-hidden rounded-t-lg h-48">
                    <img
                      src="/cortland-coworking.png"
                      alt="Intimate private gathering space"
                      className="w-full h-full object-cover rounded-lg"
                      style={{ filter: 'brightness(0.55) saturate(0.75) sepia(0.25)' }}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(rgba(196,146,106,0.08), rgba(0,0,0,0.2))' }}></div>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, transparent 40%)' }}></div>
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h2 className="text-emerald font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 md:min-h-[5rem]">
                      Entering Financial Services
                    </h2>
                    <p className="text-sm mb-5" style={mutedDark}>
                      Salford, Manchester • Full Day • £125
                    </p>
                    <div className="flex-1 space-y-4 mb-6 text-sm leading-relaxed" style={mutedDark}>
                      <p>
                        Designed for ambitious career changers and graduates looking to enter financial services without the corporate ladder or connections. We break down the real pathways into the industry—from employed adviser roles to self-employed models—and explain what it actually takes to earn £50k-£100k+ within 2-3 years.
                      </p>
                      <p>
                        You'll learn how to navigate qualifications (CeMAP explained properly), build a sustainable structure, and position yourself in a way that generates opportunities.
                      </p>
                      <p>
                        This isn't motivational—it's practical guidance for people serious about making the move.
                      </p>
                    </div>
                    <div className="btn-copper-invert mt-auto w-full inline-block px-6 py-2.5 rounded-md text-sm text-center">
                      View Details
                    </div>
                  </div>
                </article>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
