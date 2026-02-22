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
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

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

      setSuccess(true)
    } catch (err) {
      setError('Failed to submit. Please try again.')
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    // Reset form after animation
    setTimeout(() => {
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setCompany('')
      setWhyJoin('')
      setSubmitting(false)
      setSuccess(false)
      setError('')
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
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
            <h3 className="text-2xl font-serif font-bold text-[#033A22] mb-3">You're on the Waitlist</h3>
            <p className="text-gray-600 mb-8">
              Thank you for applying. We're reviewing applications and will be in touch soon.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              style={{ backgroundColor: '#C4926A', color: '#033A22' }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: '#C4926A' }} />
              <h2 className="text-2xl font-serif font-bold text-[#033A22] mb-2">Become a Member</h2>
              <p className="text-base text-gray-600">
                Apply to be considered for our private community
              </p>
            </div>

            {/* Value proposition */}
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F4F2EF' }}>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#C4926A' }} className="mt-0.5 flex-shrink-0">&#10003;</span>
                  Access to exclusive network
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#C4926A' }} className="mt-0.5 flex-shrink-0">&#10003;</span>
                  Private events at premium venues
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#C4926A' }} className="mt-0.5 flex-shrink-0">&#10003;</span>
                  Curated, measured connections
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#C4926A' }} className="mt-0.5 flex-shrink-0">&#10003;</span>
                  Mentorship opportunities
                </li>
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name *</label>
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
                  <label className="block text-sm font-medium mb-1">Last Name *</label>
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
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#033A22]"
                  style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#033A22]"
                  style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#033A22]"
                  style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Why do you want to join our community? *</label>
                <textarea
                  value={whyJoin}
                  onChange={(e) => setWhyJoin(e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-[#033A22] resize-none"
                  style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                  rows={3}
                  placeholder="Tell us about your goals and what you're looking to achieve..."
                  required
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#C4926A', color: '#033A22' }}
              >
                {submitting ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
