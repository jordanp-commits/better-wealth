'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

type BookingDetails = {
  workshopName: string
  date: string
  time: string
  customerName: string
  customerEmail: string
  amountPaid: number
  unitPrice: number
  quantity: number
  bookingReference: string
}

function BookingConfirmationContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (sessionId) {
      fetchBookingDetails()
    }
  }, [sessionId])

  async function fetchBookingDetails() {
    try {
      const response = await fetch(`/api/booking-details?session_id=${sessionId}`)

      if (!response.ok) throw new Error('Failed to fetch booking')

      const data = await response.json()
      setBookingDetails(data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching booking:', err)
      setError(true)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p>Loading your booking details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !bookingDetails) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-serif font-bold text-emerald mb-4">
              Something went wrong
            </h1>
            <p className="mb-6">We couldn't load your booking details. Please contact us if you need assistance.</p>
            <Link href="/" className="btn-copper px-6 py-3 text-white rounded-lg font-semibold inline-block">
              Return Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const pricePerPerson = bookingDetails.unitPrice / 100

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(3, 58, 34, 0.1)' }}
              >
                <svg className="w-8 h-8" style={{ color: '#033A22' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-serif font-bold text-emerald mb-2">
                Booking Confirmed!
              </h1>
              <p style={{ color: 'rgba(0,0,0,0.6)' }}>
                {bookingDetails.quantity > 1
                  ? `Your ${bookingDetails.quantity} spots have been reserved. Check your email for confirmation details.`
                  : 'Your spot has been reserved. Check your email for confirmation details.'}
              </p>
            </div>

            {/* Booking Details */}
            <div className="border-t border-b py-6 my-6" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <h2 className="font-medium text-emerald mb-4">Booking Details</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'rgba(0,0,0,0.6)' }}>Workshop:</span>
                  <span className="font-medium text-right">{bookingDetails.workshopName}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgba(0,0,0,0.6)' }}>Date:</span>
                  <span className="font-medium">{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgba(0,0,0,0.6)' }}>Time:</span>
                  <span className="font-medium">{bookingDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgba(0,0,0,0.6)' }}>Attendees:</span>
                  <span className="font-medium">{bookingDetails.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgba(0,0,0,0.6)' }}>Contact Name:</span>
                  <span className="font-medium">{bookingDetails.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgba(0,0,0,0.6)' }}>Email:</span>
                  <span className="font-medium">{bookingDetails.customerEmail}</span>
                </div>

                {/* Payment Breakdown */}
                <div className="pt-3 border-t space-y-2" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                  {bookingDetails.quantity > 1 && (
                    <>
                      <div className="flex justify-between">
                        <span style={{ color: 'rgba(0,0,0,0.6)' }}>Price per person:</span>
                        <span className="font-medium">£{pricePerPerson.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'rgba(0,0,0,0.6)' }}>Quantity:</span>
                        <span className="font-medium">× {bookingDetails.quantity}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between pt-2 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                    <span className="font-medium">Total Paid:</span>
                    <span className="font-bold text-lg text-emerald">£{(bookingDetails.amountPaid / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Reference */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#C4926A' }}>
                Booking Reference
              </p>
              <p className="font-mono text-lg font-bold text-emerald">
                {bookingDetails.bookingReference}
              </p>
            </div>

            {/* What's Next */}
            <div className="mb-6">
              <h3 className="font-medium text-emerald mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(0,0,0,0.7)' }}>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>You'll receive a confirmation email with all workshop details</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>We'll send you a reminder email 1 week before the workshop</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>You'll receive a final reminder 1 day before with directions and parking info</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Link
                href="/workshops"
                className="flex-1 px-6 py-3 border-2 border-emerald text-emerald rounded-lg font-semibold hover:bg-emerald/5 text-center"
              >
                View All Workshops
              </Link>
              <Link
                href="/"
                className="flex-1 btn-copper px-6 py-3 text-white rounded-lg font-semibold text-center"
              >
                Return Home
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="text-center text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>
            <p>Questions about your booking?</p>
            <Link href="/contact" className="underline" style={{ color: '#C4926A' }}>
              Contact us for assistance
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

// Wrap in Suspense for useSearchParams
export default function BookingConfirmation() {
  return (
    <Suspense fallback={
      <main className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p>Loading your booking details...</p>
          </div>
        </div>
      </main>
    }>
      <BookingConfirmationContent />
    </Suspense>
  )
}
