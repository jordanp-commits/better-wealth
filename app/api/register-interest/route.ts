import { NextResponse } from 'next/server'
import { sanitizeInput } from '@/lib/sanitize'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot: if filled, silently succeed so bots get no signal
    if (body.company) {
      return NextResponse.json({ success: true })
    }

    const first_name = sanitizeInput(body.first_name || '')
    const last_name = sanitizeInput(body.last_name || '')
    const event = sanitizeInput(body.event || '')
    const email = sanitizeInput(body.email || '')
    const phone = sanitizeInput(body.phone || '')
    const reason = sanitizeInput(body.reason || '')

    if (!first_name || !last_name || !event || !email || !reason) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('event_registrations')
      .insert({
        first_name,
        last_name,
        event,
        email,
        phone: phone || null,
        reason,
      })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save registration.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Register interest error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
