'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'
import { loadStripe } from '@stripe/stripe-js'
import { Turnstile } from '@marsidev/react-turnstile'
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
  const slug = 'paid-advertising'

  const [step, setStep] = useState(1)
  const [workshop, setWorkshop] = useState<Workshop | null>(null)
  const [workshopDates, setWorkshopDates] = useState<WorkshopDate[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [datePreSelected, setDatePreSelected] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

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

      // Fetch available dates
      const { data: datesData, error: datesError } = await supabase
        .from('workshop_dates')
        .select('*')
        .eq('workshop_id', workshopData.id)
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

  async function handlePayment() {
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
          turnstileToken,
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
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Workshop not found</p>
      </div>
    )
  }

  const totalPrice = (workshop.price / 100) * quantity

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${step >= 1 ? 'text-emerald' : 'text-gray-400'}`}>
                ① Select Date
              </span>
              <span className={`text-sm font-medium ${step >= 2 ? 'text-emerald' : 'text-gray-400'}`}>
                ② Your Details
              </span>
              <span className={`text-sm font-medium ${step >= 3 ? 'text-emerald' : 'text-gray-400'}`}>
                ③ Payment
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(step / 3) * 100}%`,
                  backgroundColor: '#033A22'
                }}
              />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl py-8 md:py-12 px-8 shadow-lg">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-emerald mb-2">
              {workshop.name}
            </h1>
            <p className="text-sm mb-8 md:mb-12" style={{ color: 'rgba(0,0,0,0.6)' }}>
              £{workshop.price / 100} per person
            </p>

            {/* Step 1: Select Date */}
            {step === 1 && (
              <section aria-label="Select date">
                <h2 className="text-lg font-medium text-emerald mb-4">Select Your Workshop Date</h2>
                <div className="space-y-3">
                  {workshopDates.map((date) => (
                    <button
                      key={date.id}
                      onClick={() => setSelectedDateId(date.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedDateId === date.id
                          ? 'border-emerald bg-emerald/5'
                          : 'border-gray-200 hover:border-emerald/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-emerald">
                            {new Date(date.date + 'T00:00:00').toLocaleDateString('en-GB', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-sm mt-1" style={{ color: 'rgba(0,0,0,0.6)' }}>
                            {date.time_start.slice(0, 5)} - {date.time_end.slice(0, 5)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium" style={{ color: '#9d6d47' }}>
                            {date.seats_remaining} {date.seats_remaining === 1 ? 'spot' : 'spots'} left
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedDateId}
                  className="w-full mt-6 btn-copper px-6 py-3 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Details →
                </button>
              </section>
            )}

            {/* Step 2: Your Details */}
            {step === 2 && (
              <section aria-label="Your details">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-emerald">Your Details</h2>
                  <button
                    onClick={() => {
                      setStep(1)
                      setDatePreSelected(false)
                    }}
                    className="text-sm font-medium transition-colors hover:underline"
                    style={{ color: '#9d6d47' }}
                  >
                    Change Date
                  </button>
                </div>

                {/* Selected Date Summary */}
                {selectedDate && (
                  <div className="bg-emerald/5 border border-emerald/20 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-emerald">
                      {new Date(selectedDate.date + 'T00:00:00').toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm mt-1" style={{ color: 'rgba(0,0,0,0.6)' }}>
                      {selectedDate.time_start.slice(0, 5)} - {selectedDate.time_end.slice(0, 5)}
                    </p>
                  </div>
                )}
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-2">
                    <label className="block text-base font-medium mb-2">Number of Attendees *</label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className="w-10 h-10 rounded-l-lg border-2 border-r-0 border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          max={maxQuantity}
                          value={quantity}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                          className="w-16 h-10 border-2 border-gray-300 text-center focus:outline-none focus:border-emerald"
                          style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                        />
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= maxQuantity}
                          className="w-10 h-10 rounded-r-lg border-2 border-l-0 border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm" style={{ color: '#9d6d47' }}>
                        {selectedDate?.seats_remaining} spots available
                      </span>
                    </div>
                    {quantity > 1 && (
                      <p className="text-xs mt-2" style={{ color: 'rgba(0,0,0,0.5)' }}>
                        Booking {quantity} places at £{workshop.price / 100} each = £{totalPrice}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-base font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-emerald focus:outline-none"
                        style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-emerald focus:outline-none"
                        style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-emerald focus:outline-none"
                      style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-emerald focus:outline-none"
                      style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-emerald focus:outline-none"
                      style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 border-2 border-emerald text-emerald rounded-lg font-semibold hover:bg-emerald/5"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!firstName || !lastName || !email || !phone || quantity < 1 || quantity > maxQuantity}
                    className="flex-1 btn-copper px-6 py-3 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </section>
            )}

            {/* Step 3: Payment Summary */}
            {step === 3 && (
              <section aria-label="Payment summary">
                <h2 className="text-lg font-medium text-emerald mb-8">Confirm & Pay</h2>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium mb-3">Booking Summary</h3>
                  <div className="space-y-2 text-base">
                    <div>
                      <span className="block mb-1" style={{ color: 'rgba(0,0,0,0.6)' }}>Workshop:</span>
                      <span className="font-medium">{workshop.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(0,0,0,0.6)' }}>Date:</span>
                      <span className="font-medium">
                        {selectedDate && new Date(selectedDate.date + 'T00:00:00').toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(0,0,0,0.6)' }}>Time:</span>
                      <span className="font-medium">
                        {selectedDate && `${selectedDate.time_start.slice(0, 5)} - ${selectedDate.time_end.slice(0, 5)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(0,0,0,0.6)' }}>Attendees:</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(0,0,0,0.6)' }}>Contact Name:</span>
                      <span className="font-medium">{firstName} {lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(0,0,0,0.6)' }}>Email:</span>
                      <span className="font-medium">{email}</span>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="pt-3 mt-3 border-t border-gray-200 space-y-2">
                      <div className="flex justify-between">
                        <span style={{ color: 'rgba(0,0,0,0.6)' }}>Price per person:</span>
                        <span className="font-medium">£{workshop.price / 100}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'rgba(0,0,0,0.6)' }}>Attendees:</span>
                        <span className="font-medium">× {quantity}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-xl text-emerald">£{totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                  onSuccess={setTurnstileToken}
                />

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    disabled={submitting}
                    className="flex-1 px-6 py-3 border-2 border-emerald text-emerald rounded-lg font-semibold hover:bg-emerald/5 disabled:opacity-50"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={submitting || !turnstileToken}
                    className="flex-1 btn-copper px-6 py-3 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Processing...' : `Pay £${totalPrice} →`}
                  </button>
                </div>

                <p className="text-xs text-center mt-4" style={{ color: 'rgba(0,0,0,0.5)' }}>
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
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <BookWorkshopContent />
    </Suspense>
  )
}
