import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import FadeIn from '@/components/FadeIn'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Practical marketing workshops for mortgage brokers and financial advisors. Face-to-face training in Manchester with real deliverables. Book your place today.',
  keywords: ['marketing workshops', 'mortgage broker training', 'financial advisor workshops', 'Manchester workshops', 'paid advertising training', 'lead generation workshop'],
  alternates: {
    canonical: 'https://better-wealth.co.uk/workshops',
  },
  openGraph: {
    title: 'Workshops | Better Wealth',
    description: 'Practical marketing workshops for mortgage brokers and financial advisors. Face-to-face training with real deliverables.',
    url: 'https://better-wealth.co.uk/workshops',
  },
}

export default function Workshops() {
  const accentLine = {
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #C4926A, transparent)'
  }
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
      <section className="pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
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
              <div className="w-12 mx-auto mb-6" style={accentLine}></div>
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#C4926A' }}>Workshops</p>
              <h1 className="text-white text-4xl md:text-5xl font-serif font-bold mt-1 mb-6">
                Practical Marketing Education
              </h1>
              <p className="max-w-2xl mx-auto text-base leading-relaxed" style={mutedLight}>
                Face-to-face workshops designed for ambitious professionals in financial services and real estate. No theory. No motivation. Just frameworks, templates, and deliverables you can implement immediately.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-12 md:py-16 lg:py-20 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Workshop Card 1: Paid Advertising */}
            <FadeIn delay={0} className="h-full">
              <Link href="/workshops/paid-advertising" className="block h-full">
                <article className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col cursor-pointer" style={cardBorder}>
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src="/workshop-photo-3.jpeg"
                      alt="Attendees collaborating during the Paid Advertising Fundamentals for Lead Gen workshop"
                      fill
                      className="w-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h2 className="text-emerald font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 md:min-h-[5rem]">
                      Paid Advertising Fundamentals for Lead Gen
                    </h2>
                    <p className="text-xs mb-5" style={mutedDark}>
                      Salford, Manchester • Full Day • £125
                    </p>
                    <div className="flex-1 space-y-4 mb-6 text-base leading-relaxed" style={mutedDark}>
                      <p>
                        A practical, hands-on workshop where mortgage brokers learn to build profitable advertising campaigns from scratch. No fluff, no theory—you'll leave with a working ad ready to launch.
                      </p>
                      <p>
                        We cover platform fundamentals, targeting strategies that actually work in financial services, and how to structure campaigns that generate qualified leads without burning budget.
                      </p>
                      <p>
                        You'll also record your first video ad during the session with live feedback. This is execution-focused: by the end of the day, you'll have something built.
                      </p>
                    </div>
                    <div className="btn-copper mt-auto w-full inline-block px-6 py-2.5 text-white rounded-lg text-sm font-semibold text-center">
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
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src="/workshop-photo-4.jpeg"
                      alt="Participants at the Entering Financial Services workshop learning about FCA compliance"
                      fill
                      className="w-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h2 className="text-emerald font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 md:min-h-[5rem]">
                      Entering Financial Services
                    </h2>
                    <p className="text-xs mb-5" style={mutedDark}>
                      Salford, Manchester • Full Day • £125
                    </p>
                    <div className="flex-1 space-y-4 mb-6 text-base leading-relaxed" style={mutedDark}>
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
                    <div className="btn-copper mt-auto w-full inline-block px-6 py-2.5 text-white rounded-lg text-sm font-semibold text-center">
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
