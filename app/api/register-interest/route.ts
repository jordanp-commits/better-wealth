import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { sanitizeInput, escapeHtml } from '@/lib/sanitize'
import { supabaseAdmin } from '@/lib/supabase-admin'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const marketing_opt_in = body.marketing_opt_in === true

    if (!first_name || !last_name || !event || !email || !reason) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Phone validation (if provided)
    if (phone) {
      const digitsOnly = phone.replace(/[\s\-\(\)\.]/g, '')
      if (!/^\+?\d{7,15}$/.test(digitsOnly)) {
        return NextResponse.json(
          { error: 'Please provide a valid phone number.' },
          { status: 400 }
        )
      }
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
        marketing_opt_in,
      })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save registration.' },
        { status: 500 }
      )
    }

    // Send notification email to the team
    const { error: emailError } = await resend.emails.send({
      from: 'Better Wealth <onboarding@resend.dev>',
      to: 'info@better-wealth.co.uk',
      replyTo: email,
      subject: `Event Registration — ${escapeHtml(first_name)} ${escapeHtml(last_name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #033A22; border-bottom: 2px solid #C4926A; padding-bottom: 10px;">
            New Event Registration
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">
                <strong>Name:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                ${escapeHtml(first_name)} ${escapeHtml(last_name)}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">
                <strong>Event:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                ${escapeHtml(event)}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">
                <strong>Email:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                <a href="mailto:${escapeHtml(email)}" style="color: #033A22;">${escapeHtml(email)}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">
                <strong>Phone:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                ${escapeHtml(phone)}
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">
                <strong>Marketing opt-in:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                ${marketing_opt_in ? '&#9989; Yes' : '&#10060; No'}
              </td>
            </tr>
          </table>

          <div style="margin-top: 30px;">
            <h3 style="color: #033A22; margin-bottom: 10px;">Reason for wanting to attend:</h3>
            <div style="background-color: #F4F2EF; padding: 20px; border-radius: 8px; color: #333; line-height: 1.6;">
              ${escapeHtml(reason).replace(/\n/g, '<br>')}
            </div>
          </div>

          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            This registration was submitted via the Better Wealth events page.
          </p>
        </div>
      `,
    })

    if (emailError) {
      console.error('Resend email error:', emailError)
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
