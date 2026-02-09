import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

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

    // Get the line item to extract unit price
    const lineItem = session.line_items?.data[0]
    const unitPrice = lineItem?.price?.unit_amount || (session.amount_total! / quantity)

    // Format the booking details
    const bookingDetails = {
      workshopName: lineItem?.description || 'Workshop',
      date: 'Details in confirmation email', // We'll improve this later with webhook
      time: 'Details in confirmation email',
      customerName: `${metadata.firstName} ${metadata.lastName}`,
      customerEmail: session.customer_email,
      amountPaid: session.amount_total,
      unitPrice: unitPrice,
      quantity: quantity,
      bookingReference: `BW-${sessionId.slice(-8).toUpperCase()}`, // Temporary reference
    }

    return NextResponse.json(bookingDetails)
  } catch (error) {
    console.error('Error retrieving booking:', error)
    return NextResponse.json({ error: 'Failed to retrieve booking' }, { status: 500 })
  }
}
