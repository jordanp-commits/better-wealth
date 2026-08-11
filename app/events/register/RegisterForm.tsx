'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const EVENT_OPTIONS = [
  'In Partnership With: Tech Founders \u2014 2 Aug, Manchester',
  'Mallorca Dinner \u2014 15 Aug (by invitation)',
  'Mayfair Dinner, London \u2014 20 Aug (by invitation)',
  'The Cigar Lounge \u2014 21 Aug, Dakota, Manchester',
  'Masterclass: Alternative Assets \u2014 3 Sep, Manchester',
  'The Investors Circle \u2014 16 Sep, Cloud 23, Manchester',
  'Better Wealth Autumn Dinner \u2014 24 Sep, The Black Friar, Manchester',
] as const

type EventOption = (typeof EVENT_OPTIONS)[number]

interface FormData {
  first_name: string
  last_name: string
  event: EventOption | ''
  email: string
  phone: string
  reason: string
  company: string
  marketing_opt_in: boolean
}

export default function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    first_name: '',
    last_name: '',
    event: '',
    email: '',
    phone: '',
    reason: '',
    company: '',
    marketing_opt_in: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    // Client-side phone validation (if provided)
    if (form.phone) {
      const digitsOnly = form.phone.replace(/[\s\-\(\)\.]/g, '')
      if (!/^\+?\d{7,15}$/.test(digitsOnly)) {
        setError('Please enter a valid phone number.')
        return
      }
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/register-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Something went wrong \u2014 please try again.')
        setSubmitting(false)
        return
      }

      router.push('/events/register/confirmed')
    } catch {
      setError('Something went wrong \u2014 please try again.')
      setSubmitting(false)
    }
  }

  const inputClasses =
    'w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 rounded-none focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Honeypot */}
      <div
        aria-hidden="true"
        className="absolute overflow-hidden"
        style={{ height: 0, width: 0, opacity: 0 }}
      >
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="first_name" className="block text-xs font-medium uppercase tracking-wide text-stone-600 mb-1.5">
            First name
          </label>
          <input
            id="first_name"
            type="text"
            required
            className={inputClasses}
            value={form.first_name}
            onChange={(e) => update('first_name', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-xs font-medium uppercase tracking-wide text-stone-600 mb-1.5">
            Last name
          </label>
          <input
            id="last_name"
            type="text"
            required
            className={inputClasses}
            value={form.last_name}
            onChange={(e) => update('last_name', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="event" className="block text-xs font-medium uppercase tracking-wide text-stone-600 mb-1.5">
          Which event
        </label>
        <select
          id="event"
          required
          className={inputClasses}
          value={form.event}
          onChange={(e) => update('event', e.target.value)}
        >
          <option value="" disabled>
            Select an event
          </option>
          {EVENT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wide text-stone-600 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className={inputClasses}
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-medium uppercase tracking-wide text-stone-600 mb-1.5">
          Phone (optional)
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="e.g. +44 7700 900000"
          className={inputClasses}
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="reason" className="block text-xs font-medium uppercase tracking-wide text-stone-600 mb-1.5">
          Reason for wanting to attend
        </label>
        <textarea
          id="reason"
          required
          rows={4}
          className={inputClasses + ' resize-none'}
          value={form.reason}
          onChange={(e) => update('reason', e.target.value)}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="marketing_opt_in"
          type="checkbox"
          checked={form.marketing_opt_in}
          onChange={(e) => setForm((prev) => ({ ...prev, marketing_opt_in: e.target.checked }))}
          className="mt-0.5 h-4 w-4 border-stone-300 accent-emerald-dark"
        />
        <label htmlFor="marketing_opt_in" className="text-xs text-stone-500 leading-relaxed">
          I&rsquo;d like to receive updates about future events and news from Better Wealth. You can unsubscribe at any time.
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-emerald-dark text-warmwhite text-sm font-medium px-8 py-3 hover:bg-emerald transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting\u2026' : 'Register interest'}
        </button>
      </div>
    </form>
  )
}
