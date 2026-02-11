import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Better Wealth\'s mission to provide practical marketing education for mortgage brokers and financial professionals. Built by brokers, for brokers.',
  keywords: ['about Better Wealth', 'mortgage broker training', 'financial advisor education', 'Jordan Price', 'broker marketing'],
  alternates: {
    canonical: 'https://better-wealth.co.uk/about',
  },
  openGraph: {
    title: 'About Us | Better Wealth',
    description: 'Learn about Better Wealth\'s mission to provide practical marketing education for mortgage brokers and financial professionals.',
    url: 'https://better-wealth.co.uk/about',
  },
}

export default function AboutPage() {
  const labelColor = { color: '#9d6d47' }
  const mutedLight = { color: '#B8D4C5' }
  const mutedDark = { color: 'rgba(0,0,0,0.35)' }

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
            <Link href="/workshops" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Workshops</Link>
            <Link href="/about" className="pointer-events-auto text-sm font-medium transition-colors duration-200" style={{ color: '#C4926A' }}>About</Link>
            <Link href="/partnerships" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Partnerships</Link>
            <Link href="/contact" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/workshops"
              className="hidden lg:block btn-outline-copper text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200"
            >
              Explore Workshops
            </Link>
            <MobileNav currentPage="about" />
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 60%, rgba(196, 146, 106, 0.08) 0%, transparent 50%)' }}></div>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="w-12 mx-auto mb-6" style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}></div>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#C4926A' }}>About Better Wealth</p>
            <h1 className="text-white text-4xl md:text-5xl font-serif font-bold mb-6">
              Built by Brokers, For Brokers
            </h1>
            <p className="text-base leading-relaxed max-w-2xl mx-auto" style={mutedLight}>
              Better Wealth exists because we got tired of attending marketing courses that promised the world and delivered nothing but theory. We built the education we wish we'd had.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* The Problem Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="w-8 h-0.5 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}></div>
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>The Problem</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald">
                Most Marketing Training Is Broken
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="space-y-6 text-base leading-relaxed" style={mutedDark}>
              <p className="max-w-3xl mx-auto">
                We've all been there. You sign up for a marketing course, pay good money, and spend a day listening to someone talk about "building your brand" and "finding your voice." You leave with a notebook full of vague ideas and zero clarity on what to actually do Monday morning.
              </p>
              <p className="max-w-3xl mx-auto">
                The problem is simple: most marketing education is built for generic businesses, not regulated industries. The people teaching it have never had to navigate FCA compliance, never had to build trust in a sector where clients are inherently skeptical, and never had to generate leads without the luxury of aggressive sales tactics.
              </p>
              <p className="max-w-3xl mx-auto">
                Financial services and real estate professionals need strategies that work within the rules. Strategies that acknowledge the unique challenges of building a client pipeline when you can't make wild promises. That's where we come in.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="w-8 h-0.5 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}></div>
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>Our Approach</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald">
                Execution Over Inspiration
              </h2>
            </div>
          </FadeIn>
          <div className="space-y-8 mt-12">
            <FadeIn delay={0}>
              <div className="pl-6" style={{ borderLeft: '2px solid #C4926A' }}>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3">We Build, Not Brainstorm</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  Every workshop ends with a tangible deliverable. Not a list of ideas to think about later, but something you've actually built during the session. A campaign ready to launch. A system ready to implement. Real output, not just inspiration.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="pl-6" style={{ borderLeft: '2px solid #C4926A' }}>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3">We Focus on What Works in Regulated Industries</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  Generic marketing advice doesn't cut it when you're FCA regulated. Our strategies are designed specifically for financial services and real estate professionals who need to generate leads while staying compliant. We know the rules because we've operated within them.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="pl-6" style={{ borderLeft: '2px solid #C4926A' }}>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3">We Keep Groups Small</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  This isn't a conference with 500 people. Our workshops are capped at 20 participants. Small enough that you get personal attention. Small enough that you can ask questions. Small enough that real relationships form. Quality over quantity, always.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="w-8 h-0.5 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}></div>
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#C4926A' }}>Our Story</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                Started in a Spare Room, Scaled to Seven Figures
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="space-y-6 text-base leading-relaxed text-center" style={mutedLight}>
              <p>
                Better Wealth was founded by Jordan Price, a mortgage broker who built his practice from zero to seven figures using the exact strategies now taught in our workshops. No family connections. No existing book of business. Just a systematic approach to marketing and lead generation.
              </p>
              <p>
                After years of other brokers asking how he'd done it, Jordan realised the same question kept coming up: "Where do I actually learn this stuff?" The answer was nowhere. So he built it.
              </p>
              <p>
                The first workshop was held in Manchester with eight brokers around a table. No fancy venue. No polished slides. Just practical, actionable strategies that had actually worked in the real world. The feedback was immediate: "This is what we've been looking for."
              </p>
              <p>
                Today, Better Wealth has trained over 250 professionals, but the philosophy hasn't changed. Small groups. Real strategies. Tangible output. Everything else is just noise.
              </p>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={200}>
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-12 px-2" style={{ borderTop: '1px solid rgba(196, 146, 106, 0.2)' }}>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold" style={{ color: '#C4926A' }}>250+</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-2" style={mutedLight}>Brokers Trained</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold" style={{ color: '#C4926A' }}>12+</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-2" style={mutedLight}>Workshops Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold whitespace-nowrap" style={{ color: '#C4926A' }}>£95k+</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider mt-2" style={mutedLight}>Avg Revenue Increase</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="w-8 h-0.5 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}></div>
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>Our Values</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald">
                What We Stand For
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0} className="h-full">
              <div className="bg-white p-8 rounded-2xl text-center h-full flex flex-col" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#033A22' }}>
                  <span className="text-2xl" style={{ color: '#C4926A' }}>✓</span>
                </div>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3">Honest Marketing</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  We don't believe in hype or false promises. Our approach is grounded in what actually works, backed by real results from real professionals.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100} className="h-full">
              <div className="bg-white p-8 rounded-2xl text-center h-full flex flex-col" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#033A22' }}>
                  <span className="text-2xl" style={{ color: '#C4926A' }}>✓</span>
                </div>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3">Industry Expertise</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  We've worked in regulated industries. We understand the constraints, the compliance requirements, and the unique challenges of building trust with clients.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <div className="bg-white p-8 rounded-2xl text-center h-full flex flex-col" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#033A22' }}>
                  <span className="text-2xl" style={{ color: '#C4926A' }}>✓</span>
                </div>
                <h3 className="text-emerald font-serif text-xl font-bold mb-3">Community Over Competition</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  We believe rising tides lift all boats. Our community shares openly, supports generously, and operates with a mindset of abundance.
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
              Ready to See What We're About?
            </h2>
            <p className="max-w-xl mx-auto mb-8 leading-relaxed text-base" style={{ color: 'rgba(250,250,248,0.6)' }}>
              Join a workshop and experience the difference. No fluff. No theory. Just practical strategies you can implement immediately.
            </p>
            <Link
              href="/workshops"
              className="btn-copper inline-block px-8 py-3.5 text-white rounded-lg font-semibold text-sm shadow-lg"
            >
              Explore Workshops
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
