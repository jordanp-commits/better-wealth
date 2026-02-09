import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email configuration
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Better Wealth <onboarding@resend.dev>'
const INTERNAL_EMAIL = 'info@better-wealth.co.uk'
const LOCATION = 'Cortland by Colliers Yard, Salford, Manchester'

interface BookingEmailData {
  customerEmail: string
  firstName: string
  lastName: string
  phone?: string
  company?: string
  workshopName: string
  workshopDate: string
  workshopTime: string
  quantity: number
  amountPaid: number
  bookingReference: string
}

/**
 * Generate Google Calendar link
 */
function generateCalendarLink(data: BookingEmailData): string {
  const startDate = new Date(data.workshopDate)
  const [startTime] = data.workshopTime.split(' - ')
  const [hours, minutes] = startTime.replace(/[^\d:]/g, '').split(':')
  startDate.setHours(parseInt(hours), parseInt(minutes) || 0)

  // Assume 4 hour workshop
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000)

  const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Better Wealth Workshop: ${data.workshopName}`,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: `Booking Reference: ${data.bookingReference}\nAttendees: ${data.quantity}\n\nContact: info@better-wealth.co.uk`,
    location: LOCATION,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Format currency in GBP
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount / 100) // Stripe amounts are in pence
}

/**
 * Generate customer confirmation email HTML
 */
function generateCustomerEmailHtml(data: BookingEmailData): string {
  const calendarLink = generateCalendarLink(data)

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F2EF;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F2EF; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

              <!-- Header -->
              <tr>
                <td style="background-color: #033A22; padding: 32px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Better Wealth</h1>
                  <p style="color: #C4926A; margin: 8px 0 0 0; font-size: 14px; letter-spacing: 1px;">BOOKING CONFIRMED</p>
                </td>
              </tr>

              <!-- Success Icon -->
              <tr>
                <td style="padding: 40px 32px 24px 32px; text-align: center;">
                  <div style="width: 64px; height: 64px; background-color: #033A22; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                    <span style="color: #C4926A; font-size: 32px;">✓</span>
                  </div>
                  <h2 style="color: #033A22; margin: 0 0 8px 0; font-size: 22px;">Thank You, ${data.firstName}!</h2>
                  <p style="color: #666666; margin: 0; font-size: 15px; line-height: 1.5;">Your workshop booking has been confirmed. We're looking forward to seeing you.</p>
                </td>
              </tr>

              <!-- Booking Details Card -->
              <tr>
                <td style="padding: 0 32px 32px 32px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F2EF; border-radius: 8px; overflow: hidden;">
                    <tr>
                      <td style="padding: 24px;">
                        <p style="color: #C4926A; font-size: 12px; letter-spacing: 1px; margin: 0 0 16px 0; text-transform: uppercase;">Booking Details</p>

                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                              <span style="color: #666666; font-size: 13px;">Workshop</span>
                            </td>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1); text-align: right;">
                              <strong style="color: #033A22; font-size: 14px;">${data.workshopName}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                              <span style="color: #666666; font-size: 13px;">Date</span>
                            </td>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1); text-align: right;">
                              <strong style="color: #033A22; font-size: 14px;">${data.workshopDate}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                              <span style="color: #666666; font-size: 13px;">Time</span>
                            </td>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1); text-align: right;">
                              <strong style="color: #033A22; font-size: 14px;">${data.workshopTime}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                              <span style="color: #666666; font-size: 13px;">Location</span>
                            </td>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1); text-align: right;">
                              <strong style="color: #033A22; font-size: 14px;">${LOCATION}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                              <span style="color: #666666; font-size: 13px;">Attendees</span>
                            </td>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1); text-align: right;">
                              <strong style="color: #033A22; font-size: 14px;">${data.quantity}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                              <span style="color: #666666; font-size: 13px;">Total Paid</span>
                            </td>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1); text-align: right;">
                              <strong style="color: #033A22; font-size: 14px;">${formatCurrency(data.amountPaid)}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="color: #666666; font-size: 13px;">Booking Reference</span>
                            </td>
                            <td style="padding: 8px 0; text-align: right;">
                              <strong style="color: #C4926A; font-size: 14px; font-family: monospace;">${data.bookingReference}</strong>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Add to Calendar Button -->
              <tr>
                <td style="padding: 0 32px 32px 32px; text-align: center;">
                  <a href="${calendarLink}" target="_blank" style="display: inline-block; background-color: #C4926A; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 14px; font-weight: bold;">
                    Add to Calendar
                  </a>
                </td>
              </tr>

              <!-- What to Bring Section -->
              <tr>
                <td style="padding: 0 32px 32px 32px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-left: 3px solid #C4926A; padding-left: 16px;">
                    <tr>
                      <td>
                        <h3 style="color: #033A22; margin: 0 0 8px 0; font-size: 16px;">What to Bring</h3>
                        <ul style="color: #666666; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                          <li>Laptop (fully charged)</li>
                          <li>Notebook and pen</li>
                          <li>Access to your business social media accounts</li>
                          <li>An open mind and questions!</li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Contact Info -->
              <tr>
                <td style="padding: 0 32px 32px 32px;">
                  <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                    If you have any questions before the workshop, please don't hesitate to contact us at
                    <a href="mailto:info@better-wealth.co.uk" style="color: #C4926A; text-decoration: none;">info@better-wealth.co.uk</a>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #022A18; padding: 24px 32px; text-align: center;">
                  <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 0 0 8px 0;">
                    Better Wealth | Marketing Education for Financial Services
                  </p>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} Better Wealth. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

/**
 * Generate internal notification email HTML
 */
function generateInternalEmailHtml(data: BookingEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #F4F2EF;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F2EF; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

              <!-- Header -->
              <tr>
                <td style="background-color: #033A22; padding: 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: bold;">New Workshop Booking</h1>
                </td>
              </tr>

              <!-- Summary -->
              <tr>
                <td style="padding: 32px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F2EF; border-radius: 8px; padding: 20px;">
                    <tr>
                      <td>
                        <h2 style="color: #033A22; margin: 0 0 4px 0; font-size: 18px;">${data.firstName} ${data.lastName}</h2>
                        <p style="color: #C4926A; margin: 0; font-size: 14px;">
                          ${data.quantity} ticket${data.quantity > 1 ? 's' : ''} • ${formatCurrency(data.amountPaid)}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Customer Details -->
              <tr>
                <td style="padding: 0 32px 24px 32px;">
                  <h3 style="color: #033A22; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Customer Details</h3>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; width: 120px; font-size: 13px;">Email</td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px;">
                        <a href="mailto:${data.customerEmail}" style="color: #033A22;">${data.customerEmail}</a>
                      </td>
                    </tr>
                    ${data.phone ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Phone</td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px;">${data.phone}</td>
                    </tr>
                    ` : ''}
                    ${data.company ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Company</td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px;">${data.company}</td>
                    </tr>
                    ` : ''}
                  </table>
                </td>
              </tr>

              <!-- Booking Details -->
              <tr>
                <td style="padding: 0 32px 24px 32px;">
                  <h3 style="color: #033A22; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Booking Details</h3>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; width: 120px; font-size: 13px;">Workshop</td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px; font-weight: bold;">${data.workshopName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Date</td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px;">${data.workshopDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Time</td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px;">${data.workshopTime}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Attendees</td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px;">${data.quantity}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Amount</td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-size: 13px; font-weight: bold;">${formatCurrency(data.amountPaid)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-size: 13px;">Reference</td>
                      <td style="padding: 8px 0; color: #C4926A; font-size: 13px; font-family: monospace;">${data.bookingReference}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #022A18; padding: 16px 32px; text-align: center;">
                  <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">
                    This is an automated notification from Better Wealth booking system.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

/**
 * Send booking confirmation email to customer
 */
export async function sendCustomerConfirmationEmail(data: BookingEmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.customerEmail,
      subject: `Booking Confirmed - ${data.workshopName}`,
      html: generateCustomerEmailHtml(data),
    })

    if (error) {
      console.error('Failed to send customer confirmation email:', error)
      return { success: false, error: error.message }
    }

    console.log(`Customer confirmation email sent to ${data.customerEmail}`)
    return { success: true }
  } catch (err) {
    console.error('Error sending customer confirmation email:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

/**
 * Send internal notification email
 */
export async function sendInternalNotificationEmail(data: BookingEmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: INTERNAL_EMAIL,
      replyTo: data.customerEmail,
      subject: `New Workshop Booking - ${data.firstName} ${data.lastName}`,
      html: generateInternalEmailHtml(data),
    })

    if (error) {
      console.error('Failed to send internal notification email:', error)
      return { success: false, error: error.message }
    }

    console.log(`Internal notification email sent to ${INTERNAL_EMAIL}`)
    return { success: true }
  } catch (err) {
    console.error('Error sending internal notification email:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

/**
 * Send both confirmation emails
 */
export async function sendBookingConfirmationEmails(data: BookingEmailData): Promise<{
  customerEmail: { success: boolean; error?: string }
  internalEmail: { success: boolean; error?: string }
}> {
  const [customerResult, internalResult] = await Promise.all([
    sendCustomerConfirmationEmail(data),
    sendInternalNotificationEmail(data),
  ])

  return {
    customerEmail: customerResult,
    internalEmail: internalResult,
  }
}
