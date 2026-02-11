import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import FadeIn from '@/components/FadeIn'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Better Wealth privacy policy. Learn how we collect, use, and protect your personal data in compliance with UK GDPR.',
  alternates: {
    canonical: 'https://better-wealth.co.uk/privacy',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Better Wealth',
    description: 'Better Wealth privacy policy. Learn how we collect, use, and protect your personal data.',
    url: 'https://better-wealth.co.uk/privacy',
  },
}

export default function PrivacyPolicyPage() {
  const labelColor = { color: '#9d6d47' }
  const mutedLight = { color: '#B8D4C5' }
  const mutedDark = { color: 'rgba(0,0,0,0.5)' }

  return (
    <main className="min-h-screen">
      <Navigation />

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
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#C4926A' }}>Legal</p>
            <h1 className="text-white text-4xl md:text-5xl font-serif font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm mb-2" style={mutedLight}>Last updated: 5th February 2026</p>
            <p className="text-base leading-relaxed max-w-2xl mx-auto mt-6" style={mutedLight}>
              Better Wealth is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-white rounded-2xl p-8 md:p-12" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>

              {/* Table of Contents */}
              <div className="mb-12 pb-8" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <h2 className="text-lg font-serif font-bold text-emerald mb-4">Contents</h2>
                <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <a href="#who-we-are" className="hover:underline" style={{ color: '#9d6d47' }}>1. Who We Are</a>
                  <a href="#information-we-collect" className="hover:underline" style={{ color: '#9d6d47' }}>2. Information We Collect</a>
                  <a href="#how-we-use" className="hover:underline" style={{ color: '#9d6d47' }}>3. How We Use Your Information</a>
                  <a href="#third-party" className="hover:underline" style={{ color: '#9d6d47' }}>4. Third-Party Services</a>
                  <a href="#data-retention" className="hover:underline" style={{ color: '#9d6d47' }}>5. Data Retention</a>
                  <a href="#your-rights" className="hover:underline" style={{ color: '#9d6d47' }}>6. Your Rights Under UK GDPR</a>
                  <a href="#cookies" className="hover:underline" style={{ color: '#9d6d47' }}>7. Cookies</a>
                  <a href="#security" className="hover:underline" style={{ color: '#9d6d47' }}>8. Security</a>
                  <a href="#international" className="hover:underline" style={{ color: '#9d6d47' }}>9. International Transfers</a>
                  <a href="#children" className="hover:underline" style={{ color: '#9d6d47' }}>10. Children's Privacy</a>
                  <a href="#marketing" className="hover:underline" style={{ color: '#9d6d47' }}>11. Marketing Communications</a>
                  <a href="#changes" className="hover:underline" style={{ color: '#9d6d47' }}>12. Changes to This Policy</a>
                  <a href="#contact" className="hover:underline" style={{ color: '#9d6d47' }}>13. Contact Us</a>
                </nav>
              </div>

              {/* Section 1 */}
              <section id="who-we-are" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">1. Who We Are</h2>
                <div className="space-y-3 text-base leading-relaxed" style={mutedDark}>
                  <p><strong>Business name:</strong> Better Wealth</p>
                  <p><strong>Legal entity:</strong> Rhiannon Adams and Jordan Price Trading As Better Wealth</p>
                  <p><strong>Contact:</strong> <a href="mailto:info@better-wealth.co.uk" className="underline" style={{ color: '#9d6d47' }}>info@better-wealth.co.uk</a></p>
                  <p><strong>Address:</strong> Available upon request</p>
                  <p className="mt-4">We are the data controller for personal data processed through our website and services.</p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="information-we-collect" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">2. Information We Collect</h2>

                <h3 className="text-lg font-serif font-bold text-emerald mb-3 mt-6">Personal information you provide:</h3>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4" style={mutedDark}>
                  <li><strong>Workshop bookings:</strong> name, email, phone number, company name</li>
                  <li><strong>Contact forms:</strong> name, email, phone number, company name, message content</li>
                  <li><strong>Payment information:</strong> processed by Stripe (we do not store card details)</li>
                  <li><strong>Email subscriptions:</strong> email address, name, communication preferences</li>
                </ul>

                <h3 className="text-lg font-serif font-bold text-emerald mb-3 mt-6">Information collected automatically:</h3>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4" style={mutedDark}>
                  <li>Website usage data via Google Analytics (IP addresses, pages viewed, device information)</li>
                  <li>Cookies and similar technologies (see our Cookie Policy)</li>
                  <li>Marketing pixels (Meta, LinkedIn) for advertising purposes</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="how-we-use" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">3. How We Use Your Information</h2>

                <p className="text-base leading-relaxed mb-4" style={mutedDark}>We use your personal data to:</p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-6" style={mutedDark}>
                  <li>Process workshop bookings and payments</li>
                  <li>Respond to enquiries and provide customer support</li>
                  <li>Send booking confirmations and important updates</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Analyse website usage and marketing effectiveness</li>
                </ul>

                <h3 className="text-lg font-serif font-bold text-emerald mb-3">Legal basis for processing (GDPR Article 6):</h3>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4" style={mutedDark}>
                  <li><strong>Contract performance:</strong> Processing bookings and delivering services</li>
                  <li><strong>Consent:</strong> Marketing emails, cookies, and analytics</li>
                  <li><strong>Legitimate interests:</strong> Improving services, website analytics</li>
                  <li><strong>Legal obligations:</strong> Financial record-keeping requirements</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="third-party" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">4. Third-Party Services</h2>
                <p className="text-base leading-relaxed mb-4" style={mutedDark}>We share data with the following trusted service providers:</p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4" style={mutedDark}>
                  <li><strong>Stripe:</strong> Payment processing (PCI-DSS compliant)</li>
                  <li><strong>Supabase:</strong> Database hosting (EU/UK servers)</li>
                  <li><strong>Resend:</strong> Email delivery service</li>
                  <li><strong>Mailchimp:</strong> Email marketing (with consent)</li>
                  <li><strong>Google Analytics:</strong> Website analytics</li>
                  <li><strong>SEMRush:</strong> SEO and marketing analysis</li>
                  <li><strong>Meta (Facebook/Instagram):</strong> Advertising and analytics</li>
                  <li><strong>LinkedIn:</strong> Advertising and analytics</li>
                </ul>
                <p className="text-base leading-relaxed mt-4" style={mutedDark}>
                  All third-party processors are GDPR-compliant and have appropriate data processing agreements in place.
                </p>
              </section>

              {/* Section 5 */}
              <section id="data-retention" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">5. Data Retention</h2>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4" style={mutedDark}>
                  <li><strong>Financial records (bookings, payments):</strong> 7 years (HMRC requirement)</li>
                  <li><strong>Contact form enquiries:</strong> 2 years from last contact</li>
                  <li><strong>Marketing subscribers:</strong> Until you unsubscribe or we cease trading</li>
                  <li><strong>Website analytics:</strong> 26 months</li>
                  <li><strong>Cookie data:</strong> As specified in our Cookie Policy</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="your-rights" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">6. Your Rights Under UK GDPR</h2>
                <p className="text-base leading-relaxed mb-4" style={mutedDark}>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4" style={mutedDark}>
                  <li><strong>Access</strong> your personal data (Subject Access Request)</li>
                  <li><strong>Rectify</strong> inaccurate data</li>
                  <li><strong>Erase</strong> your data ('right to be forgotten')</li>
                  <li><strong>Restrict or object</strong> to processing</li>
                  <li><strong>Data portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Withdraw consent</strong> for marketing at any time</li>
                  <li><strong>Lodge a complaint</strong> with the ICO (Information Commissioner's Office)</li>
                </ul>
                <p className="text-base leading-relaxed mt-4" style={mutedDark}>
                  To exercise these rights, email: <a href="mailto:info@better-wealth.co.uk" className="underline" style={{ color: '#9d6d47' }}>info@better-wealth.co.uk</a>
                </p>
              </section>

              {/* Section 7 */}
              <section id="cookies" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">7. Cookies</h2>
                <p className="text-base leading-relaxed mb-4" style={mutedDark}>We use cookies for:</p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4" style={mutedDark}>
                  <li><strong>Essential functionality:</strong> Required for bookings and site operation</li>
                  <li><strong>Analytics:</strong> Google Analytics (with consent)</li>
                  <li><strong>Marketing:</strong> Meta Pixel, LinkedIn Pixel (with consent)</li>
                </ul>
                <p className="text-base leading-relaxed mt-4" style={mutedDark}>
                  For detailed information about the cookies we use and how to manage your preferences, please see our <Link href="/cookie-policy" className="underline" style={{ color: '#9d6d47' }}>Cookie Policy</Link>. You can change your cookie preferences at any time via our cookie banner or on the Cookie Policy page.
                </p>
              </section>

              {/* Section 8 */}
              <section id="security" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">8. Security</h2>
                <p className="text-base leading-relaxed mb-4" style={mutedDark}>
                  We implement appropriate technical and organisational measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4" style={mutedDark}>
                  <li>Encrypted connections (SSL/TLS)</li>
                  <li>Secure database storage</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security reviews</li>
                  <li>Third-party security certifications (Stripe PCI-DSS, etc.)</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="international" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">9. International Transfers</h2>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  Your data is primarily stored within the UK/EU. Where we use third-party services with international operations (e.g., Stripe, Google), appropriate safeguards are in place including Standard Contractual Clauses and adequacy decisions.
                </p>
              </section>

              {/* Section 10 */}
              <section id="children" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">10. Children's Privacy</h2>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  Our services are not directed at children under 18. We do not knowingly collect personal data from children.
                </p>
              </section>

              {/* Section 11 */}
              <section id="marketing" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">11. Marketing Communications</h2>
                <p className="text-base leading-relaxed mb-4" style={mutedDark}>
                  We will only send marketing emails with your explicit consent. You can unsubscribe at any time via:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4" style={mutedDark}>
                  <li>Unsubscribe link in every email</li>
                  <li>Emailing <a href="mailto:info@better-wealth.co.uk" className="underline" style={{ color: '#9d6d47' }}>info@better-wealth.co.uk</a></li>
                  <li>Updating your preferences</li>
                </ul>
              </section>

              {/* Section 12 */}
              <section id="changes" className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">12. Changes to This Policy</h2>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  We may update this policy periodically. Changes will be posted on this page with an updated 'Last revised' date. Significant changes will be communicated via email to existing customers.
                </p>
              </section>

              {/* Section 13 */}
              <section id="contact">
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">13. Contact Us</h2>
                <p className="text-base leading-relaxed mb-4" style={mutedDark}>
                  For privacy questions or to exercise your rights:
                </p>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  <strong>Email:</strong> <a href="mailto:info@better-wealth.co.uk" className="underline" style={{ color: '#9d6d47' }}>info@better-wealth.co.uk</a>
                </p>
                <p className="text-base leading-relaxed mt-4" style={mutedDark}>
                  We will respond to all requests within 30 days.
                </p>
              </section>

            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
