'use client'

import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'

export default function PartnershipsPage() {
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
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: '#033A22' }}
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
            <Link href="/workshops" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Events</Link>
            <Link href="/about" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">About</Link>
            <Link href="/partnerships" className="pointer-events-auto text-sm font-medium transition-colors duration-200" style={{ color: '#C4926A' }}>Partnerships</Link>
            <Link href="/contact" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/workshops"
              className="hidden lg:block btn-outline-copper text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200"
            >
              Explore Events
            </Link>
            <MobileNav currentPage="partnerships" />
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
      <section className="pt-32 pb-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(196, 146, 106, 0.12) 0%, transparent 55%)' }}></div>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#C4926A' }}>Partnerships</p>
            <h1 className="text-white text-4xl md:text-5xl font-serif font-bold mb-6">
              Let's Build Something Together
            </h1>
            <p className="text-base leading-relaxed max-w-2xl mx-auto" style={mutedLight}>
              We partner with firms, networks, and organizations that share our commitment to raising standards in financial services and real estate marketing.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Partnership Types Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>Partnership Opportunities</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald">
                How We Work Together
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0} className="h-full">
              <div className="bg-white p-8 rounded-2xl h-full flex flex-col" style={cardBorder}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#033A22' }}>
                  <svg className="w-7 h-7" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3 text-center">Corporate Training</h3>
                <p className="text-base leading-relaxed mb-4 text-center flex-grow" style={mutedDark}>
                  Bespoke events for brokerage networks, advisory firms, and estate agency groups. Tailored to your team's needs with ongoing support.
                </p>
                <p className="text-xs text-center" style={labelColor}>
                  Ideal for: Teams of 8-30 professionals
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100} className="h-full">
              <div className="bg-white p-8 rounded-2xl h-full flex flex-col" style={cardBorder}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#033A22' }}>
                  <svg className="w-7 h-7" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3 text-center">Network Partners</h3>
                <p className="text-base leading-relaxed mb-4 text-center flex-grow" style={mutedDark}>
                  Exclusive training benefits for professional networks and industry bodies. Discounted member rates, co-branded materials, and priority booking.
                </p>
                <p className="text-xs text-center" style={labelColor}>
                  Ideal for: Networks with 100+ members
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <div className="bg-white p-8 rounded-2xl h-full flex flex-col" style={cardBorder}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#033A22' }}>
                  <svg className="w-7 h-7" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3 text-center">Technology Partners</h3>
                <p className="text-base leading-relaxed mb-4 text-center flex-grow" style={mutedDark}>
                  Integration events and co-created content for CRM providers and marketing platforms serving financial services or real estate.
                </p>
                <p className="text-xs text-center" style={labelColor}>
                  Ideal for: Software companies in our sector
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Accreditations Marquee Section */}
      <section className="py-16 bg-white overflow-hidden">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="text-sm uppercase tracking-widest" style={labelColor}>Our Accreditations</h2>
          </div>
        </FadeIn>

        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container */}
          <div className="flex animate-marquee">
            {/* First set of logos */}
            <div className="flex items-center gap-16 px-8">
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/fca-logo.png" alt="FCA Regulated" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/cii-logo.png" alt="Chartered Insurance Institute" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/libf-logo.png" alt="London Institute of Banking & Finance" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/naea-logo.png" alt="NAEA Propertymark" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/arla-logo.png" alt="ARLA Propertymark" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/biba-logo.png" alt="British Insurance Brokers Association" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/cpd-logo.png" alt="CPD Certified" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/trading-standards-logo.png" alt="Trading Standards Approved" className="h-10 w-auto accreditation-logo" />
              </div>
            </div>
            {/* Duplicate set for seamless loop — decorative duplicates, hidden from screen readers */}
            <div className="flex items-center gap-16 px-8" aria-hidden="true">
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/fca-logo.png" alt="" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/cii-logo.png" alt="" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/libf-logo.png" alt="" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/naea-logo.png" alt="" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/arla-logo.png" alt="" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/biba-logo.png" alt="" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/cpd-logo.png" alt="" className="h-10 w-auto accreditation-logo" />
              </div>
              <div className="flex-shrink-0 h-12 flex items-center justify-center px-6">
                <img src="/accreditations/trading-standards-logo.png" alt="" className="h-10 w-auto accreditation-logo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>Who We Work With</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald mb-4">
                Our Partners
              </h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={mutedDark}>
                We're proud to work with leading organizations in financial services and real estate.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Partner Card 1 */}
            <FadeIn delay={0} className="h-full">
              <a
                href="https://www.primis.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <article
                  className="bg-white p-8 rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={cardBorder}
                >
                  <div className="h-16 flex items-center justify-center mb-6">
                    <img
                      src="/partners/primis-logo.png"
                      alt="Primis Mortgage Network"
                      className="max-h-12 w-auto transition-all duration-300 group-hover:scale-105 partner-logo"
                    />
                  </div>
                  <h3 className="text-emerald font-serif text-xl font-bold mb-3">Primis Mortgage Network</h3>
                  <p className="text-base leading-relaxed mb-4 flex-grow" style={mutedDark}>
                    We deliver exclusive marketing events for Primis members, helping brokers across their network build sustainable lead generation systems.
                  </p>
                  <span className="text-sm font-medium transition-all duration-200 group-hover:underline" style={{ color: '#9d6d47' }}>
                    Visit Website →
                  </span>
                </article>
              </a>
            </FadeIn>

            {/* Partner Card 2 */}
            <FadeIn delay={100} className="h-full">
              <a
                href="https://www.openwork.uk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <article
                  className="bg-white p-8 rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={cardBorder}
                >
                  <div className="h-16 flex items-center justify-center mb-6">
                    <img
                      src="/partners/openwork-logo.png"
                      alt="Openwork Partnership"
                      className="max-h-12 w-auto transition-all duration-300 group-hover:scale-105 partner-logo"
                    />
                  </div>
                  <h3 className="text-emerald font-serif text-xl font-bold mb-3">Openwork Partnership</h3>
                  <p className="text-base leading-relaxed mb-4 flex-grow" style={mutedDark}>
                    Providing bespoke training programs for Openwork advisors, focusing on compliant digital marketing and client acquisition strategies.
                  </p>
                  <span className="text-sm font-medium transition-all duration-200 group-hover:underline" style={{ color: '#9d6d47' }}>
                    Visit Website →
                  </span>
                </article>
              </a>
            </FadeIn>

            {/* Partner Card 3 */}
            <FadeIn delay={200} className="h-full">
              <a
                href="https://www.mortgageadvicebureau.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <article
                  className="bg-white p-8 rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={cardBorder}
                >
                  <div className="h-16 flex items-center justify-center mb-6">
                    <img
                      src="/partners/mab-logo.png"
                      alt="Mortgage Advice Bureau"
                      className="max-h-12 w-auto transition-all duration-300 group-hover:scale-105 partner-logo"
                    />
                  </div>
                  <h3 className="text-emerald font-serif text-xl font-bold mb-3">Mortgage Advice Bureau</h3>
                  <p className="text-base leading-relaxed mb-4 flex-grow" style={mutedDark}>
                    Partnering with MAB to deliver regional training events, equipping their advisors with modern marketing techniques for local lead generation.
                  </p>
                  <span className="text-sm font-medium transition-all duration-200 group-hover:underline" style={{ color: '#9d6d47' }}>
                    Visit Website →
                  </span>
                </article>
              </a>
            </FadeIn>

            {/* Partner Card 4 */}
            <FadeIn delay={300} className="h-full">
              <a
                href="https://www.sesame.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <article
                  className="bg-white p-8 rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={cardBorder}
                >
                  <div className="h-16 flex items-center justify-center mb-6">
                    <img
                      src="/partners/sesame-logo.png"
                      alt="Sesame Bankhall Group"
                      className="max-h-12 w-auto transition-all duration-300 group-hover:scale-105 partner-logo"
                    />
                  </div>
                  <h3 className="text-emerald font-serif text-xl font-bold mb-3">Sesame Bankhall Group</h3>
                  <p className="text-base leading-relaxed mb-4 flex-grow" style={mutedDark}>
                    Collaborating on professional development initiatives, bringing our event methodology to advisors across the Sesame network.
                  </p>
                  <span className="text-sm font-medium transition-all duration-200 group-hover:underline" style={{ color: '#9d6d47' }}>
                    Visit Website →
                  </span>
                </article>
              </a>
            </FadeIn>

            {/* Partner Card 5 */}
            <FadeIn delay={400} className="h-full">
              <a
                href="https://www.quilter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <article
                  className="bg-white p-8 rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={cardBorder}
                >
                  <div className="h-16 flex items-center justify-center mb-6">
                    <img
                      src="/partners/quilter-logo.png"
                      alt="Quilter Financial Planning"
                      className="max-h-12 w-auto transition-all duration-300 group-hover:scale-105 partner-logo"
                    />
                  </div>
                  <h3 className="text-emerald font-serif text-xl font-bold mb-3">Quilter Financial Planning</h3>
                  <p className="text-base leading-relaxed mb-4 flex-grow" style={mutedDark}>
                    Supporting Quilter's advisor development program with specialized marketing education focused on high-net-worth client acquisition.
                  </p>
                  <span className="text-sm font-medium transition-all duration-200 group-hover:underline" style={{ color: '#9d6d47' }}>
                    Visit Website →
                  </span>
                </article>
              </a>
            </FadeIn>

            {/* Partner Card 6 - Become a Partner */}
            <FadeIn delay={500} className="h-full">
              <Link
                href="/contact"
                className="block h-full"
              >
                <div
                  className="bg-white p-8 rounded-2xl h-full flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={{ ...cardBorder, borderStyle: 'dashed' }}
                >
                  <div className="w-16 h-16 mb-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(196, 146, 106, 0.1)' }}>
                    <svg className="w-8 h-8" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-emerald font-serif text-xl font-bold mb-3 text-center">Become a Partner</h3>
                  <p className="text-base leading-relaxed mb-4 text-center" style={mutedDark}>
                    Interested in partnering with Better Wealth? We'd love to hear from you.
                  </p>
                  <span className="text-sm font-medium transition-all duration-200 group-hover:underline" style={{ color: '#9d6d47' }}>
                    Get In Touch →
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Partnership Process Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>Get Started</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald">
                Partnership Process
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0}>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl" style={{ backgroundColor: '#033A22' }}>
                  1
                </div>
                <h3 className="text-emerald font-serif text-lg font-bold mb-3">Initial Conversation</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  Email info@better-wealth.co.uk with details about your organization. We'll schedule a 30-minute call to discuss fit.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl" style={{ backgroundColor: '#033A22' }}>
                  2
                </div>
                <h3 className="text-emerald font-serif text-lg font-bold mb-3">Proposal Development</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  We'll create a tailored partnership proposal. Typically takes 5-7 days.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl" style={{ backgroundColor: '#033A22' }}>
                  3
                </div>
                <h3 className="text-emerald font-serif text-lg font-bold mb-3">Agreement & Launch</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  Formalize partnership and begin implementation. Most partnerships are live within 3-4 weeks.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(196, 146, 106, 0.12) 0%, transparent 55%)' }}></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 60%, rgba(196, 146, 106, 0.08) 0%, transparent 50%)' }}></div>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-white text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Explore a Partnership?
            </h2>
            <p className="max-w-xl mx-auto mb-8 leading-relaxed text-base" style={{ color: 'rgba(250,250,248,0.6)' }}>
              Let's have a conversation about how we can create value together. No obligation, just an honest discussion about fit.
            </p>
            <Link
              href="/contact"
              className="btn-copper inline-block px-8 py-3.5 text-white rounded-lg font-semibold text-sm shadow-lg"
            >
              Get In Touch
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
