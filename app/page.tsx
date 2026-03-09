import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FadeIn from '@/components/FadeIn'
import FAQ from '@/components/FAQ'
import WhatWeDo from '@/components/WhatWeDo'
import Footer from '@/components/Footer'
import Link from 'next/link'
import BottomCTA from '@/components/BottomCTA'

export const metadata: Metadata = {
  title: 'Better Wealth | A Private Community for Independent Wealth Builders',
  description: 'Better Wealth is a private network and events platform centred around real estate, financial services and growth-led business.',
  keywords: ['private community', 'wealth builders', 'real estate', 'financial services', 'networking', 'workshops', 'Manchester', 'founders', 'operators'],
  alternates: {
    canonical: 'https://better-wealth.co.uk',
  },
  openGraph: {
    title: 'Better Wealth | A Private Community for Independent Wealth Builders',
    description: 'Better Wealth is a private network and events platform centred around real estate, financial services and growth-led business.',
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

      <WhatWeDo />

      {/* How We Work */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald mt-1 mb-6">Apply</h2>
              <p className="text-base leading-relaxed max-w-3xl mx-auto" style={mutedDark}>
                If you feel aligned with Better Wealth, you are welcome to apply for membership. Applications are reviewed individually.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 items-stretch">
            <FadeIn delay={0} className="h-full">
              <div className="px-6 py-7 rounded-xl border-t-2 border-[#C4926A] text-left flex flex-col h-full" style={{ backgroundColor: '#0D2418' }}>
                <h3 className="font-serif text-lg font-bold mb-2" style={{ color: '#C4926A' }}>Events</h3>
                <p className="text-base leading-relaxed flex-grow font-normal" style={{ color: 'rgba(237,232,224,0.65)' }}>
                  Three-hour intensive sessions focused on specific marketing disciplines—paid advertising, compliance, lead generation systems. You walk in with a problem, you walk out with a plan.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100} className="h-full">
              <div className="px-6 py-7 rounded-xl border-t-2 border-[#C4926A] text-left flex flex-col h-full" style={{ backgroundColor: '#0D2418' }}>
                <h3 className="font-serif text-lg font-bold mb-2" style={{ color: '#C4926A' }}>Bootcamps</h3>
                <p className="text-base leading-relaxed flex-grow font-normal" style={{ color: 'rgba(237,232,224,0.65)' }}>
                  Multi-day immersive programs for businesses and professionals ready to overhaul their entire commercial operation. Marketing, operations, sales systems, team structure—we build it with you, not for you.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <div className="px-6 py-7 rounded-xl border-t-2 border-[#C4926A] text-left flex flex-col h-full" style={{ backgroundColor: '#0D2418' }}>
                <h3 className="font-serif text-lg font-bold mb-2" style={{ color: '#C4926A' }}>Private Networking Events</h3>
                <p className="text-base leading-relaxed flex-grow font-normal" style={{ color: 'rgba(237,232,224,0.65)' }}>
                  Curated gatherings for vetted members focused on strategic discussions, deal flow opportunities, and high-level introductions. These aren't mixers. They're curated environments designed for professionals who value quality connections over quantity.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <p className="text-base text-center pt-8 max-w-3xl mx-auto" style={mutedDark}>
              Events are open to all. Bootcamps and networking require application.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-20 lg:py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-1">Upcoming Events</h2>
              <p className="mt-3 max-w-lg mx-auto text-base" style={mutedLight}>
                Limited places available. Each event is capped to ensure maximum value and personal attention.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0} className="h-full">
              <article className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col" style={cardBorder}>
                <div style={{ height: '220px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }} className="flex-shrink-0 relative">
                  <img
                    src="/cortland-dining.png"
                    alt="Office scene for Paid Advertising workshop"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center', filter: 'brightness(0.82) saturate(0.9)' }}
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(rgba(196,146,106,0.08), rgba(0,0,0,0.2))' }}></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-5">
                    <div className="text-white rounded-xl p-3 text-center w-16 flex-shrink-0" style={badgeBg}>
                      <div className="text-base uppercase tracking-wide opacity-50">Feb</div>
                      <div className="text-xl font-bold">15</div>
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-emerald">Paid Advertising Fundamentals for Lead Gen</h3>
                      <p className="text-base mt-0.5" style={mutedDark}>Manchester • 9am – 1pm • Limited Places</p>
                    </div>
                  </div>
                  <p className="text-base mt-2 leading-relaxed flex-grow" style={{ color: '#6B7280' }}>Learn paid advertising strategies built specifically for mortgage brokers.</p>
                  <Link href="/workshops/paid-advertising" className="btn-copper-invert mt-4 w-full inline-block px-6 py-2.5 rounded-md text-base text-center">Reserve Your Place</Link>
                </div>
              </article>
            </FadeIn>

            <FadeIn delay={100} className="h-full">
              <article className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col" style={cardBorder}>
                <div style={{ height: '220px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }} className="flex-shrink-0 relative">
                  <img
                    src="/cortland-coworking.png"
                    alt="Luxury office building for Entering Financial Services workshop"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center', filter: 'brightness(0.82) saturate(0.9)' }}
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(rgba(196,146,106,0.08), rgba(0,0,0,0.2))' }}></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-5">
                    <div className="text-white rounded-xl p-3 text-center w-16 flex-shrink-0" style={badgeBg}>
                      <div className="text-base uppercase tracking-wide opacity-50">Mar</div>
                      <div className="text-xl font-bold">01</div>
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-emerald">Entering Financial Services</h3>
                      <p className="text-base mt-0.5" style={mutedDark}>Manchester • 2pm – 6pm • Limited Places</p>
                    </div>
                  </div>
                  <p className="text-base mt-2 leading-relaxed flex-grow" style={{ color: '#6B7280' }}>Master the compliance and qualification process to become FCA regulated.</p>
                  <Link href="/workshops/entering-financial-services" className="btn-copper-invert mt-4 w-full inline-block px-6 py-2.5 rounded-md text-base text-center">Reserve Your Place</Link>
                </div>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Face-to-Face Matters */}
      <section className="py-12 md:py-16 lg:py-20 px-6 relative border-t border-[#C4926A]/30" style={{ backgroundColor: '#F4F2EF' }}>
        <span className="text-8xl font-serif absolute top-8 left-8 select-none" style={{ color: 'rgba(196,146,106,0.1)' }} aria-hidden="true">{"\u201C"}</span>
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald mt-1 mb-6">Why Face-to-Face Matters</h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: '#6B7569' }}>
                Online courses are convenient. They're also forgettable. You can pause them, skip through them, and never actually implement anything. Better Wealth is face-to-face because real learning happens in a room with other people who are solving the same problems you are. You can't hide. You can't multitask. You show up, you focus, and you leave with something built. That's the point.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Who You'll Meet */}
      <section className="py-12 md:py-16 lg:py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.55) saturate(0.75) sepia(0.25)' }} />
        <div className="absolute inset-0 bg-black/50" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-8">
              <div className="w-12 mx-auto border-t-2 border-[#C4926A]/50 mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-1 mb-6">Who You'll Meet</h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={mutedLight}>
                Better Wealth attracts a specific type of professional: ambitious, ethically driven, and commercially focused. Our events bring together financial advisors scaling their practices, estate agents developing marketing systems, wealth managers building client pipelines, and operators who've realized that the network you build determines the opportunities you access. If that's your calibre, you'll fit in.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-12 pb-8 md:pt-20 md:pb-12 relative overflow-hidden" style={{ backgroundColor: '#F4F2EF' }}>
        <FadeIn>
          <div className="text-center px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-emerald mt-1">What Our Members Say</h2>
            <div className="w-12 border-t-2 border-[#C4926A]/40 mx-auto mt-4"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-6 mt-10 md:mt-16">
          <FadeIn>
            <article className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-default flex flex-col h-full border border-white/5" style={{ backgroundColor: '#0D2418' }}>
              <div className="font-serif text-7xl -mb-4" style={{ color: 'rgba(196,146,106,0.2)' }}>{"\u201C"}</div>
              <p className="font-serif italic text-[17px] leading-relaxed flex-grow" style={{ color: '#EDE8E0' }}>
                I've been part of a lot of networks over the years. Most of them are full of people who are great at talking about building wealth but haven't actually done it. Better Wealth is different — the people in the room are operators. The conversations are honest, the connections are genuine, and I've walked away from every session with something I've actually used.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#7a6452' }}>
                  BH
                </div>
                <div>
                  <p className="text-base font-medium" style={{ color: '#C4926A' }}>Brad Hoffman</p>
                  <p className="text-base uppercase tracking-wider mt-0.5 text-white/50">Co Founder, AEGIS Intelligence</p>
                </div>
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={100}>
            <article className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-default flex flex-col h-full border border-white/5" style={{ backgroundColor: '#0D2418' }}>
              <div className="font-serif text-7xl -mb-4" style={{ color: 'rgba(196,146,106,0.2)' }}>{"\u201C"}</div>
              <p className="font-serif italic text-[17px] leading-relaxed flex-grow" style={{ color: '#EDE8E0' }}>
                What struck me early on was how curated everything felt. It wasn't just another membership you sign up for and forget about. From the first introduction, I was connected with people relevant to where my business actually was. Twelve months in, two of those connections have turned into ongoing partnerships. The ROI speaks for itself.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#5c6b5a' }}>
                  GA
                </div>
                <div>
                  <p className="text-base font-medium" style={{ color: '#C4926A' }}>Gail Adams</p>
                  <p className="text-base uppercase tracking-wider mt-0.5 text-white/50">Director, RGA Property Solutions Ltd</p>
                </div>
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={200}>
            <article className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-default flex flex-col h-full border border-white/5" style={{ backgroundColor: '#0D2418' }}>
              <div className="font-serif text-7xl -mb-4" style={{ color: 'rgba(196,146,106,0.2)' }}>{"\u201C"}</div>
              <p className="font-serif italic text-[17px] leading-relaxed flex-grow" style={{ color: '#EDE8E0' }}>
                I was sceptical at first — I'd sat through enough business programmes to know that most of them aren't built for people already operating at a certain level. Better Wealth didn't waste my time. The workshops are focused, the network is serious, and for the first time in a while I felt like I was in a room with people who genuinely understood the challenges I was facing.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#6b5a4a' }}>
                  JP
                </div>
                <div>
                  <p className="text-base font-medium" style={{ color: '#C4926A' }}>Jordan Price</p>
                  <p className="text-base uppercase tracking-wider mt-0.5 text-white/50">Co Founder, Small City Marketing Ltd</p>
                </div>
              </div>
            </article>
          </FadeIn>
        </div>
      </section>

      <FAQ />

      <BottomCTA />

      <Footer />
    </main>
  )
}