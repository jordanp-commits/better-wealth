'use client'

import { useState } from 'react'
import { csrfHeaders } from '@/lib/csrf'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [whyJoin, setWhyJoin] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const canSubmit = firstName && lastName && email && isValidEmail(email) && phone && whyJoin && !submitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...csrfHeaders() },
        body: JSON.stringify({ firstName, lastName, email, phone, company, whyJoin }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong')
        setSubmitting(false)
        return
      }

      window.location.href = '/thank-you'
    } catch (err) {
      setError('Failed to submit. Please try again.')
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setCompany('')
      setWhyJoin('')
      setConsent(false)
      setSubmitting(false)
      setSuccess(false)
      setError('')
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="border border-[#C4926A]/20 border-t-4 border-t-[#C4926A] rounded-lg p-8 md:p-10 max-w-md md:max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#0D2418' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white text-xl transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full border-2 border-[#C4926A] flex items-center justify-center mx-auto mb-4">
              <span className="text-[#C4926A] text-xl">✓</span>
            </div>
            <p className="font-serif text-white text-xl mb-2">Application Received</p>
            <p className="text-white/55 text-sm">
              We'll review your application and be in touch soon.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="w-8 border-t-2 border-[#C4926A] mb-5" />
            <h2 className="font-serif text-white text-2xl md:text-3xl font-bold mb-2">Apply for Membership</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Join the waitlist. We review every application personally and will be in touch soon.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 text-xs tracking-wide uppercase mb-1">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#0A1F10] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#C4926A]/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs tracking-wide uppercase mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#0A1F10] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#C4926A]/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/60 text-xs tracking-wide uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A1F10] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#C4926A]/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs tracking-wide uppercase mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0A1F10] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#C4926A]/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs tracking-wide uppercase mb-1">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#0A1F10] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#C4926A]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs tracking-wide uppercase mb-1">Why do you want to join? *</label>
                <textarea
                  value={whyJoin}
                  onChange={(e) => setWhyJoin(e.target.value)}
                  placeholder="Tell us about your goals and what you're looking to achieve..."
                  rows={2}
                  className="w-full bg-[#0A1F10] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#C4926A]/50 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              {/* GDPR Consent */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-sm border transition-colors ${
                    consent
                      ? 'bg-[#C4926A] border-[#C4926A]'
                      : 'bg-transparent border-white/20'
                  } flex items-center justify-center`}>
                    {consent && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-white/50 text-xs leading-relaxed">
                  I agree to receive communications from Better Wealth.{' '}
                  <a href="/privacy" className="text-[#C4926A] hover:underline">Privacy Policy</a>
                </span>
              </label>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full py-3 rounded-md font-medium tracking-wide transition-colors duration-200 ${
                  canSubmit
                    ? 'bg-[#C4926A] text-white hover:bg-[#B07D57]'
                    : 'bg-[#C4926A]/40 text-white/50 cursor-not-allowed'
                }`}
              >
                {submitting ? 'Submitting...' : 'Apply to Join →'}
              </button>
            </form>

            <p className="text-white/30 text-xs text-center mt-4">
              Applications reviewed personally. Not a mass-membership platform.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
