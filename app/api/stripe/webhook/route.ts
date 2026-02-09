import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendBookingConfirmationEmails } from '@/lib/emails'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

// Use service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const {
      workshopDateId,
      quantity,
      firstName,
      lastName,
      phone,
      company,
    } = session.metadata!

    const ticketQuantity = parseInt(quantity || '1')
    const email = session.customer_email!
    const paymentIntentId = session.payment_intent as string
    const amountPaid = session.amount_total!

    // Generate booking reference
    const bookingReference = `BW-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`

    try {
      // 1. Create or get customer
      let customer
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .single()

      if (existingCustomer) {
        customer = existingCustomer
      } else {
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert({
            email,
            first_name: firstName,
            last_name: lastName,
            phone,
            company,
          })
          .select()
          .single()

        if (customerError) throw customerError
        customer = newCustomer
      }

      // 2. Create booking with quantity
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          customer_id: customer.id,
          workshop_date_id: workshopDateId,
          stripe_payment_intent_id: paymentIntentId,
          payment_status: 'succeeded',
          amount_paid: amountPaid,
          booking_reference: bookingReference,
          quantity: ticketQuantity,
        })

      if (bookingError) throw bookingError

      // 3. Get workshop date details and decrease seats_remaining
      const { data: workshopDate } = await supabase
        .from('workshop_dates')
        .select(`
          id,
          date,
          time_start,
          time_end,
          seats_remaining,
          workshops (
            id,
            name
          )
        `)
        .eq('id', workshopDateId)
        .single()

      if (workshopDate) {
        const newSeatsRemaining = Math.max(0, workshopDate.seats_remaining - ticketQuantity)
        await supabase
          .from('workshop_dates')
          .update({ seats_remaining: newSeatsRemaining })
          .eq('id', workshopDateId)

        // 4. Send confirmation emails
        const workshopInfo = workshopDate.workshops as unknown as { id: string; name: string }
        const workshopDateFormatted = new Date(workshopDate.date).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        const workshopTime = `${workshopDate.time_start} - ${workshopDate.time_end}`

        const emailResult = await sendBookingConfirmationEmails({
          customerEmail: email,
          firstName,
          lastName,
          phone,
          company,
          workshopName: workshopInfo.name,
          workshopDate: workshopDateFormatted,
          workshopTime,
          quantity: ticketQuantity,
          amountPaid,
          bookingReference,
        })

        if (!emailResult.customerEmail.success) {
          console.error('Failed to send customer email:', emailResult.customerEmail.error)
        }
        if (!emailResult.internalEmail.success) {
          console.error('Failed to send internal email:', emailResult.internalEmail.error)
        }
      }

      console.log(`Booking created: ${bookingReference} (${ticketQuantity} ticket${ticketQuantity > 1 ? 's' : ''})`)
    } catch (error) {
      console.error('Error creating booking:', error)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
