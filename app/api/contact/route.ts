import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { sanitizeInput, escapeHtml } from '@/lib/sanitize'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { verifyTurnstileToken } from '@/lib/turnstile'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  message: string
  marketingOptIn?: boolean
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Verify Turnstile token
    const turnstileValid = await verifyTurnstileToken(body.turnstileToken || '')
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Bot verification failed' },
        { status: 400 }
      )
    }

    // Sanitize all user inputs
    const firstName = sanitizeInput(body.firstName || '')
    const lastName = sanitizeInput(body.lastName || '')
    const email = sanitizeInput(body.email || '')
    const phone = sanitizeInput(body.phone || '')
    const company = sanitizeInput(body.company || '')
    const message = sanitizeInput(body.message || '')
    const marketingOptIn = body.marketingOptIn === true

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Better Wealth <onboarding@resend.dev>',
      to: 'info@better-wealth.co.uk',
      replyTo: email,
      subject: `Better Wealth Website Enquiry - ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #033A22; border-bottom: 2px solid #C4926A; padding-bottom: 10px;">
            New Website Enquiry
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">
                <strong>Name:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                ${escapeHtml(firstName)} ${escapeHtml(lastName)}
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
            ${company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">
                <strong>Company:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                ${escapeHtml(company)}
              </td>
            </tr>
            ` : ''}
          </table>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">
                <strong>Marketing Opt-in:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                ${marketingOptIn ? '&#9989; Yes — opted in to marketing emails' : '&#10060; No'}
              </td>
            </tr>
          </table>

          <div style="margin-top: 30px;">
            <h3 style="color: #033A22; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #F4F2EF; padding: 20px; border-radius: 8px; color: #333; line-height: 1.6;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </div>
          </div>

          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            This enquiry was submitted via the Better Wealth website contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Store marketing opt-in preference in newsletter_subscribers
    if (marketingOptIn) {
      const { data: existing } = await supabaseAdmin
        .from('newsletter_subscribers')
        .select('id, active')
        .eq('email', email.toLowerCase())
        .single()

      if (existing) {
        if (!existing.active) {
          await supabaseAdmin
            .from('newsletter_subscribers')
            .update({
              active: true,
              first_name: firstName || null,
              last_name: lastName || null,
              subscribed_at: new Date().toISOString(),
            })
            .eq('id', existing.id)
        }
      } else {
        await supabaseAdmin
          .from('newsletter_subscribers')
          .insert({
            email: email.toLowerCase(),
            first_name: firstName || null,
            last_name: lastName || null,
            source: 'contact_form',
            active: true,
          })
      }
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
