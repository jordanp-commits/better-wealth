'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import CalendarModal from '@/components/CalendarModal'
import { generateCalendarUrls } from '@/lib/ics-generator'

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
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)

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
      <main className="min-h-screen" style={{ backgroundColor: '#0D2418' }}>
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-white/60">Loading your booking details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !bookingDetails) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: '#0D2418' }}>
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-serif font-bold text-white mb-4">
              Something went wrong
            </h1>
            <p className="text-white/60 mb-6">We couldn't load your booking details. Please contact us if you need assistance.</p>
            <Link href="/" className="bg-[#C4926A] text-white border border-[#C4926A] px-6 py-3 rounded-md font-medium hover:bg-transparent hover:text-[#C4926A] transition-all duration-200 inline-block">
              Return Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const pricePerPerson = bookingDetails.unitPrice / 100

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0D2418' }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-xl mx-auto">
          {/* Success Card */}
          <section aria-label="Booking confirmation" className="rounded-lg border-t-4 border-[#C4926A] shadow-2xl p-10 md:p-14 mb-8" style={{ backgroundColor: '#F5F0EB' }}>
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full border-2 border-[#C4926A] flex items-center justify-center mx-auto mb-6">
                <span className="text-[#C4926A] text-2xl">✓</span>
              </div>
              <h1 className="font-serif text-[#033A22] text-3xl md:text-4xl font-bold">
                Booking Confirmed!
              </h1>
              <p className="text-[#033A22]/60 text-sm mt-2">
                {bookingDetails.quantity > 1
                  ? `Your ${bookingDetails.quantity} spots have been reserved. Check your email for confirmation details.`
                  : 'Your spot has been reserved. Check your email for confirmation details.'}
              </p>
            </div>

            {/* Booking Details */}
            <div className="my-8">
              <p className="text-xs tracking-[0.2em] uppercase text-[#C4926A] mb-4">Booking Details</p>

              <div>
                <div className="flex justify-between border-b border-[#033A22]/8 py-3">
                  <span className="text-[#033A22]/50 text-sm">Event</span>
                  <span className="text-[#033A22] text-sm font-medium text-right">{bookingDetails.workshopName}</span>
                </div>
                <div className="flex justify-between border-b border-[#033A22]/8 py-3">
                  <span className="text-[#033A22]/50 text-sm">Date</span>
                  <span className="text-[#033A22] text-sm font-medium">{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between border-b border-[#033A22]/8 py-3">
                  <span className="text-[#033A22]/50 text-sm">Time</span>
                  <span className="text-[#033A22] text-sm font-medium">{bookingDetails.time}</span>
                </div>
                <div className="flex justify-between border-b border-[#033A22]/8 py-3">
                  <span className="text-[#033A22]/50 text-sm">Attendees</span>
                  <span className="text-[#033A22] text-sm font-medium">{bookingDetails.quantity}</span>
                </div>
                <div className="flex justify-between border-b border-[#033A22]/8 py-3">
                  <span className="text-[#033A22]/50 text-sm">Contact Name</span>
                  <span className="text-[#033A22] text-sm font-medium">{bookingDetails.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-[#033A22]/8 py-3">
                  <span className="text-[#033A22]/50 text-sm">Email</span>
                  <span className="text-[#033A22] text-sm font-medium">{bookingDetails.customerEmail}</span>
                </div>

                {/* Payment Breakdown */}
                {bookingDetails.quantity > 1 && (
                  <>
                    <div className="flex justify-between border-b border-[#033A22]/8 py-3">
                      <span className="text-[#033A22]/50 text-sm">Price per person</span>
                      <span className="text-[#033A22] text-sm font-medium">£{pricePerPerson.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#033A22]/8 py-3">
                      <span className="text-[#033A22]/50 text-sm">Quantity</span>
                      <span className="text-[#033A22] text-sm font-medium">× {bookingDetails.quantity}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between py-3">
                  <span className="text-[#033A22] font-semibold">Total Paid</span>
                  <span className="text-[#C4926A] font-serif text-xl font-bold">£{(bookingDetails.amountPaid / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Booking Reference */}
            <div className="rounded-md p-5 mb-8" style={{ backgroundColor: '#0D2418' }}>
              <p className="text-xs tracking-[0.2em] uppercase text-[#C4926A] mb-2">
                Booking Reference
              </p>
              <p className="text-white font-mono text-base font-semibold tracking-wider">
                {bookingDetails.bookingReference}
              </p>
            </div>

            {/* What's Next */}
            <div className="mb-8">
              <h3 className="font-serif text-[#033A22] text-base font-semibold mb-3">What happens next?</h3>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="text-[#C4926A] font-bold mr-2" aria-hidden="true">✓</span>
                  <span className="text-[#033A22]/70">You'll receive a confirmation email with all event details</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-[#C4926A] font-bold mr-2" aria-hidden="true">✓</span>
                  <span className="text-[#033A22]/70">We'll send you a reminder email 1 week before the event</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-[#C4926A] font-bold mr-2" aria-hidden="true">✓</span>
                  <span className="text-[#033A22]/70">You'll receive a final reminder 1 day before with directions and parking info</span>
                </li>
              </ul>
            </div>

            {/* Add to Calendar Button */}
            {bookingDetails.date && !bookingDetails.date.includes('confirmation email') && (
              <div className="mb-4">
                <button
                  onClick={() => setIsCalendarModalOpen(true)}
                  className="w-full bg-[#C4926A] text-white border border-[#C4926A] rounded-md py-3 font-medium hover:bg-transparent hover:text-[#C4926A] transition-all duration-200"
                >
                  Add to Calendar
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/workshops"
                className="text-[#033A22] border border-[#033A22]/30 rounded-md py-3 font-medium hover:border-[#C4926A] hover:text-[#C4926A] transition-all duration-200 text-center text-sm"
              >
                View All Events
              </Link>
              <Link
                href="/"
                className="bg-[#033A22] text-white border border-[#033A22] rounded-md py-3 font-medium hover:bg-[#0D2418] transition-colors duration-200 text-center text-sm"
              >
                Return Home
              </Link>
            </div>
          </section>

          {/* Calendar Modal */}
          {bookingDetails && bookingDetails.date && !bookingDetails.date.includes('confirmation email') && (
            <CalendarModal
              isOpen={isCalendarModalOpen}
              onClose={() => setIsCalendarModalOpen(false)}
              calendarUrls={generateCalendarUrls({
                workshopName: bookingDetails.workshopName,
                workshopDate: bookingDetails.date,
                workshopTime: bookingDetails.time,
                location: 'Cortland by Colliers Yard, Salford, Manchester',
                bookingReference: bookingDetails.bookingReference,
                baseUrl: typeof window !== 'undefined' ? window.location.origin : 'https://better-wealth.co.uk',
              })}
            />
          )}

          {/* Help Section */}
          <div className="text-center text-sm">
            <p className="text-white/50">Questions about your booking?</p>
            <Link href="/contact" className="text-[#C4926A] hover:text-[#C4926A]/80 transition-colors duration-200">
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
      <main className="min-h-screen" style={{ backgroundColor: '#0D2418' }}>
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-white/60">Loading your booking details...</p>
          </div>
        </div>
      </main>
    }>
      <BookingConfirmationContent />
    </Suspense>
  )
}
