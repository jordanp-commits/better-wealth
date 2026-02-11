import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { sanitizeInput } from '@/lib/sanitize'
import { verifyTurnstileToken } from '@/lib/turnstile'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Verify Turnstile token
    const turnstileValid = await verifyTurnstileToken(body.turnstileToken || '')
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Bot verification failed' },
        { status: 400 }
      )
    }

    const workshopDateId = body.workshopDateId
    const quantity = body.quantity ?? 1
    const firstName = sanitizeInput(body.firstName || '')
    const lastName = sanitizeInput(body.lastName || '')
    const email = sanitizeInput(body.email || '')
    const phone = sanitizeInput(body.phone || '')
    const company = sanitizeInput(body.company || '')

    // Validate quantity
    const ticketQuantity = Math.max(1, Math.min(parseInt(quantity) || 1, 15))

    // Fetch workshop date details
    const { data: workshopDate, error: dateError } = await supabase
      .from('workshop_dates')
      .select(`
        *,
        workshops (
          id,
          name,
          slug,
          price
        )
      `)
      .eq('id', workshopDateId)
      .single()

    if (dateError || !workshopDate) {
      return NextResponse.json({ error: 'Workshop date not found' }, { status: 404 })
    }

    // Check availability - ensure enough seats for requested quantity
    if (workshopDate.seats_remaining < ticketQuantity) {
      return NextResponse.json(
        { error: `Only ${workshopDate.seats_remaining} spots remaining. Please reduce your quantity.` },
        { status: 400 }
      )
    }

    const workshop = workshopDate.workshops as any

    // Create Stripe checkout session with quantity
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: workshop.name,
              description: `Workshop on ${new Date(workshopDate.date + 'T00:00:00').toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })} at ${workshopDate.time_start.slice(0, 5)}`,
            },
            unit_amount: workshop.price, // Price per person in pence (12500 = £125.00)
          },
          quantity: ticketQuantity, // Stripe will calculate total = unit_amount * quantity
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/workshops/${workshop.slug}/book`,
      customer_email: email,
      metadata: {
        workshopDateId,
        quantity: ticketQuantity.toString(),
        firstName,
        lastName,
        phone,
        company: company || '',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
