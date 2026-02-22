import { NextResponse } from 'next/server'
import { sanitizeInput } from '@/lib/sanitize'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendWaitlistConfirmation, sendWaitlistNotification } from '@/lib/emails'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Sanitize all user inputs
    const firstName = sanitizeInput(body.firstName || '')
    const lastName = sanitizeInput(body.lastName || '')
    const email = sanitizeInput(body.email || '').toLowerCase()
    const phone = sanitizeInput(body.phone || '')
    const company = sanitizeInput(body.company || '')
    const whyJoin = sanitizeInput(body.whyJoin || '')

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !whyJoin) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('waitlist_applications')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        company: company || null,
        why_join: whyJoin,
      })

    if (dbError) {
      // Handle duplicate email
      if (dbError.code === '23505') {
        return NextResponse.json(
          { error: 'This email has already been submitted' },
          { status: 409 }
        )
      }
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    // Send emails (non-blocking — don't fail the request if emails fail)
    const applicationData = { firstName, lastName, email, phone, company, whyJoin }

    await Promise.allSettled([
      sendWaitlistConfirmation(email, firstName),
      sendWaitlistNotification(applicationData),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
