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
      <section className="py-24 pt-32 px-6 relative overflow-hidden" style={{ backgroundColor: '#033A22' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-white text-4xl md:text-5xl font-serif font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm" style={{ color: '#B8D4C5' }}>Last updated: 5th February 2026</p>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto mt-6" style={{ color: '#B8D4C5' }}>
              Better Wealth is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Main Content */}
      <section className="px-6" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="max-w-3xl mx-auto py-16">
          <FadeIn>

            {/* Table of Contents */}
            <div className="mb-8">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mb-4">Contents</h2>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <a href="#who-we-are" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">1. Who We Are</a>
                <a href="#information-we-collect" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">2. Information We Collect</a>
                <a href="#how-we-use" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">3. How We Use Your Information</a>
                <a href="#third-party" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">4. Third-Party Services</a>
                <a href="#data-retention" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">5. Data Retention</a>
                <a href="#your-rights" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">6. Your Rights Under UK GDPR</a>
                <a href="#cookies" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">7. Cookies</a>
                <a href="#security" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">8. Security</a>
                <a href="#international" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">9. International Transfers</a>
                <a href="#children" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">10. Children's Privacy</a>
                <a href="#marketing" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">11. Marketing Communications</a>
                <a href="#changes" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">12. Changes to This Policy</a>
                <a href="#contact" className="text-[#C4926A] text-sm hover:text-[#B07D57] hover:underline transition-colors">13. Contact Us</a>
              </nav>
            </div>

            <div className="border-t border-[#C4926A]/20 my-8" />

            {/* Section 1 */}
            <section id="who-we-are" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">1. Who We Are</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <div className="space-y-3 text-sm leading-relaxed text-[#033A22]/70">
                <p><strong className="text-[#033A22] font-semibold">Business name:</strong> Better Wealth</p>
                <p><strong className="text-[#033A22] font-semibold">Legal entity:</strong> Rhiannon Adams and Jordan Price Trading As Better Wealth</p>
                <p><strong className="text-[#033A22] font-semibold">Contact:</strong> <a href="mailto:info@better-wealth.co.uk" className="text-[#C4926A] hover:underline">info@better-wealth.co.uk</a></p>
                <p><strong className="text-[#033A22] font-semibold">Address:</strong> Available upon request</p>
                <p className="mt-4">We are the data controller for personal data processed through our website and services.</p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="information-we-collect" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">2. Information We Collect</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />

              <h3 className="text-base font-serif font-bold text-[#033A22] mb-3 mt-6">Personal information you provide:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 text-[#033A22]/70">
                <li><strong className="text-[#033A22] font-semibold">Event bookings:</strong> name, email, phone number, company name</li>
                <li><strong className="text-[#033A22] font-semibold">Contact forms:</strong> name, email, phone number, company name, message content</li>
                <li><strong className="text-[#033A22] font-semibold">Payment information:</strong> processed by Stripe (we do not store card details)</li>
                <li><strong className="text-[#033A22] font-semibold">Email subscriptions:</strong> email address, name, communication preferences</li>
              </ul>

              <h3 className="text-base font-serif font-bold text-[#033A22] mb-3 mt-6">Information collected automatically:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 text-[#033A22]/70">
                <li>Website usage data via Google Analytics (IP addresses, pages viewed, device information)</li>
                <li>Cookies and similar technologies (see our Cookie Policy)</li>
                <li>Marketing pixels (Meta, LinkedIn) for advertising purposes</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="how-we-use" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">3. How We Use Your Information</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />

              <p className="text-sm leading-relaxed mb-4 text-[#033A22]/70">We use your personal data to:</p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 mb-6 text-[#033A22]/70">
                <li>Process event bookings and payments</li>
                <li>Respond to enquiries and provide customer support</li>
                <li>Send booking confirmations and important updates</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Analyse website usage and marketing effectiveness</li>
              </ul>

              <h3 className="text-base font-serif font-bold text-[#033A22] mb-3">Legal basis for processing (GDPR Article 6):</h3>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 text-[#033A22]/70">
                <li><strong className="text-[#033A22] font-semibold">Contract performance:</strong> Processing bookings and delivering services</li>
                <li><strong className="text-[#033A22] font-semibold">Consent:</strong> Marketing emails, cookies, and analytics</li>
                <li><strong className="text-[#033A22] font-semibold">Legitimate interests:</strong> Improving services, website analytics</li>
                <li><strong className="text-[#033A22] font-semibold">Legal obligations:</strong> Financial record-keeping requirements</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="third-party" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">4. Third-Party Services</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed mb-4 text-[#033A22]/70">We share data with the following trusted service providers:</p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 text-[#033A22]/70">
                <li><strong className="text-[#033A22] font-semibold">Stripe:</strong> Payment processing (PCI-DSS compliant)</li>
                <li><strong className="text-[#033A22] font-semibold">Supabase:</strong> Database hosting (EU/UK servers)</li>
                <li><strong className="text-[#033A22] font-semibold">Resend:</strong> Email delivery service</li>
                <li><strong className="text-[#033A22] font-semibold">Mailchimp:</strong> Email marketing (with consent)</li>
                <li><strong className="text-[#033A22] font-semibold">Google Analytics:</strong> Website analytics</li>
                <li><strong className="text-[#033A22] font-semibold">SEMRush:</strong> SEO and marketing analysis</li>
                <li><strong className="text-[#033A22] font-semibold">Meta (Facebook/Instagram):</strong> Advertising and analytics</li>
                <li><strong className="text-[#033A22] font-semibold">LinkedIn:</strong> Advertising and analytics</li>
              </ul>
              <p className="text-sm leading-relaxed mt-4 text-[#033A22]/70">
                All third-party processors are GDPR-compliant and have appropriate data processing agreements in place.
              </p>
            </section>

            {/* Section 5 */}
            <section id="data-retention" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">5. Data Retention</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 text-[#033A22]/70">
                <li><strong className="text-[#033A22] font-semibold">Financial records (bookings, payments):</strong> 7 years (HMRC requirement)</li>
                <li><strong className="text-[#033A22] font-semibold">Contact form enquiries:</strong> 2 years from last contact</li>
                <li><strong className="text-[#033A22] font-semibold">Marketing subscribers:</strong> Until you unsubscribe or we cease trading</li>
                <li><strong className="text-[#033A22] font-semibold">Website analytics:</strong> 26 months</li>
                <li><strong className="text-[#033A22] font-semibold">Cookie data:</strong> As specified in our Cookie Policy</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="your-rights" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">6. Your Rights Under UK GDPR</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed mb-4 text-[#033A22]/70">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 text-[#033A22]/70">
                <li><strong className="text-[#033A22] font-semibold">Access</strong> your personal data (Subject Access Request)</li>
                <li><strong className="text-[#033A22] font-semibold">Rectify</strong> inaccurate data</li>
                <li><strong className="text-[#033A22] font-semibold">Erase</strong> your data ('right to be forgotten')</li>
                <li><strong className="text-[#033A22] font-semibold">Restrict or object</strong> to processing</li>
                <li><strong className="text-[#033A22] font-semibold">Data portability:</strong> Receive your data in a portable format</li>
                <li><strong className="text-[#033A22] font-semibold">Withdraw consent</strong> for marketing at any time</li>
                <li><strong className="text-[#033A22] font-semibold">Lodge a complaint</strong> with the ICO (Information Commissioner's Office)</li>
              </ul>
              <p className="text-sm leading-relaxed mt-4 text-[#033A22]/70">
                To exercise these rights, email: <a href="mailto:info@better-wealth.co.uk" className="text-[#C4926A] hover:underline">info@better-wealth.co.uk</a>
              </p>
            </section>

            {/* Section 7 */}
            <section id="cookies" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">7. Cookies</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed mb-4 text-[#033A22]/70">We use cookies for:</p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 text-[#033A22]/70">
                <li><strong className="text-[#033A22] font-semibold">Essential functionality:</strong> Required for bookings and site operation</li>
                <li><strong className="text-[#033A22] font-semibold">Analytics:</strong> Google Analytics (with consent)</li>
                <li><strong className="text-[#033A22] font-semibold">Marketing:</strong> Meta Pixel, LinkedIn Pixel (with consent)</li>
              </ul>
              <p className="text-sm leading-relaxed mt-4 text-[#033A22]/70">
                For detailed information about the cookies we use and how to manage your preferences, please see our <Link href="/cookie-policy" className="text-[#C4926A] hover:underline">Cookie Policy</Link>. You can change your cookie preferences at any time via our cookie banner or on the Cookie Policy page.
              </p>
            </section>

            {/* Section 8 */}
            <section id="security" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">8. Security</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed mb-4 text-[#033A22]/70">
                We implement appropriate technical and organisational measures to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 text-[#033A22]/70">
                <li>Encrypted connections (SSL/TLS)</li>
                <li>Secure database storage</li>
                <li>Access controls and authentication</li>
                <li>Regular security reviews</li>
                <li>Third-party security certifications (Stripe PCI-DSS, etc.)</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="international" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">9. International Transfers</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed text-[#033A22]/70">
                Your data is primarily stored within the UK/EU. Where we use third-party services with international operations (e.g., Stripe, Google), appropriate safeguards are in place including Standard Contractual Clauses and adequacy decisions.
              </p>
            </section>

            {/* Section 10 */}
            <section id="children" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">10. Children's Privacy</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed text-[#033A22]/70">
                Our services are not directed at children under 18. We do not knowingly collect personal data from children.
              </p>
            </section>

            {/* Section 11 */}
            <section id="marketing" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">11. Marketing Communications</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed mb-4 text-[#033A22]/70">
                We will only send marketing emails with your explicit consent. You can unsubscribe at any time via:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed ml-4 text-[#033A22]/70">
                <li>Unsubscribe link in every email</li>
                <li>Emailing <a href="mailto:info@better-wealth.co.uk" className="text-[#C4926A] hover:underline">info@better-wealth.co.uk</a></li>
                <li>Updating your preferences</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section id="changes" className="mb-10">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">12. Changes to This Policy</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed text-[#033A22]/70">
                We may update this policy periodically. Changes will be posted on this page with an updated 'Last revised' date. Significant changes will be communicated via email to existing customers.
              </p>
            </section>

            {/* Section 13 */}
            <section id="contact">
              <h2 className="font-serif text-[#033A22] text-xl font-bold mt-12 mb-4">13. Contact Us</h2>
              <div className="w-8 border-t-2 border-[#C4926A]/40 mt-2 mb-5" />
              <p className="text-sm leading-relaxed mb-4 text-[#033A22]/70">
                For privacy questions or to exercise your rights:
              </p>
              <p className="text-sm leading-relaxed text-[#033A22]/70">
                <strong className="text-[#033A22] font-semibold">Email:</strong> <a href="mailto:info@better-wealth.co.uk" className="text-[#C4926A] hover:underline">info@better-wealth.co.uk</a>
              </p>
              <p className="text-sm leading-relaxed mt-4 text-[#033A22]/70">
                We will respond to all requests within 30 days.
              </p>
            </section>

          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
