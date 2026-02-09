import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()
    const { firstName, lastName, email, phone, company, message } = body

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
      subject: `Better Wealth Website Enquiry - ${firstName} ${lastName}`,
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
                ${firstName} ${lastName}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">
                <strong>Email:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                <a href="mailto:${email}" style="color: #033A22;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">
                <strong>Phone:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                ${phone}
              </td>
            </tr>
            ` : ''}
            ${company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">
                <strong>Company:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                ${company}
              </td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 30px;">
            <h3 style="color: #033A22; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #F4F2EF; padding: 20px; border-radius: 8px; color: #333; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
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

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
