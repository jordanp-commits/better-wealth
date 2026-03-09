'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { CookiePreferencesButton } from '@/components/CookieConsent'
import MobileNav from '@/components/MobileNav'
import WaitlistModal from '@/components/WaitlistModal'
import Footer from '@/components/Footer'

export default function CookiePolicyPage() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

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
                alt="Better Wealth"
                style={{ height: '160px', width: 'auto' }}
              />
            </div>
          </Link>

          <div className="absolute left-0 right-0 hidden lg:flex justify-center gap-8 pointer-events-none">
            <Link href="/workshops" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">Events</Link>
            <Link href="/about" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">About</Link>
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
            <MobileNav currentPage="cookie-policy" onBecomeMember={() => setIsWaitlistModalOpen(true)} />
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
      <section className="py-24 pt-32 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(196, 146, 106, 0.12) 0%, transparent 55%)' }}></div>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-white text-4xl md:text-5xl font-serif font-bold mb-4">
              Cookie Policy
            </h1>
            <p className="text-sm" style={{ color: '#B8D4C5' }}>
              Last updated: February 2026
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Content Section */}
      <section className="px-6" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="max-w-3xl mx-auto py-16">

          {/* Manage Preferences */}
          <FadeIn>
            <div className="mb-8 text-center">
              <p className="text-sm mb-4 text-[#033A22]/70">
                You can change your cookie preferences at any time.
              </p>
              <CookiePreferencesButton
                className="inline-block px-6 py-3 rounded-md text-white font-medium text-sm transition-all duration-200 bg-[#C4926A] hover:bg-[#B07D57]"
              />
            </div>
          </FadeIn>

          <div className="border-t border-[#C4926A]/20 my-8" />

          {/* What Are Cookies */}
          <FadeIn delay={50}>
            <section className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">What Are Cookies?</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <div className="space-y-4 text-sm leading-relaxed text-[#033A22]/70">
                <p>
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.
                </p>
                <p>
                  We use cookies and similar technologies on better-wealth.co.uk to improve your browsing experience, analyse how our website is used, and to help us deliver relevant marketing content.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* Essential Cookies */}
          <FadeIn delay={100}>
            <section className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">Essential Cookies</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-xs uppercase tracking-wider text-[#C4926A] mb-4">Always Active</p>
              <p className="text-sm leading-relaxed mb-6 text-[#033A22]/70">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies as the website cannot function without them.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#033A22]/10">
                      <th className="text-left py-3 pr-4 text-[#033A22] font-semibold">Cookie Name</th>
                      <th className="text-left py-3 pr-4 text-[#033A22] font-semibold">Purpose</th>
                      <th className="text-left py-3 text-[#033A22] font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#033A22]/70">
                    <tr className="border-b border-[#033A22]/5">
                      <td className="py-3 pr-4 font-mono text-xs">cookie-consent</td>
                      <td className="py-3 pr-4">Stores your cookie consent preferences</td>
                      <td className="py-3">1 year</td>
                    </tr>
                    <tr className="border-b border-[#033A22]/5">
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
            </section>
          </FadeIn>

          {/* Analytics Cookies */}
          <FadeIn delay={150}>
            <section className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">Analytics Cookies</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-xs uppercase tracking-wider text-[#C4926A] mb-4">Optional</p>
              <p className="text-sm leading-relaxed mb-6 text-[#033A22]/70">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and provide a better user experience.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#033A22]/10">
                      <th className="text-left py-3 pr-4 text-[#033A22] font-semibold">Cookie Name</th>
                      <th className="text-left py-3 pr-4 text-[#033A22] font-semibold">Provider</th>
                      <th className="text-left py-3 pr-4 text-[#033A22] font-semibold">Purpose</th>
                      <th className="text-left py-3 text-[#033A22] font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#033A22]/70">
                    <tr className="border-b border-[#033A22]/5">
                      <td className="py-3 pr-4 font-mono text-xs">_ga</td>
                      <td className="py-3 pr-4">Google Analytics</td>
                      <td className="py-3 pr-4">Distinguishes unique users</td>
                      <td className="py-3">2 years</td>
                    </tr>
                    <tr className="border-b border-[#033A22]/5">
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
            </section>
          </FadeIn>

          {/* Marketing Cookies */}
          <FadeIn delay={200}>
            <section className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">Marketing Cookies</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-xs uppercase tracking-wider text-[#C4926A] mb-4">Optional</p>
              <p className="text-sm leading-relaxed mb-6 text-[#033A22]/70">
                These cookies are used to track visitors across websites and display relevant advertisements. They help us measure the effectiveness of our advertising campaigns and show you content that is relevant to your interests.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#033A22]/10">
                      <th className="text-left py-3 pr-4 text-[#033A22] font-semibold">Cookie Name</th>
                      <th className="text-left py-3 pr-4 text-[#033A22] font-semibold">Provider</th>
                      <th className="text-left py-3 pr-4 text-[#033A22] font-semibold">Purpose</th>
                      <th className="text-left py-3 text-[#033A22] font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#033A22]/70">
                    <tr className="border-b border-[#033A22]/5">
                      <td className="py-3 pr-4 font-mono text-xs">_fbp</td>
                      <td className="py-3 pr-4">Meta (Facebook)</td>
                      <td className="py-3 pr-4">Tracks visits across websites for advertising</td>
                      <td className="py-3">3 months</td>
                    </tr>
                    <tr className="border-b border-[#033A22]/5">
                      <td className="py-3 pr-4 font-mono text-xs">_fbc</td>
                      <td className="py-3 pr-4">Meta (Facebook)</td>
                      <td className="py-3 pr-4">Stores click identifiers for ad attribution</td>
                      <td className="py-3">2 years</td>
                    </tr>
                    <tr className="border-b border-[#033A22]/5">
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
            </section>
          </FadeIn>

          {/* How to Control Cookies */}
          <FadeIn delay={250}>
            <section className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">How to Control Cookies</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <div className="space-y-4 text-sm leading-relaxed text-[#033A22]/70">
                <p>
                  <strong className="text-[#033A22] font-semibold">Through Our Website:</strong> You can manage your cookie preferences at any time using the "Cookie Preferences" button above or in the footer of any page on our website.
                </p>
                <p>
                  <strong className="text-[#033A22] font-semibold">Through Your Browser:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to block or delete cookies entirely. However, please note that blocking all cookies may affect the functionality of our website.
                </p>
                <p>Here are links to cookie management instructions for common browsers:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#C4926A] hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#C4926A] hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#C4926A] hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#C4926A] hover:underline">Microsoft Edge</a></li>
                </ul>
              </div>
            </section>
          </FadeIn>

          {/* Third Party Opt-Out */}
          <FadeIn delay={300}>
            <section className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">Third-Party Opt-Out</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed mb-4 text-[#033A22]/70">
                You can also opt out of third-party tracking directly with the following providers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-[#033A22]/70">
                <li>
                  <strong className="text-[#033A22] font-semibold">Google Analytics:</strong>{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#C4926A] hover:underline">
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
                <li>
                  <strong className="text-[#033A22] font-semibold">Meta (Facebook/Instagram):</strong>{' '}
                  <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="text-[#C4926A] hover:underline">
                    Facebook Ad Preferences
                  </a>
                </li>
                <li>
                  <strong className="text-[#033A22] font-semibold">LinkedIn:</strong>{' '}
                  <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" target="_blank" rel="noopener noreferrer" className="text-[#C4926A] hover:underline">
                    LinkedIn Marketing Opt-out
                  </a>
                </li>
              </ul>
            </section>
          </FadeIn>

          {/* Updates */}
          <FadeIn delay={350}>
            <section className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">Updates to This Policy</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed text-[#033A22]/70">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={400}>
            <section>
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">Questions?</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed mb-4 text-[#033A22]/70">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <p className="text-sm text-[#033A22]/70">
                <strong className="text-[#033A22] font-semibold">Email:</strong>{' '}
                <a href="mailto:privacy@better-wealth.co.uk" className="text-[#C4926A] hover:underline">
                  privacy@better-wealth.co.uk
                </a>
              </p>
              <p className="text-sm mt-4 text-[#033A22]/70">
                For more information about how we handle your personal data, please see our{' '}
                <Link href="/privacy" className="text-[#C4926A] hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </section>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </main>
  )
}
