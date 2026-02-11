'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import { csrfHeaders } from '@/lib/csrf'

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gdprConsent, setGdprConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  useEffect(() => {
    // Don't show if already subscribed
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('newsletter_subscribed') === 'true') {
        return
      }

      // Don't show if already dismissed this session
      if (sessionStorage.getItem('newsletter_dismissed') === 'true') {
        return
      }
    }

    let hasShown = false

    // Timer: Show after 30 seconds
    const timer = setTimeout(() => {
      if (!hasShown) {
        hasShown = true
        setIsOpen(true)
      }
    }, 30000)

    // Scroll: Show after 50% scroll
    const handleScroll = () => {
      if (hasShown) return

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (window.scrollY / scrollHeight) * 100

      if (scrollPercent >= 50) {
        hasShown = true
        setIsOpen(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('newsletter_dismissed', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...csrfHeaders() },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          source: 'modal',
          turnstileToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong')
        setSubmitting(false)
        return
      }

      setSuccess(true)
      localStorage.setItem('newsletter_subscribed', 'true')

      // Close after 2 seconds
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full relative"
        style={{ border: '1px solid rgba(0,0,0,0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {success ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#033A22' }}
            >
              <svg className="w-8 h-8" fill="none" stroke="#C4926A" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#033A22] mb-2">You're In!</h3>
            <p className="text-gray-600">Thank you for subscribing. Check your inbox soon.</p>
          </div>
        ) : (
          <>
            {/* Copper Line Accent */}
            <div className="w-12 h-1 mb-6" style={{ backgroundColor: '#C4926A' }} />

            <h2 className="text-2xl font-serif font-bold text-[#033A22] mb-2">Stay Connected</h2>
            <p className="text-base text-gray-600 mb-6">
              Get workshop updates, marketing tips, and exclusive offers delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#033A22]"
                    style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#033A22]"
                    style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#033A22]"
                  style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdpr-consent"
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#033A22] focus:ring-[#033A22]"
                  required
                />
                <label htmlFor="gdpr-consent" className="text-base text-gray-600">
                  I agree to receive marketing emails from Better Wealth.{' '}
                  <Link href="/privacy" className="underline hover:text-[#C4926A]">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                onSuccess={setTurnstileToken}
              />

              <button
                type="submit"
                disabled={submitting || !gdprConsent || !turnstileToken}
                className="w-full py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#C4926A', color: '#033A22' }}
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>

              <p className="text-xs text-center text-gray-500">
                Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
