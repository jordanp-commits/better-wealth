'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Linkedin } from 'lucide-react'
import { Turnstile } from '@marsidev/react-turnstile'
import { csrfHeaders } from '@/lib/csrf'

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
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/betterwealthco/',
    icon: Instagram,
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@betterwealthco',
    icon: TikTokIcon,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/betterwealthco',
    icon: Facebook,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/better-wealth/',
    icon: Linkedin,
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAlreadySubscribed(localStorage.getItem('newsletter_subscribed') === 'true')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...csrfHeaders() },
        body: JSON.stringify({ email, source: 'footer', turnstileToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong')
        setSubmitting(false)
        return
      }

      setSuccess(true)
      setEmail('')
      localStorage.setItem('newsletter_subscribed', 'true')
      setAlreadySubscribed(true)
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="pt-12 pb-12 px-6" style={{ backgroundColor: '#022A18' }}>
      <div className="max-w-6xl mx-auto">
        {/* Newsletter Signup Section */}
        <section
          aria-label="Newsletter signup"
          className="pb-10 mb-10"
          style={{ borderBottom: '1px solid rgba(196, 146, 106, 0.2)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-serif font-bold mb-2" style={{ color: '#C4926A' }}>
                Join Our Community
              </h3>
              <p className="text-base" style={{ color: '#B8D4C5' }}>
                Get practical marketing strategies and workshop updates delivered monthly.
              </p>
            </div>
            <div>
              {alreadySubscribed ? (
                <div className="flex items-center gap-2 py-3">
                  <svg className="w-5 h-5" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base" style={{ color: '#C4926A' }}>
                    You're subscribed!
                  </span>
                </div>
              ) : success ? (
                <div className="flex items-center gap-2 py-3">
                  <svg className="w-5 h-5" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base" style={{ color: '#C4926A' }}>
                    Thank you for subscribing!
                  </span>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-lg bg-transparent border-2 text-white placeholder-white/50 focus:outline-none focus:border-[#C4926A]"
                      style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                      required
                    />
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                      onSuccess={setTurnstileToken}
                    />
                    <button
                      type="submit"
                      disabled={submitting || !turnstileToken}
                      className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                      style={{ backgroundColor: '#C4926A', color: '#033A22' }}
                    >
                      {submitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                  <p className="text-xs mt-3" style={{ color: '#FFFFFF' }}>
                    By subscribing you agree to receive marketing emails.{' '}
                    <Link href="/privacy" className="underline hover:text-[#C4926A]">
                      Privacy Policy
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Main Footer Content */}
        <div
          className="w-full mb-8"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}
        />
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div>
            <div style={{ height: '32px', overflow: 'hidden', marginLeft: '-20px' }}>
              <img
                src="/logo-single-line.svg"
                alt="Better Wealth logo"
                style={{ height: '140px', width: 'auto', marginTop: '-54px' }}
              />
            </div>
            <p
              className="text-xs mt-3 max-w-xs leading-relaxed"
              style={{ color: '#B8D4C5' }}
            >
              Marketing education and community for ambitious professionals in financial services.
            </p>
            <div className="flex gap-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  className="text-white transition-colors hover:text-[#C4926A]"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-12">
            <nav aria-label="Footer navigation">
              <h4
                className="text-xs font-medium uppercase tracking-wider mb-3"
                style={{ color: '#FFFFFF' }}
              >
                Explore
              </h4>
              <div className="space-y-2">
                <div>
                  <Link href="/workshops" className="text-sm footer-link">
                    Workshops
                  </Link>
                </div>
                <div>
                  <Link href="/about" className="text-sm footer-link">
                    About
                  </Link>
                </div>
                <div>
                  <Link href="/partnerships" className="text-sm footer-link">
                    Partnerships
                  </Link>
                </div>
                <div>
                  <Link href="/contact" className="text-sm footer-link">
                    Contact
                  </Link>
                </div>
              </div>
            </nav>
            <nav aria-label="Legal links">
              <h4
                className="text-xs font-medium uppercase tracking-wider mb-3"
                style={{ color: '#FFFFFF' }}
              >
                Legal
              </h4>
              <div className="space-y-2">
                <div>
                  <Link href="/privacy" className="text-sm footer-link">
                    Privacy Policy
                  </Link>
                </div>
                <div>
                  <Link href="/cookie-policy" className="text-sm footer-link">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(250,250,248,0.1)' }}>
          <p className="text-xs" style={{ color: '#FFFFFF' }}>
            © 2026 Better Wealth. All rights reserved. better-wealth.co.uk
          </p>
        </div>
      </div>
    </footer>
  )
}
