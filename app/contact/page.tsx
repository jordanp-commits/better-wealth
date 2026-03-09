'use client'

import { useState } from 'react'
import Link from 'next/link'
// TODO: Re-enable Turnstile before production
// import { Turnstile } from '@marsidev/react-turnstile'
import { csrfHeaders } from '@/lib/csrf'
import FadeIn from '@/components/FadeIn'
import MobileNav from '@/components/MobileNav'
import WaitlistModal from '@/components/WaitlistModal'
import Footer from '@/components/Footer'
import MarqueeTicker from '@/components/MarqueeTicker'
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
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)
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
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{ backgroundColor: '#0D2418' }}
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
            <Link href="/workshops" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">Events</Link>
            <Link href="/about" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">About</Link>
            <Link href="/partnerships" className="pointer-events-auto text-white hover:text-[#C4926A] text-base font-medium transition-colors duration-200">Partnerships</Link>
            <Link href="/contact" className="pointer-events-auto text-base font-medium transition-colors duration-200" style={{ color: '#C4926A' }}>Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="hidden lg:block bg-[#C4926A] hover:bg-[#B07D57] text-white text-base font-medium px-5 py-2 rounded-lg transition-all duration-200"
            >
              Become a Member
            </button>
            <MobileNav currentPage="contact" onBecomeMember={() => setIsWaitlistModalOpen(true)} />
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
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35) saturate(0.7) sepia(0.3)' }} />
        <div className="absolute inset-0 bg-black/60" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }} aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-white text-5xl md:text-7xl font-serif font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-base leading-relaxed max-w-lg mx-auto text-white/75">
              Every application is reviewed personally. Responses within 24 hours.
            </p>
          </div>
        </FadeIn>
      </section>

      <MarqueeTicker />

      {/* Main Contact Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0D2418' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Information */}
            <FadeIn>
              <div>
                {/* Email */}
                <div className="mb-10">
                  <div className="w-6 border-t-2 border-[#C4926A] mb-3"></div>
                  <h3 className="text-lg font-serif tracking-wide mb-2" style={{ color: '#C4926A' }}>Email</h3>
                  <a
                    href="mailto:info@better-wealth.co.uk"
                    className="text-base font-medium text-white hover:text-[#C4926A] transition-colors duration-200"
                  >
                    info@better-wealth.co.uk
                  </a>
                  <p className="text-sm mt-1 text-white/50">We typically respond within 24 hours</p>
                </div>

                {/* Social Media */}
                <div>
                  <div className="w-6 border-t-2 border-[#C4926A] mb-3"></div>
                  <h3 className="text-lg font-serif tracking-wide mb-2" style={{ color: '#C4926A' }}>Follow Us</h3>
                  <div className="flex gap-4 mb-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${social.name}`}
                        className="text-white/60 hover:text-[#C4926A] transition-colors duration-200"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                  <p className="text-sm text-white/50">Behind the scenes and updates</p>
                </div>
              </div>
            </FadeIn>

            {/* Right Column - Contact Form */}
            <FadeIn delay={150}>
              <div className="p-10 rounded-lg" style={{ backgroundColor: '#F5F0EB' }}>
                <h2 className="text-2xl font-serif font-bold text-[#033A22] mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-[#033A22]/80 mb-1">
                        First Name <span style={{ color: '#9d6d47' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-md bg-white border border-[#C4926A]/20 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors text-base text-[#033A22] placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-[#033A22]/80 mb-1">
                        Last Name <span style={{ color: '#9d6d47' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-md bg-white border border-[#C4926A]/20 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors text-base text-[#033A22] placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#033A22]/80 mb-1">
                      Email <span style={{ color: '#9d6d47' }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md bg-white border border-[#C4926A]/20 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors text-base text-[#033A22] placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#033A22]/80 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md bg-white border border-[#C4926A]/20 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors text-base text-[#033A22] placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#033A22]/80 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md bg-white border border-[#C4926A]/20 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors text-base text-[#033A22] placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#033A22]/80 mb-1">
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
                      className="w-full px-4 py-3 rounded-md bg-white border border-[#C4926A]/20 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors text-base text-[#033A22] placeholder:text-gray-400 resize-none"
                    />
                    <p className="text-xs text-right mt-1" style={{ color: formData.message.length > 1500 ? '#dc2626' : 'rgba(3,58,34,0.4)' }}>
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
                    <label htmlFor="marketingOptIn" className="text-xs text-[#033A22]/50">
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
                    className="px-8 py-3 rounded-md text-white font-semibold text-base transition-colors duration-200 hover:bg-[#B07D57] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#C4926A' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-xs" style={{ color: 'rgba(3,58,34,0.5)' }}>
                    We respect your privacy. Your information will never be shared.
                  </p>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="overflow-hidden" style={{ backgroundColor: '#FAF8F4' }}>
        {/* Dark header band */}
        <div className="py-16 px-6" style={{ backgroundColor: '#0D2418' }}>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Common Questions
              </h2>
            </FadeIn>
          </div>
        </div>

        {/* Accordion */}
        <div className="pt-12 pb-16 md:pt-16 md:pb-24 px-6">
          <div className="max-w-3xl mx-auto space-y-3">
            {[
              { q: 'What is Better Wealth?', a: 'Better Wealth is a private membership network for founders and operators who are serious about building long-term wealth. We bring together a vetted community of people at a similar stage, supported by workshops, masterminds, expert sessions, and genuine peer connections.' },
              { q: 'Who is Better Wealth for?', a: 'Better Wealth is for founders and operators who are already building — people with established businesses, real revenue, and a long-term mindset around wealth and independence. If you\'re past the early stage and looking for a network that matches where you are, you\'re likely a good fit.' },
              { q: 'How is this different from a regular business network or membership?', a: 'Most networks are open to anyone who pays. Ours isn\'t. Every member goes through an application process, which means the quality of people, conversations, and introductions is consistently high. We\'re building something deliberate — not a forum or a directory, but a working network of serious operators.' },
              { q: 'How do I apply for membership?', a: 'You can apply directly through the website. We review every application individually to assess fit, for your benefit as much as ours. If accepted, you\'ll be onboarded and connected with relevant members straight away.' },
              { q: 'Is there a membership fee?', a: 'Yes. Membership is paid, reflecting the quality and exclusivity of what\'s inside. Pricing is shared during the application process.' },
              { q: 'What do I actually get as a member?', a: 'Access to our private network of founders and operators, curated workshops and masterminds, expert-led sessions, peer introductions, and an ongoing community of people navigating similar challenges at a similar level.' },
              { q: 'What stage does my business need to be at?', a: 'There\'s no fixed requirement, but Better Wealth is designed for people who are past the startup phase. If your business has real traction and you\'re thinking seriously about scale and wealth, you\'re likely where we\'d want you to be.' },
              { q: 'How many members are in the network?', a: 'We\'re intentionally selective about growth. We\'d rather maintain a high-quality, tight-knit network than scale for the sake of it. Current member numbers are shared during the application process.' },
              { q: 'Where are Better Wealth members based?', a: 'The community is primarily UK-based, but we welcome founders and operators building internationally. A number of our members operate across multiple markets.' },
              { q: 'How often are workshops and masterminds held?', a: 'Sessions are held regularly throughout the year. As a member you\'ll have visibility of the full calendar and priority access to all events.' },
              { q: 'Can I attend a session before applying for membership?', a: 'Occasionally we open select workshops to non-members as an introduction to the community. Get in touch directly and we can let you know what\'s currently available.' },
              { q: 'What if Better Wealth isn\'t the right fit for me?', a: 'We\'d rather be upfront about fit during the application process than have someone join who isn\'t in the right place for it. If it\'s not the right time, we\'ll let you know honestly.' },
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  className="rounded-lg overflow-hidden transition-all duration-200"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', borderLeft: faqOpenIndex === i ? '4px solid #C4926A' : '4px solid transparent' }}
                >
                  <button
                    onClick={() => setFaqOpenIndex(faqOpenIndex === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F5F2EC] transition-colors"
                    aria-expanded={faqOpenIndex === i}
                  >
                    <span className="font-serif font-semibold text-base pr-8" style={{ color: '#033A22' }}>{faq.q}</span>
                    <span
                      className="text-2xl flex-shrink-0 transition-transform duration-200"
                      style={{ color: '#C4926A', transform: faqOpenIndex === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  {faqOpenIndex === i && (
                    <div className="px-6 pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
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
              className="px-8 py-3 rounded-lg text-white font-semibold text-base transition-all duration-200 hover:opacity-90"
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
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </main>
  )
}
