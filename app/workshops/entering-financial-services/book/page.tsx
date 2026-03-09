'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'
import { loadStripe } from '@stripe/stripe-js'
// TODO: Re-enable Turnstile before production
// import { Turnstile } from '@marsidev/react-turnstile'
import { csrfHeaders } from '@/lib/csrf'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type WorkshopDate = {
  id: string
  date: string
  time_start: string
  time_end: string
  seats_remaining: number
}

type Workshop = {
  id: string
  name: string
  price: number
  description: string
}

function BookWorkshopContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = 'entering-financial-services'

  const [step, setStep] = useState(1)
  const [workshop, setWorkshop] = useState<Workshop | null>(null)
  const [workshopDates, setWorkshopDates] = useState<WorkshopDate[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [datePreSelected, setDatePreSelected] = useState(false)
  // TODO: Re-enable Turnstile before production
  // const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  // Form data
  const [selectedDateId, setSelectedDateId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')

  // Check for pre-selected date from URL params
  const preSelectedDateId = searchParams.get('date_id')

  useEffect(() => {
    fetchWorkshopData()
  }, [slug])

  // Handle pre-selection after dates are loaded
  useEffect(() => {
    if (preSelectedDateId && workshopDates.length > 0 && !datePreSelected) {
      const matchingDate = workshopDates.find(d => d.id === preSelectedDateId)
      if (matchingDate) {
        setSelectedDateId(preSelectedDateId)
        setStep(2) // Skip to Step 2
        setDatePreSelected(true)
      }
    }
  }, [preSelectedDateId, workshopDates, datePreSelected])

  async function fetchWorkshopData() {
    try {
      // Fetch workshop
      const { data: workshopData, error: workshopError } = await supabase
        .from('workshops')
        .select('*')
        .eq('slug', slug)
        .single()

      if (workshopError) throw workshopError

      setWorkshop(workshopData)

      // Fetch upcoming available dates
      const today = new Date().toISOString().split('T')[0]
      const { data: datesData, error: datesError } = await supabase
        .from('workshop_dates')
        .select('*')
        .eq('workshop_id', workshopData.id)
        .gte('date', today)
        .gt('seats_remaining', 0)
        .order('date', { ascending: true })

      if (datesError) throw datesError

      setWorkshopDates(datesData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching workshop:', error)
      setLoading(false)
    }
  }

  const selectedDate = workshopDates.find(d => d.id === selectedDateId)
  const maxQuantity = selectedDate ? Math.min(selectedDate.seats_remaining, 15) : 15

  // Validate quantity when date changes
  useEffect(() => {
    if (selectedDate && quantity > selectedDate.seats_remaining) {
      setQuantity(Math.min(selectedDate.seats_remaining, 15))
    }
  }, [selectedDateId])

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(value, maxQuantity))
    setQuantity(newQuantity)
  }

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  async function handlePayment() {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.')
      return
    }
    setSubmitting(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...csrfHeaders() },
        body: JSON.stringify({
          workshopDateId: selectedDateId,
          quantity,
          firstName,
          lastName,
          email,
          phone,
          company,
          turnstileToken: null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Something went wrong')
        setSubmitting(false)
        return
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error('Payment error:', error)
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: '#0D2418' }}>
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!workshop) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: '#0D2418' }}>
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-white/60">Event not found</p>
          </div>
        </div>
      </main>
    )
  }

  const totalPrice = (workshop.price / 100) * quantity

  const step1Disabled = !selectedDateId
  const step2Disabled = !firstName || !lastName || !email || !isValidEmail(email) || !phone || quantity < 1 || quantity > maxQuantity

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0D2418' }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-xl mx-auto">
          {/* Progress Bar */}
          <div className="py-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              {[
                { num: 1, label: 'Select Date' },
                { num: 2, label: 'Your Details' },
                { num: 3, label: 'Payment' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                    step > s.num
                      ? 'border border-[#C4926A] text-[#C4926A]'
                      : step === s.num
                        ? 'bg-[#C4926A] text-white'
                        : 'border border-white/20 text-white/30'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className={`text-sm font-medium ${
                    step > s.num
                      ? 'text-[#C4926A]'
                      : step === s.num
                        ? 'text-white'
                        : 'text-white/30'
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full h-[2px] bg-white/15 rounded-full">
              <div
                className="h-[2px] rounded-full bg-[#C4926A] transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Card */}
          <div className="rounded-lg border-t-4 border-[#C4926A] p-8 md:p-10" style={{ backgroundColor: '#F5F0EB' }}>
            <h1 className="font-serif text-[#033A22] text-2xl md:text-3xl font-bold">
              {workshop.name}
            </h1>
            <p className="text-[#033A22]/50 text-sm mt-1 mb-8">
              £{workshop.price / 100} per person
            </p>

            {/* Step 1: Select Date */}
            {step === 1 && (
              <section aria-label="Select date">
                <h2 className="font-serif text-[#033A22] text-base font-semibold mb-4">Select Your Event Date</h2>
                <div className="space-y-3">
                  {workshopDates.map((date) => {
                    const isSelected = selectedDateId === date.id
                    return (
                      <button
                        key={date.id}
                        onClick={() => setSelectedDateId(date.id)}
                        className={`w-full p-4 rounded-md text-left transition-all ${
                          isSelected
                            ? 'border border-[#C4926A]'
                            : 'bg-white border border-[#033A22]/10 hover:border-[#C4926A]/50'
                        }`}
                        style={isSelected ? { backgroundColor: '#0D2418' } : undefined}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-[#033A22]'}`}>
                              {new Date(date.date + 'T00:00:00').toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                            <p className={`text-sm mt-1 ${isSelected ? 'text-white/60' : 'text-[#033A22]/50'}`}>
                              {date.time_start.slice(0, 5)} - {date.time_end.slice(0, 5)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[#C4926A] text-sm font-medium">
                              {date.seats_remaining} {date.seats_remaining === 1 ? 'spot' : 'spots'} left
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={step1Disabled}
                  className={`w-full mt-6 rounded-md py-3 font-medium tracking-wide transition-all duration-200 ${
                    step1Disabled
                      ? 'bg-[#C4926A]/40 text-white/60 cursor-not-allowed'
                      : 'bg-[#C4926A] text-white border border-[#C4926A] hover:bg-transparent hover:text-[#C4926A]'
                  }`}
                >
                  Continue to Details →
                </button>
              </section>
            )}

            {/* Step 2: Your Details */}
            {step === 2 && (
              <section aria-label="Your details">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-[#033A22] text-base font-semibold">Your Details</h2>
                  <button
                    onClick={() => {
                      setStep(1)
                      setDatePreSelected(false)
                    }}
                    className="text-[#C4926A] text-sm hover:text-[#B07D57] transition-colors"
                  >
                    Change Date
                  </button>
                </div>

                {/* Selected Date Summary */}
                {selectedDate && (
                  <div className="rounded-md p-4 mb-6" style={{ backgroundColor: '#0D2418' }}>
                    <p className="text-white font-medium text-sm">
                      {new Date(selectedDate.date + 'T00:00:00').toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-white/50 text-sm mt-1">
                      {selectedDate.time_start.slice(0, 5)} - {selectedDate.time_end.slice(0, 5)}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="mb-2">
                    <label className="block text-[#033A22]/70 text-sm font-medium mb-2">Number of Attendees *</label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-sm border border-[#C4926A]/40 text-[#C4926A] flex items-center justify-center hover:bg-[#C4926A]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        −
                      </button>
                      <span className="text-[#033A22] font-serif text-lg font-bold px-4">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= maxQuantity}
                        className="w-8 h-8 rounded-sm border border-[#C4926A]/40 text-[#C4926A] flex items-center justify-center hover:bg-[#C4926A]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        +
                      </button>
                      <span className="text-[#C4926A] text-sm ml-3">
                        {selectedDate?.seats_remaining} spots available
                      </span>
                    </div>
                    {quantity > 1 && (
                      <p className="text-[#033A22]/50 text-sm mt-2">
                        Booking {quantity} places at £{workshop.price / 100} each = £{totalPrice}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#033A22]/70 text-sm font-medium mb-1">First Name *</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white border border-[#033A22]/15 rounded-md px-4 py-3 text-sm text-[#033A22] placeholder:text-gray-400 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#033A22]/70 text-sm font-medium mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white border border-[#033A22]/15 rounded-md px-4 py-3 text-sm text-[#033A22] placeholder:text-gray-400 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#033A22]/70 text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#033A22]/15 rounded-md px-4 py-3 text-sm text-[#033A22] placeholder:text-gray-400 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#033A22]/70 text-sm font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#033A22]/15 rounded-md px-4 py-3 text-sm text-[#033A22] placeholder:text-gray-400 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#033A22]/70 text-sm font-medium mb-1">Company (Optional)</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white border border-[#033A22]/15 rounded-md px-4 py-3 text-sm text-[#033A22] placeholder:text-gray-400 focus:border-[#C4926A]/60 focus:ring-0 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-transparent text-[#033A22] border border-[#033A22]/25 rounded-md py-3 font-medium hover:border-[#C4926A]/50 hover:text-[#C4926A] transition-all duration-200"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={step2Disabled}
                    className={`flex-1 rounded-md py-3 font-medium tracking-wide transition-all duration-200 ${
                      step2Disabled
                        ? 'bg-[#C4926A]/40 text-white/60 cursor-not-allowed'
                        : 'bg-[#C4926A] text-white border border-[#C4926A] hover:bg-transparent hover:text-[#C4926A]'
                    }`}
                  >
                    Continue to Payment →
                  </button>
                </div>
              </section>
            )}

            {/* Step 3: Payment Summary */}
            {step === 3 && (
              <section aria-label="Payment summary">
                <h2 className="font-serif text-[#033A22] text-base font-semibold mb-4">Confirm & Pay</h2>

                <div className="bg-white border border-[#033A22]/10 rounded-md p-5 mb-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#C4926A] mb-3">Booking Summary</p>
                  <div>
                    <div className="flex justify-between border-b border-[#033A22]/8 py-2">
                      <span className="text-[#033A22]/50 text-sm">Event</span>
                      <span className="text-[#033A22] text-sm font-medium text-right">{workshop.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#033A22]/8 py-2">
                      <span className="text-[#033A22]/50 text-sm">Date</span>
                      <span className="text-[#033A22] text-sm font-medium">
                        {selectedDate && new Date(selectedDate.date + 'T00:00:00').toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#033A22]/8 py-2">
                      <span className="text-[#033A22]/50 text-sm">Time</span>
                      <span className="text-[#033A22] text-sm font-medium">
                        {selectedDate && `${selectedDate.time_start.slice(0, 5)} - ${selectedDate.time_end.slice(0, 5)}`}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#033A22]/8 py-2">
                      <span className="text-[#033A22]/50 text-sm">Attendees</span>
                      <span className="text-[#033A22] text-sm font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#033A22]/8 py-2">
                      <span className="text-[#033A22]/50 text-sm">Contact Name</span>
                      <span className="text-[#033A22] text-sm font-medium">{firstName} {lastName}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#033A22]/8 py-2">
                      <span className="text-[#033A22]/50 text-sm">Email</span>
                      <span className="text-[#033A22] text-sm font-medium">{email}</span>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="flex justify-between border-b border-[#033A22]/8 py-2">
                      <span className="text-[#033A22]/60 text-sm">Price per person</span>
                      <span className="text-[#033A22] text-sm font-medium">£{workshop.price / 100}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#033A22]/8 py-2">
                      <span className="text-[#033A22]/60 text-sm">Attendees</span>
                      <span className="text-[#033A22] text-sm font-medium">× {quantity}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#033A22] font-bold text-sm">Total</span>
                      <span className="text-[#C4926A] font-serif text-xl font-bold">£{totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* TODO: Re-enable Turnstile before production */}
                {/* <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                  onSuccess={setTurnstileToken}
                /> */}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    disabled={submitting}
                    className="flex-1 bg-transparent text-[#033A22] border border-[#033A22]/25 rounded-md py-3 font-medium hover:border-[#C4926A]/50 hover:text-[#C4926A] transition-all duration-200 disabled:opacity-50"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={submitting}
                    className={`flex-1 rounded-md py-3 font-medium tracking-wide transition-all duration-200 ${
                      submitting
                        ? 'bg-[#C4926A]/40 text-white/60 cursor-not-allowed'
                        : 'bg-[#C4926A] text-white border border-[#C4926A] hover:bg-transparent hover:text-[#C4926A]'
                    }`}
                  >
                    {submitting ? 'Processing...' : `Pay £${totalPrice} →`}
                  </button>
                </div>

                <p className="text-[#033A22]/40 text-xs text-center mt-4">
                  Secure payment powered by Stripe
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

// Wrap in Suspense for useSearchParams
export default function BookWorkshop() {
  return (
    <Suspense fallback={
      <main className="min-h-screen" style={{ backgroundColor: '#0D2418' }}>
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      </main>
    }>
      <BookWorkshopContent />
    </Suspense>
  )
}
