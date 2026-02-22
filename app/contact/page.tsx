'use client'

import { useState } from 'react'
import Link from 'next/link'
// TODO: Re-enable Turnstile before production
// import { Turnstile } from '@marsidev/react-turnstile'
import { csrfHeaders } from '@/lib/csrf'
import FadeIn from '@/components/FadeIn'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'
import { Instagram, Facebook, Linkedin } from 'lucide-react'

// Custom TikTok icon since Lucide doesn't have one
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/betterwealthco/', icon: Instagram },
  { name: 'TikTok', href: 'https://www.tiktok.com/@betterwealthco', icon: TikTokIcon },
  { name: 'Facebook', href: 'https://www.facebook.com/betterwealthco', icon: Facebook },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/better-wealth/', icon: Linkedin },
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
  marketingOptIn: boolean
}

export default function ContactPage() {
  const labelColor = { color: '#9d6d47' }
  const mutedLight = { color: '#B8D4C5' }
  const mutedDark = { color: 'rgba(0,0,0,0.35)' }
  const cardBorder = {
    border: '1px solid rgba(0,0,0,0.07)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    marketingOptIn: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  // TODO: Re-enable Turnstile before production
  // const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...csrfHeaders() },
        body: JSON.stringify({ ...formData, turnstileToken: null })
      })

      if (response.ok) {
        setShowModal(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          marketingOptIn: false
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
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
            <Link href="/partnerships" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Partnerships</Link>
            <Link href="/contact" className="pointer-events-auto text-sm font-medium transition-colors duration-200" style={{ color: '#C4926A' }}>Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/workshops"
              className="hidden lg:block btn-outline-copper text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200"
            >
              Explore Events
            </Link>
            <MobileNav currentPage="contact" />
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
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#C4926A' }}>Get In Touch</p>
            <h1 className="text-white text-4xl md:text-5xl font-serif font-bold mb-6">
              Let's Talk
            </h1>
            <p className="text-base leading-relaxed max-w-2xl mx-auto" style={mutedLight}>
              Have questions about our events? Interested in group bookings? Want to discuss a partnership? We're here to help.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Information */}
            <FadeIn>
              <div>
                <h2 className="text-2xl font-serif font-bold text-emerald mb-4">Contact Information</h2>
                <p className="text-base leading-relaxed mb-10" style={mutedDark}>
                  Whether you're ready to book an event or just want to learn more about what we do, we're happy to chat. No sales pitch—just straight answers.
                </p>

                {/* Email */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#033A22' }}>
                      <svg className="w-5 h-5" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-emerald">Email</h3>
                  </div>
                  <a
                    href="mailto:info@better-wealth.co.uk"
                    className="text-base font-medium transition-colors duration-200 hover:opacity-80"
                    style={{ color: '#9d6d47' }}
                  >
                    info@better-wealth.co.uk
                  </a>
                  <p className="text-sm mt-1" style={mutedDark}>We typically respond within 24 hours</p>
                </div>

                {/* Social Media */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#033A22' }}>
                      <svg className="w-5 h-5" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-emerald">Follow Us</h3>
                  </div>
                  <div className="flex gap-3 mb-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${social.name}`}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#C4926A] group"
                        style={{ backgroundColor: 'rgba(3, 58, 34, 0.05)' }}
                      >
                        <social.icon className="w-4 h-4 text-[#033A22]/70 group-hover:text-white transition-colors duration-200" />
                      </a>
                    ))}
                  </div>
                  <p className="text-sm" style={mutedDark}>Behind the scenes and event updates</p>
                </div>

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl" style={cardBorder}>
                  <h3 className="text-lg font-serif font-bold text-emerald mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <Link href="/workshops" className="flex items-center gap-2 text-sm text-emerald hover:opacity-70 transition-opacity">
                      <span style={{ color: '#9d6d47' }} aria-hidden="true">→</span>
                      View Upcoming Events
                    </Link>
                    <Link href="/partnerships" className="flex items-center gap-2 text-sm text-emerald hover:opacity-70 transition-opacity">
                      <span style={{ color: '#9d6d47' }} aria-hidden="true">→</span>
                      Partnership Opportunities
                    </Link>
                    <Link href="/about" className="flex items-center gap-2 text-sm text-emerald hover:opacity-70 transition-opacity">
                      <span style={{ color: '#9d6d47' }} aria-hidden="true">→</span>
                      About Better Wealth
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right Column - Contact Form */}
            <FadeIn delay={100}>
              <div className="bg-white p-8 lg:p-10 rounded-2xl" style={cardBorder}>
                <h2 className="text-2xl font-serif font-bold text-emerald mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-base font-medium text-emerald mb-2">
                        First Name <span style={{ color: '#9d6d47' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald focus:outline-none transition-colors text-sm"
                        style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-base font-medium text-emerald mb-2">
                        Last Name <span style={{ color: '#9d6d47' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald focus:outline-none transition-colors text-sm"
                        style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-base font-medium text-emerald mb-2">
                      Email <span style={{ color: '#9d6d47' }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald focus:outline-none transition-colors text-sm"
                      style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-base font-medium text-emerald mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald focus:outline-none transition-colors text-sm"
                      style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-base font-medium text-emerald mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald focus:outline-none transition-colors text-sm"
                      style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-base font-medium text-emerald mb-2">
                      Message <span style={{ color: '#9d6d47' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={1500}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald focus:outline-none transition-colors text-sm resize-none"
                      style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                    />
                    <p className="text-xs text-right mt-1" style={{ color: formData.message.length > 1500 ? '#dc2626' : 'rgba(0,0,0,0.35)' }}>
                      {formData.message.length}/1,500 characters
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="marketingOptIn"
                      checked={formData.marketingOptIn}
                      onChange={(e) => setFormData(prev => ({ ...prev, marketingOptIn: e.target.checked }))}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-[#033A22] focus:ring-[#033A22]"
                    />
                    <label htmlFor="marketingOptIn" className="text-base" style={mutedDark}>
                      I'd like to receive marketing emails from Better Wealth.{' '}
                      <Link href="/privacy" className="underline hover:text-[#C4926A]">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {/* TODO: Re-enable Turnstile before production */}
                  {/* <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                    onSuccess={setTurnstileToken}
                  /> */}

                  <button
                    type="submit"
                    disabled={isSubmitting || formData.message.length > 1500}
                    className="w-full py-4 rounded-lg text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#C4926A' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-xs text-center" style={mutedDark}>
                    We respect your privacy. Your information will never be shared.
                  </p>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest mb-4" style={labelColor}>Common Questions</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald mb-4">
                Common Questions
              </h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={mutedDark}>
                Before you reach out, here are answers to our most frequently asked questions.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            <FadeIn delay={0}>
              <article className="bg-white p-6 rounded-xl" style={cardBorder}>
                <h3 className="text-base font-serif font-bold text-emerald mb-2">Can I bring a colleague to an event?</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  Yes, each person books separately. If you're booking 3 or more places, you'll receive a 10% group discount automatically applied at checkout.
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={100}>
              <article className="bg-white p-6 rounded-xl" style={cardBorder}>
                <h3 className="text-base font-serif font-bold text-emerald mb-2">Do you offer private events for teams?</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  Yes, we offer bespoke events for firms looking to train their entire team. Get in touch to discuss your requirements and we'll create a tailored programme.
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={200}>
              <article className="bg-white p-6 rounded-xl" style={cardBorder}>
                <h3 className="text-base font-serif font-bold text-emerald mb-2">What's your refund policy?</h3>
                <p className="text-base leading-relaxed" style={mutedDark}>
                  We offer full refunds up to 14 days before the event date. After that, you can transfer your booking to a future date or send a colleague in your place.
                </p>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />

      {/* Success Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fade-in"
            style={cardBorder}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#033A22' }}
            >
              <svg className="w-8 h-8" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-emerald mb-3">Message Sent!</h3>
            <p className="text-base leading-relaxed mb-6" style={mutedDark}>
              Thank you for getting in touch. We've received your message and will respond within 24 hours.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-8 py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#C4926A' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </main>
  )
}
