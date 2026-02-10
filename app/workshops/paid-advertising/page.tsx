import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import FadeIn from '@/components/FadeIn'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import WorkshopDates from '@/components/WorkshopDates'

export const metadata: Metadata = {
  title: 'Paid Advertising Fundamentals for Lead Gen',
  description: 'Learn paid advertising strategies for mortgage brokers and financial advisors. Half-day workshop in Manchester. Facebook, Google & LinkedIn ads that generate leads.',
  keywords: ['paid advertising workshop', 'Facebook ads for brokers', 'Google ads mortgage', 'lead generation ads', 'financial advisor advertising'],
  alternates: {
    canonical: 'https://better-wealth.co.uk/workshops/paid-advertising',
  },
  openGraph: {
    title: 'Paid Advertising Workshop | Better Wealth',
    description: 'Learn paid advertising strategies built specifically for mortgage brokers. Half-day workshop in Manchester.',
    url: 'https://better-wealth.co.uk/workshops/paid-advertising',
  },
}

export default function PaidAdvertisingWorkshop() {
  const labelColor = { color: '#C4926A' }
  const mutedDark = { color: 'rgba(0,0,0,0.35)' }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Main Content Section */}
      <section className="w-full pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-24" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-16 items-start">
            {/* Left Column - Image */}
            <FadeIn className="lg:col-span-2 px-6 lg:pl-12 lg:pr-0">
              <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/workshop-photo-5.jpeg"
                  alt="Paid Advertising Fundamentals for Lead Gen"
                  fill={true}
                  className="object-cover scale-125"
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
              </div>
            </FadeIn>

            {/* Right Column - Content */}
            <FadeIn delay={100} className="lg:col-span-3 px-6 lg:pl-0 lg:pr-12">
              <div className="p-8 lg:p-12 bg-white rounded-2xl" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                {/* Title */}
                <h1 className="text-emerald text-3xl md:text-4xl font-serif font-bold mb-4">
                  Paid Advertising Fundamentals for Lead Gen
                </h1>

                {/* Details */}
                <div className="bg-white rounded-xl p-6 mb-6" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#C4926A' }}>Location</p>
                      <p className="text-sm font-medium text-emerald">Salford, Manchester</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#C4926A' }}>Duration</p>
                      <p className="text-sm font-medium text-emerald">Half Day (9am - 1pm)</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#C4926A' }}>Investment</p>
                    <p className="text-xl font-serif font-medium text-emerald">£125 <span className="text-sm font-normal" style={{ color: 'rgba(0,0,0,0.6)' }}>per person</span></p>
                  </div>
                </div>

                <div className="w-16 h-1 my-8" style={{ background: 'linear-gradient(90deg, #C4926A, transparent)' }}></div>

                {/* Overview */}
                <div className="space-y-4 text-sm leading-relaxed mb-10" style={mutedDark}>
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

                <div className="w-full h-px my-8" style={{ background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}></div>

                {/* What You'll Learn */}
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={labelColor}>
                    What You'll Learn
                  </p>
                  <div className="bg-white rounded-xl p-6" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                    <ul className="list-disc list-inside space-y-3 text-sm" style={{ color: '#C4926A' }}>
                      <li><span className="text-emerald">Platform fundamentals specific to financial services</span></li>
                      <li><span className="text-emerald">Targeting strategies that comply with FCA guidelines</span></li>
                      <li><span className="text-emerald">How to structure campaigns that generate qualified leads</span></li>
                      <li><span className="text-emerald">Video ad creation with live feedback</span></li>
                      <li><span className="text-emerald">Budget management and ROI tracking</span></li>
                      <li><span className="text-emerald">Implementation roadmap for your first 90 days</span></li>
                    </ul>
                  </div>
                </div>

                <div className="w-full h-px my-8" style={{ background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}></div>

                {/* Available Dates */}
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-widest mb-4 font-semibold" style={labelColor}>
                    Available Dates
                  </p>
                  <WorkshopDates
                    workshopSlug="paid-advertising"
                    bookingPath="/workshops/paid-advertising/book"
                  />
                </div>

                {/* Register Button */}
                <Link
                  href="/workshops/paid-advertising/book"
                  className="w-full btn-copper px-8 py-4 text-white rounded-lg text-base font-semibold inline-block text-center transition-all duration-300 hover:scale-[1.02]"
                >
                  Reserve Your Place →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-emerald">What's Included</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 rounded-xl" style={{ backgroundColor: '#F4F2EF' }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(196, 146, 106, 0.15)' }}>
                <span className="text-xl" style={{ color: '#C4926A' }}>✓</span>
              </div>
              <div>
                <h3 className="font-medium text-emerald mb-1">Full Workshop Session</h3>
                <p className="text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>Complete hands-on training day with practical exercises</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl" style={{ backgroundColor: '#F4F2EF' }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(196, 146, 106, 0.15)' }}>
                <span className="text-xl" style={{ color: '#C4926A' }}>✓</span>
              </div>
              <div>
                <h3 className="font-medium text-emerald mb-1">All Materials & Templates</h3>
                <p className="text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>Ready-to-use resources and frameworks you can implement immediately</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl" style={{ backgroundColor: '#F4F2EF' }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(196, 146, 106, 0.15)' }}>
                <span className="text-xl" style={{ color: '#C4926A' }}>✓</span>
              </div>
              <div>
                <h3 className="font-medium text-emerald mb-1">Your Completed Ad Deliverable</h3>
                <p className="text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>Leave with a ready-to-launch advertising campaign</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl" style={{ backgroundColor: '#F4F2EF' }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(196, 146, 106, 0.15)' }}>
                <span className="text-xl" style={{ color: '#C4926A' }}>✓</span>
              </div>
              <div>
                <h3 className="font-medium text-emerald mb-1">Post-Workshop Community Access</h3>
                <p className="text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>Join our network of professionals for ongoing support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
