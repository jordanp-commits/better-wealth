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
  console.log('========================================')
  console.log('🔔 WEBHOOK RECEIVED at', new Date().toISOString())
  console.log('========================================')

  // Log environment variables (safely)
  console.log('📧 Environment check:')
  console.log('   RESEND_API_KEY exists?', !!process.env.RESEND_API_KEY)
  console.log('   RESEND_API_KEY prefix:', process.env.RESEND_API_KEY?.substring(0, 10) + '...')
  console.log('   RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || 'NOT SET')
  console.log('   STRIPE_WEBHOOK_SECRET exists?', !!process.env.STRIPE_WEBHOOK_SECRET)
  console.log('   SUPABASE_SERVICE_KEY exists?', !!process.env.SUPABASE_SERVICE_KEY)

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!
  console.log('📝 Signature received:', signature ? 'YES' : 'NO')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    console.log('✅ Webhook signature verified successfully')
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  console.log('📨 Event type:', event.type)
  console.log('📨 Event ID:', event.id)

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    console.log('✅ Processing checkout.session.completed event')
    const session = event.data.object as Stripe.Checkout.Session

    console.log('📋 Session metadata:', JSON.stringify(session.metadata, null, 2))
    console.log('📋 Customer email:', session.customer_email)
    console.log('📋 Amount total:', session.amount_total)

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
    console.log('🎫 Generated booking reference:', bookingReference)

    try {
      // 1. Create or get customer
      console.log('👤 Step 1: Finding or creating customer...')
      let customer
      const { data: existingCustomer, error: findError } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .single()

      if (findError) {
        console.log('   Customer not found, creating new one...')
      }

      if (existingCustomer) {
        console.log('   ✅ Existing customer found:', existingCustomer.id)
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

        if (customerError) {
          console.error('   ❌ Error creating customer:', customerError)
          throw customerError
        }
        console.log('   ✅ New customer created:', newCustomer.id)
        customer = newCustomer
      }

      // 2. Create booking with quantity
      console.log('📝 Step 2: Creating booking...')
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

      if (bookingError) {
        console.error('   ❌ Error creating booking:', bookingError)
        throw bookingError
      }
      console.log('   ✅ Booking created successfully')

      // 3. Get workshop date details and decrease seats_remaining
      console.log('📅 Step 3: Fetching workshop date details...')
      const { data: workshopDate, error: workshopError } = await supabase
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

      if (workshopError) {
        console.error('   ❌ Error fetching workshop date:', workshopError)
      }

      console.log('   Workshop date data:', JSON.stringify(workshopDate, null, 2))

      if (workshopDate) {
        const newSeatsRemaining = Math.max(0, workshopDate.seats_remaining - ticketQuantity)
        console.log('   Updating seats: ', workshopDate.seats_remaining, '->', newSeatsRemaining)

        await supabase
          .from('workshop_dates')
          .update({ seats_remaining: newSeatsRemaining })
          .eq('id', workshopDateId)

        // 4. Send confirmation emails
        console.log('========================================')
        console.log('📧 Step 4: SENDING EMAILS')
        console.log('========================================')

        const workshopInfo = workshopDate.workshops as unknown as { id: string; name: string }
        const workshopDateFormatted = new Date(workshopDate.date).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        const workshopTime = `${workshopDate.time_start} - ${workshopDate.time_end}`

        const emailData = {
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
        }

        console.log('📧 Email data:', JSON.stringify(emailData, null, 2))
        console.log('📧 Calling sendBookingConfirmationEmails...')

        try {
          const emailResult = await sendBookingConfirmationEmails(emailData)

          console.log('📧 Email result:', JSON.stringify(emailResult, null, 2))

          if (!emailResult.customerEmail.success) {
            console.error('❌ Failed to send customer email:', emailResult.customerEmail.error)
          } else {
            console.log('✅ Customer email sent successfully to:', email)
          }

          if (!emailResult.internalEmail.success) {
            console.error('❌ Failed to send internal email:', emailResult.internalEmail.error)
          } else {
            console.log('✅ Internal notification email sent successfully')
          }
        } catch (emailError) {
          console.error('❌ EXCEPTION while sending emails:', emailError)
        }
      } else {
        console.error('❌ Workshop date not found, cannot send emails!')
      }

      console.log('========================================')
      console.log(`✅ Booking complete: ${bookingReference} (${ticketQuantity} ticket${ticketQuantity > 1 ? 's' : ''})`)
      console.log('========================================')
    } catch (error) {
      console.error('❌ Error in booking process:', error)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }
  } else {
    console.log('ℹ️ Ignoring event type:', event.type)
  }

  console.log('✅ Webhook processing complete, returning 200')
  return NextResponse.json({ received: true })
}
