import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import FadeIn from '@/components/FadeIn'
import Footer from '@/components/Footer'
import Link from 'next/link'
import WorkshopDates from '@/components/WorkshopDates'
import MarqueeTicker from '@/components/MarqueeTicker'

export const metadata: Metadata = {
  title: 'Entering Financial Services',
  description: 'Event for professionals entering financial services. Learn about FCA compliance, qualifications, and building your first client pipeline. Manchester-based training.',
  keywords: ['entering financial services', 'FCA compliance training', 'become a mortgage broker', 'financial advisor qualification', 'CeMAP training'],
  alternates: {
    canonical: 'https://better-wealth.co.uk/workshops/entering-financial-services',
  },
  openGraph: {
    title: 'Entering Financial Services Event | Better Wealth',
    description: 'Event for professionals entering financial services. Learn about FCA compliance and building your first client pipeline.',
    url: 'https://better-wealth.co.uk/workshops/entering-financial-services',
    images: [{ url: 'https://better-wealth.co.uk/og-image.png', width: 1200, height: 630, alt: 'Better Wealth - Private Community for Independent Wealth Builders' }],
  },
}

export default function EnteringFinancialServicesWorkshop() {
  const labelColor = { color: '#9d6d47' }
  const mutedDark = { color: 'rgba(0,0,0,0.35)' }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-end">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/cortland-coworking.png')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35) saturate(0.7) sepia(0.3)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15" />
        <FadeIn>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 pb-16">
            <h1 className="font-serif text-white text-4xl md:text-5xl font-bold max-w-xl mb-6">
              Entering Financial Services
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <span className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1 h-1 rounded-full bg-[#C4926A] inline-block" />
                Salford, Manchester
              </span>
              <span className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1 h-1 rounded-full bg-[#C4926A] inline-block" />
                Half Day (2pm - 6pm)
              </span>
              <span className="font-serif text-[#C4926A] text-2xl font-bold">£125</span>
            </div>
          </div>
        </FadeIn>
      </section>
      <MarqueeTicker />

      {/* Content Section */}
      <section className="py-20 px-6" style={{ backgroundColor: '#0D2418' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column — Description + Bullets */}
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="space-y-4 text-base leading-relaxed mb-12" style={{ color: 'rgba(237,232,224,0.85)' }}>
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
              </FadeIn>

              <FadeIn delay={100}>
                <h3 className="font-serif text-white text-xl font-semibold mb-4">What You'll Cover</h3>
                <ul className="list-disc list-inside space-y-3 text-base" style={{ color: '#C4926A' }}>
                  <li><span style={{ color: 'rgba(237,232,224,0.8)' }}>Platform fundamentals specific to financial services</span></li>
                  <li><span style={{ color: 'rgba(237,232,224,0.8)' }}>Targeting strategies that comply with FCA guidelines</span></li>
                  <li><span style={{ color: 'rgba(237,232,224,0.8)' }}>How to structure campaigns that generate qualified leads</span></li>
                  <li><span style={{ color: 'rgba(237,232,224,0.8)' }}>Video ad creation with live feedback</span></li>
                  <li><span style={{ color: 'rgba(237,232,224,0.8)' }}>Budget management and ROI tracking</span></li>
                  <li><span style={{ color: 'rgba(237,232,224,0.8)' }}>Implementation roadmap for your first 90 days</span></li>
                </ul>
              </FadeIn>
            </div>

            {/* Right Column — Booking Sidebar */}
            <div className="lg:col-span-1">
              <FadeIn delay={150}>
                <div className="lg:sticky lg:top-24 rounded-md p-8 border border-[#C4926A]/20 border-t-2 border-t-[#C4926A]" style={{ backgroundColor: '#0A1F10' }}>
                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#C4926A] mb-1">INVESTMENT</p>
                    <p className="font-serif text-white text-4xl font-bold">
                      £125
                      <span className="text-white/40 text-base font-normal ml-2">per person</span>
                    </p>
                  </div>

                  {/* Date selector */}
                  <div className="mb-6">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#C4926A] mb-3">SELECT DATE</p>
                    <WorkshopDates
                      workshopSlug="entering-financial-services"
                      bookingPath="/workshops/entering-financial-services/book"
                      variant="dark"
                    />
                  </div>

                  {/* Reserve button */}
                  <Link
                    href="/workshops/entering-financial-services/book"
                    className="w-full bg-[#C4926A] text-white border border-[#C4926A] py-4 rounded-md font-medium tracking-wide hover:bg-transparent hover:text-[#C4926A] transition-all duration-200 inline-block text-center text-base"
                  >
                    Reserve Your Place →
                  </Link>

                  <p className="text-white/30 text-xs text-center mt-4">
                    Secure checkout · Limited places
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 md:py-20 px-6" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#033A22]">What's Included</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            <FadeIn delay={0}>
              <div className="p-7 rounded-md border-t-2 border-[#C4926A] h-full flex flex-col" style={{ backgroundColor: '#0D2418' }}>
                <span className="text-lg text-[#C4926A]">✓</span>
                <h3 className="font-serif text-base font-bold mb-2 mt-3" style={{ color: '#C4926A' }}>Full Event Session</h3>
                <p className="text-sm leading-relaxed flex-grow" style={{ color: 'rgba(237,232,224,0.75)' }}>Complete hands-on training day with practical exercises</p>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="p-7 rounded-md border-t-2 border-[#C4926A] h-full flex flex-col" style={{ backgroundColor: '#0D2418' }}>
                <span className="text-lg text-[#C4926A]">✓</span>
                <h3 className="font-serif text-base font-bold mb-2 mt-3" style={{ color: '#C4926A' }}>All Materials & Templates</h3>
                <p className="text-sm leading-relaxed flex-grow" style={{ color: 'rgba(237,232,224,0.75)' }}>Ready-to-use resources and frameworks you can implement immediately</p>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="p-7 rounded-md border-t-2 border-[#C4926A] h-full flex flex-col" style={{ backgroundColor: '#0D2418' }}>
                <span className="text-lg text-[#C4926A]">✓</span>
                <h3 className="font-serif text-base font-bold mb-2 mt-3" style={{ color: '#C4926A' }}>Your Completed Ad Deliverable</h3>
                <p className="text-sm leading-relaxed flex-grow" style={{ color: 'rgba(237,232,224,0.75)' }}>Leave with a ready-to-launch advertising campaign</p>
              </div>
            </FadeIn>

            <FadeIn delay={240}>
              <div className="p-7 rounded-md border-t-2 border-[#C4926A] h-full flex flex-col" style={{ backgroundColor: '#0D2418' }}>
                <span className="text-lg text-[#C4926A]">✓</span>
                <h3 className="font-serif text-base font-bold mb-2 mt-3" style={{ color: '#C4926A' }}>Post-Event Community Access</h3>
                <p className="text-sm leading-relaxed flex-grow" style={{ color: 'rgba(237,232,224,0.75)' }}>Join our network of professionals for ongoing support</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
