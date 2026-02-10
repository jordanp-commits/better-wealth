import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    // Retrieve the checkout session from Stripe with line items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    const metadata = session.metadata!
    const quantity = parseInt(metadata.quantity || '1')
    const paymentIntentId = session.payment_intent as string

    // Get the line item to extract unit price
    const lineItem = session.line_items?.data[0]
    const unitPrice = lineItem?.price?.unit_amount || (session.amount_total! / quantity)

    // Try to get booking details from database (if webhook has processed)
    let workshopDate = 'Details in confirmation email'
    let workshopTime = 'Details in confirmation email'
    let bookingReference = `BW-${sessionId.slice(-8).toUpperCase()}`
    let workshopName = lineItem?.description || 'Workshop'

    if (paymentIntentId) {
      const { data: booking } = await supabase
        .from('bookings')
        .select(`
          booking_reference,
          workshop_date_id,
          workshop_dates (
            date,
            time_start,
            time_end,
            workshops (
              name
            )
          )
        `)
        .eq('stripe_payment_intent_id', paymentIntentId)
        .single()

      if (booking) {
        bookingReference = booking.booking_reference
        const workshopDateData = booking.workshop_dates as any

        if (workshopDateData) {
          // Format the date nicely
          const dateObj = new Date(workshopDateData.date)
          workshopDate = dateObj.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })

          // Format the time
          const formatTime = (time: string) => {
            const [hours, minutes] = time.split(':')
            return `${hours}:${minutes}`
          }
          workshopTime = `${formatTime(workshopDateData.time_start)} - ${formatTime(workshopDateData.time_end)}`

          // Get workshop name
          if (workshopDateData.workshops) {
            workshopName = workshopDateData.workshops.name
          }
        }
      }
    }

    // Format the booking details
    const bookingDetails = {
      workshopName,
      date: workshopDate,
      time: workshopTime,
      customerName: `${metadata.firstName} ${metadata.lastName}`,
      customerEmail: session.customer_email,
      amountPaid: session.amount_total,
      unitPrice: unitPrice,
      quantity: quantity,
      bookingReference,
    }

    return NextResponse.json(bookingDetails)
  } catch (error) {
    console.error('Error retrieving booking:', error)
    return NextResponse.json({ error: 'Failed to retrieve booking' }, { status: 500 })
  }
}
