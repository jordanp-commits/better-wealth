import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FadeIn from '@/components/FadeIn'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Better Wealth | Marketing Education for Financial Services & Real Estate',
  description: 'Face-to-face marketing workshops for mortgage brokers and financial advisors. Practical training with real deliverables. Manchester-based, FCA-compliant strategies.',
  keywords: ['mortgage broker marketing', 'financial advisor marketing', 'FCA compliant marketing', 'broker workshops', 'Manchester', 'lead generation', 'financial services'],
  alternates: {
    canonical: 'https://better-wealth.co.uk',
  },
  openGraph: {
    title: 'Better Wealth | Marketing Education for Financial Services & Real Estate',
    description: 'Face-to-face marketing workshops for mortgage brokers and financial advisors. Practical training with real deliverables.',
    url: 'https://better-wealth.co.uk',
  },
}

export default function Home() {
  const labelColor = { color: '#9d6d47' }
  const cardBorder = {
    border: '1px solid rgba(0,0,0,0.07)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  }
  const mutedLight = { color: '#B8D4C5' }
  const mutedDark = { color: 'rgba(0,0,0,0.35)' }
  const badgeBg = { backgroundColor: '#033A22' }

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Grain noise filter — defined once, referenced by dark sections */}
      <svg className="absolute" style={{ width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          </filter>
        </defs>
      </svg>

      {/* What We Offer */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16 px-6 relative overflow-hidden" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-12 md:mb-20">
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>What We Offer</p>
              <h2 className="text-emerald text-3xl md:text-4xl font-serif font-bold mt-1 mb-6">
                What We Offer
              </h2>
              <p className="max-w-3xl mx-auto text-base leading-relaxed" style={mutedDark}>
                Better Wealth exists for one reason: most professionals in financial services and real estate never get taught how to actually market themselves. You can close deals and manage clients, but generating your own pipeline? That's a different game. We deliver face-to-face education built for your industry, a vetted community of operators who think like you, and workshops where you don't just learn—you leave with something built.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col md:flex-row gap-8 md:gap-0 text-center">
            <FadeIn delay={0} className="flex-1 md:px-8">
              <div className="relative">
                <h3 className="text-emerald font-serif text-2xl font-bold mb-4">Workshops That Deliver Output, Not Theory</h3>
                <p className="text-base leading-relaxed max-w-3xl mx-auto" style={mutedDark}>
                  You don't need another seminar where someone talks at you for three hours. Our workshops are structured around tangible deliverables—whether that's a 90-day ad campaign you've already mapped out, compliance frameworks you can implement Monday morning, or lead generation systems ready to launch. We focus on execution, not inspiration.
                </p>
              </div>
            </FadeIn>

            <div className="hidden md:block flex-shrink-0" style={{ width: '1px', alignSelf: 'stretch', background: 'linear-gradient(to bottom, transparent, rgba(196, 146, 106, 0.2), transparent)' }}></div>

            <FadeIn delay={150} className="flex-1 md:px-8">
              <div className="relative">
                <h3 className="text-emerald font-serif text-2xl font-bold mb-4">Networks That Are Vetted, Not Volume-Driven</h3>
                <p className="text-base leading-relaxed max-w-3xl mx-auto" style={mutedDark}>
                  This isn't a free-for-all networking event. Membership is curated. We're building a community of ambitious, ethically-driven professionals who operate at a certain standard. Advisors, agents, and operators who respect the game, share insights openly, and contribute more than they take. If that sounds like you, you'll fit right in.
                </p>
              </div>
            </FadeIn>

            <div className="hidden md:block flex-shrink-0" style={{ width: '1px', alignSelf: 'stretch', background: 'linear-gradient(to bottom, transparent, rgba(196, 146, 106, 0.2), transparent)' }}></div>

            <FadeIn delay={300} className="flex-1 md:px-8">
              <div className="relative">
                <h3 className="text-emerald font-serif text-2xl font-bold mb-4">Education Built for Financial Services and Real Estate Reality</h3>
                <p className="text-base leading-relaxed max-w-3xl mx-auto" style={mutedDark}>
                  Generic marketing advice doesn't work in regulated industries. Compliance matters. Client trust matters. Our programs are designed specifically for professionals in financial services and real estate who need strategies that work within the rules—and still generate real commercial outcomes.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>Our Approach</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald mt-1 mb-6">How We Work</h2>
              <p className="text-base leading-relaxed max-w-3xl mx-auto" style={mutedDark}>
                Better Wealth operates across three core areas: Workshops, Bootcamps, and Private Networking Events.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8 mt-12">
            <FadeIn delay={0}>
              <div className="bg-white p-8 rounded-2xl" style={cardBorder}>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3">Workshops</h3>
                <p className="text-base leading-relaxed max-w-3xl mx-auto" style={mutedDark}>
                  Three-hour intensive sessions focused on specific marketing disciplines—paid advertising, compliance, lead generation systems. You walk in with a problem, you walk out with a plan.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="bg-white p-8 rounded-2xl" style={cardBorder}>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3">Bootcamps</h3>
                <p className="text-base leading-relaxed max-w-3xl mx-auto" style={mutedDark}>
                  Multi-day immersive programs for businesses and professionals ready to overhaul their entire commercial operation. Marketing, operations, sales systems, team structure—we build it with you, not for you.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white p-8 rounded-2xl" style={cardBorder}>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3">Private Networking Events</h3>
                <p className="text-base leading-relaxed max-w-3xl mx-auto" style={mutedDark}>
                  Curated gatherings for vetted members focused on strategic discussions, deal flow opportunities, and high-level introductions. These aren't mixers. They're curated environments designed for professionals who value quality connections over quantity.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <p className="text-base text-center pt-6 max-w-3xl mx-auto" style={mutedDark}>
                Workshops are open to all. Bootcamps and networking require application.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-16 md:py-20 lg:py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-10 md:mb-16">
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#C4926A' }}>Upcoming</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-1">Upcoming Workshops</h2>
              <p className="mt-3 max-w-lg mx-auto text-base" style={mutedLight}>
                Limited places available. Each workshop is capped to ensure maximum value and personal attention.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0} className="h-full">
              <article className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col" style={cardBorder}>
                <div style={{ height: '220px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }} className="flex-shrink-0">
                  <img
                    src="/workshop-photo-1.jpeg"
                    alt="Mortgage brokers attending a paid advertising workshop at Better Wealth in Manchester"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-5">
                    <div className="text-white rounded-xl p-3 text-center w-16 flex-shrink-0" style={badgeBg}>
                      <div className="text-xs uppercase tracking-wide opacity-50">Feb</div>
                      <div className="text-xl font-bold">15</div>
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-emerald">Paid Advertising Fundamentals for Lead Gen</h3>
                      <p className="text-sm mt-0.5" style={mutedDark}>Manchester • Full Day • Limited Places</p>
                    </div>
                  </div>
                  <p className="text-sm mt-2 leading-relaxed flex-grow" style={{ color: '#6B7280' }}>Learn paid advertising strategies built specifically for mortgage brokers.</p>
                  <Link href="/workshops/paid-advertising" className="btn-copper mt-4 w-full inline-block px-6 py-2.5 text-white rounded-lg text-sm font-semibold text-center">Reserve Your Place</Link>
                </div>
              </article>
            </FadeIn>

            <FadeIn delay={100} className="h-full">
              <article className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col" style={cardBorder}>
                <div style={{ height: '220px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }} className="flex-shrink-0">
                  <img
                    src="/workshop-photo-2.jpeg"
                    alt="Professionals learning about entering financial services at a Better Wealth workshop"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-5">
                    <div className="text-white rounded-xl p-3 text-center w-16 flex-shrink-0" style={badgeBg}>
                      <div className="text-xs uppercase tracking-wide opacity-50">Mar</div>
                      <div className="text-xl font-bold">01</div>
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-emerald">Entering Financial Services</h3>
                      <p className="text-sm mt-0.5" style={mutedDark}>Manchester • Full Day • Limited Places</p>
                    </div>
                  </div>
                  <p className="text-sm mt-2 leading-relaxed flex-grow" style={{ color: '#6B7280' }}>Master the compliance and qualification process to become FCA regulated.</p>
                  <Link href="/workshops/entering-financial-services" className="btn-copper mt-4 w-full inline-block px-6 py-2.5 text-white rounded-lg text-sm font-semibold text-center">Reserve Your Place</Link>
                </div>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Face-to-Face Matters */}
      <section className="py-12 md:py-16 lg:py-20 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>Our Philosophy</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald mt-1 mb-6">Why Face-to-Face Matters</h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={mutedDark}>
                Online courses are convenient. They're also forgettable. You can pause them, skip through them, and never actually implement anything. Better Wealth is face-to-face because real learning happens in a room with other people who are solving the same problems you are. You can't hide. You can't multitask. You show up, you focus, and you leave with something built. That's the point.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Who You'll Meet */}
      <section className="py-12 md:py-16 lg:py-20 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#C4926A' }}>The Community</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-1 mb-6">Who You'll Meet</h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={mutedLight}>
                Better Wealth attracts a specific type of professional: ambitious, ethically driven, and commercially focused. Our workshops and events bring together financial advisors scaling their practices, estate agents developing marketing systems, wealth managers building client pipelines, and operators who've realized that the network you build determines the opportunities you access. If that's your calibre, you'll fit in.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-12 pb-8 md:pt-20 md:pb-12 relative overflow-hidden" style={{ backgroundColor: '#F4F2EF' }}>
        <FadeIn>
          <div className="text-center px-6">
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9d6d47' }}>Testimonials</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-emerald mt-1">What Our Members Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-6 mt-10 md:mt-16">
            <article className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-default bg-white" style={cardBorder}>
              <div className="font-serif text-7xl -mb-4" style={{ color: 'rgba(196,146,106,0.4)' }}>{"\u201C"}</div>
              <p className="font-serif italic text-base leading-relaxed text-emerald-dark">
                The workshop completely changed how I approach client acquisition. Within three months I had doubled my pipeline and the ROI was obvious.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#7a6452' }}>
                  JM
                </div>
                <div>
                  <p className="text-emerald text-sm font-medium">James Mitchell</p>
                  <p className="text-xs uppercase tracking-wider mt-0.5" style={mutedDark}>Independent Mortgage Broker, London</p>
                </div>
              </div>
            </article>

            <article className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-default bg-white" style={cardBorder}>
              <div className="font-serif text-7xl -mb-4" style={{ color: 'rgba(196,146,106,0.4)' }}>{"\u201C"}</div>
              <p className="font-serif italic text-base leading-relaxed text-emerald-dark">
                Finally, a training event that delivers real, actionable strategy. The network alone was worth every penny — I've already referred two brokers.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#5c6b5a' }}>
                  SC
                </div>
                <div>
                  <p className="text-emerald text-sm font-medium">Sarah Clarke</p>
                  <p className="text-xs uppercase tracking-wider mt-0.5" style={mutedDark}>Senior Broker, Manchester</p>
                </div>
              </div>
            </article>

            <article className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-default bg-white" style={cardBorder}>
              <div className="font-serif text-7xl -mb-4" style={{ color: 'rgba(196,146,106,0.4)' }}>{"\u201C"}</div>
              <p className="font-serif italic text-base leading-relaxed text-emerald-dark">
                Genuinely the best professional development I've invested in. The community aspect is what sets Better Wealth apart from everything else out there.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#6b5a4a' }}>
                  DR
                </div>
                <div>
                  <p className="text-emerald text-sm font-medium">David Reeves</p>
                  <p className="text-xs uppercase tracking-wider mt-0.5" style={mutedDark}>Estate Agent, Birmingham</p>
                </div>
              </div>
            </article>
          </div>
        </FadeIn>
      </section>

      <FAQ />

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="absolute inset-0" style={{ backgroundColor: '#033A22' }}></div>
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
            <Link href="/workshops" className="btn-copper inline-block px-10 py-4 text-white rounded-lg font-semibold text-base md:text-lg shadow-lg hover:scale-105 transition-transform duration-200">Explore Workshops</Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}