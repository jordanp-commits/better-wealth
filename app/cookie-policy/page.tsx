'use client'

import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { CookiePreferencesButton } from '@/components/CookieConsent'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'

export default function CookiePolicyPage() {
  const labelColor = { color: '#C4926A' }
  const mutedLight = { color: 'rgba(250,250,248,0.45)' }
  const mutedDark = { color: 'rgba(0,0,0,0.5)' }
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
                src="/logo-single-line.png"
                alt="Better Wealth"
                style={{ height: '160px', width: 'auto' }}
              />
            </div>
          </Link>

          <div className="absolute left-0 right-0 hidden md:flex justify-center gap-8 pointer-events-none">
            <Link href="/workshops" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Workshops</Link>
            <Link href="/about" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">About</Link>
            <Link href="/partnerships" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Partnerships</Link>
            <Link href="/contact" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/workshops"
              className="hidden md:block btn-outline-copper text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200"
            >
              Explore Workshops
            </Link>
            <MobileNav currentPage="cookie-policy" />
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
      <section className="pt-32 pb-16 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(196, 146, 106, 0.12) 0%, transparent 55%)' }}></div>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="w-12 mx-auto mb-6" style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}></div>
            <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>Legal</p>
            <h1 className="text-white text-4xl md:text-5xl font-serif font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={mutedLight}>
              Last updated: February 2026
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-3xl mx-auto">
          {/* Manage Preferences Button */}
          <FadeIn>
            <div className="bg-white p-6 rounded-2xl mb-12 text-center" style={cardBorder}>
              <p className="text-sm mb-4" style={mutedDark}>
                You can change your cookie preferences at any time.
              </p>
              <CookiePreferencesButton
                className="inline-block px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#C4926A' } as React.CSSProperties}
              />
            </div>
          </FadeIn>

          {/* Introduction */}
          <FadeIn delay={50}>
            <div className="prose prose-emerald max-w-none mb-12">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#033A22' }}>
                What Are Cookies?
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={mutedDark}>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.
              </p>
              <p className="text-sm leading-relaxed" style={mutedDark}>
                We use cookies and similar technologies on better-wealth.co.uk to improve your browsing experience, analyse how our website is used, and to help us deliver relevant marketing content.
              </p>
            </div>
          </FadeIn>

          {/* Essential Cookies */}
          <FadeIn delay={100}>
            <div className="bg-white p-8 rounded-2xl mb-8" style={cardBorder}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#033A22' }}>
                  <svg className="w-5 h-5" fill="none" stroke="#C4926A" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-1" style={{ color: '#033A22' }}>
                    Essential Cookies
                  </h3>
                  <p className="text-xs uppercase tracking-wider" style={labelColor}>Always Active</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={mutedDark}>
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies as the website cannot function without them.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: '#033A22' }}>Cookie Name</th>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: '#033A22' }}>Purpose</th>
                      <th className="text-left py-3 font-semibold" style={{ color: '#033A22' }}>Duration</th>
                    </tr>
                  </thead>
                  <tbody style={mutedDark}>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                      <td className="py-3 pr-4 font-mono text-xs">cookie-consent</td>
                      <td className="py-3 pr-4">Stores your cookie consent preferences</td>
                      <td className="py-3">1 year</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                      <td className="py-3 pr-4 font-mono text-xs">sb-*</td>
                      <td className="py-3 pr-4">Supabase session management for booking system</td>
                      <td className="py-3">Session</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-mono text-xs">__stripe_*</td>
                      <td className="py-3 pr-4">Stripe payment processing and fraud prevention</td>
                      <td className="py-3">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Analytics Cookies */}
          <FadeIn delay={150}>
            <div className="bg-white p-8 rounded-2xl mb-8" style={cardBorder}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#033A22' }}>
                  <svg className="w-5 h-5" fill="none" stroke="#C4926A" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-1" style={{ color: '#033A22' }}>
                    Analytics Cookies
                  </h3>
                  <p className="text-xs uppercase tracking-wider" style={labelColor}>Optional</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={mutedDark}>
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and provide a better user experience.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: '#033A22' }}>Cookie Name</th>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: '#033A22' }}>Provider</th>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: '#033A22' }}>Purpose</th>
                      <th className="text-left py-3 font-semibold" style={{ color: '#033A22' }}>Duration</th>
                    </tr>
                  </thead>
                  <tbody style={mutedDark}>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                      <td className="py-3 pr-4 font-mono text-xs">_ga</td>
                      <td className="py-3 pr-4">Google Analytics</td>
                      <td className="py-3 pr-4">Distinguishes unique users</td>
                      <td className="py-3">2 years</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                      <td className="py-3 pr-4 font-mono text-xs">_ga_*</td>
                      <td className="py-3 pr-4">Google Analytics</td>
                      <td className="py-3 pr-4">Maintains session state</td>
                      <td className="py-3">2 years</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-mono text-xs">_gid</td>
                      <td className="py-3 pr-4">Google Analytics</td>
                      <td className="py-3 pr-4">Distinguishes users</td>
                      <td className="py-3">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Marketing Cookies */}
          <FadeIn delay={200}>
            <div className="bg-white p-8 rounded-2xl mb-12" style={cardBorder}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#033A22' }}>
                  <svg className="w-5 h-5" fill="none" stroke="#C4926A" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-1" style={{ color: '#033A22' }}>
                    Marketing Cookies
                  </h3>
                  <p className="text-xs uppercase tracking-wider" style={labelColor}>Optional</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={mutedDark}>
                These cookies are used to track visitors across websites and display relevant advertisements. They help us measure the effectiveness of our advertising campaigns and show you content that is relevant to your interests.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: '#033A22' }}>Cookie Name</th>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: '#033A22' }}>Provider</th>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: '#033A22' }}>Purpose</th>
                      <th className="text-left py-3 font-semibold" style={{ color: '#033A22' }}>Duration</th>
                    </tr>
                  </thead>
                  <tbody style={mutedDark}>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                      <td className="py-3 pr-4 font-mono text-xs">_fbp</td>
                      <td className="py-3 pr-4">Meta (Facebook)</td>
                      <td className="py-3 pr-4">Tracks visits across websites for advertising</td>
                      <td className="py-3">3 months</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                      <td className="py-3 pr-4 font-mono text-xs">_fbc</td>
                      <td className="py-3 pr-4">Meta (Facebook)</td>
                      <td className="py-3 pr-4">Stores click identifiers for ad attribution</td>
                      <td className="py-3">2 years</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                      <td className="py-3 pr-4 font-mono text-xs">li_sugr</td>
                      <td className="py-3 pr-4">LinkedIn</td>
                      <td className="py-3 pr-4">Probabilistic identifier for advertising</td>
                      <td className="py-3">3 months</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-mono text-xs">bcookie</td>
                      <td className="py-3 pr-4">LinkedIn</td>
                      <td className="py-3 pr-4">Browser identifier for advertising</td>
                      <td className="py-3">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* How to Control Cookies */}
          <FadeIn delay={250}>
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#033A22' }}>
                How to Control Cookies
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={mutedDark}>
                <p>
                  <strong style={{ color: '#033A22' }}>Through Our Website:</strong> You can manage your cookie preferences at any time using the "Cookie Preferences" button above or in the footer of any page on our website.
                </p>
                <p>
                  <strong style={{ color: '#033A22' }}>Through Your Browser:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to block or delete cookies entirely. However, please note that blocking all cookies may affect the functionality of our website.
                </p>
                <p>Here are links to cookie management instructions for common browsers:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: '#C4926A' }}>Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: '#C4926A' }}>Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: '#C4926A' }}>Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: '#C4926A' }}>Microsoft Edge</a></li>
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Third Party Links */}
          <FadeIn delay={300}>
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#033A22' }}>
                Third-Party Opt-Out
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={mutedDark}>
                You can also opt out of third-party tracking directly with the following providers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm" style={mutedDark}>
                <li>
                  <strong style={{ color: '#033A22' }}>Google Analytics:</strong>{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: '#C4926A' }}>
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
                <li>
                  <strong style={{ color: '#033A22' }}>Meta (Facebook/Instagram):</strong>{' '}
                  <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: '#C4926A' }}>
                    Facebook Ad Preferences
                  </a>
                </li>
                <li>
                  <strong style={{ color: '#033A22' }}>LinkedIn:</strong>{' '}
                  <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: '#C4926A' }}>
                    LinkedIn Marketing Opt-out
                  </a>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Updates */}
          <FadeIn delay={350}>
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#033A22' }}>
                Updates to This Policy
              </h2>
              <p className="text-sm leading-relaxed" style={mutedDark}>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={400}>
            <div className="bg-white p-8 rounded-2xl" style={cardBorder}>
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#033A22' }}>
                Questions?
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={mutedDark}>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <p className="text-sm" style={mutedDark}>
                <strong style={{ color: '#033A22' }}>Email:</strong>{' '}
                <a href="mailto:privacy@better-wealth.co.uk" className="underline hover:no-underline" style={{ color: '#C4926A' }}>
                  privacy@better-wealth.co.uk
                </a>
              </p>
              <p className="text-sm mt-4" style={mutedDark}>
                For more information about how we handle your personal data, please see our{' '}
                <Link href="/privacy" className="underline hover:no-underline" style={{ color: '#C4926A' }}>
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
