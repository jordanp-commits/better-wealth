export interface ICSParams {
  workshopName: string
  workshopDate: string // "Saturday, 14 March 2026"
  workshopTime: string // "09:00:00 - 13:00:00"
  location: string
  bookingReference: string
}

export function generateICS(params: ICSParams): string {
  const { workshopName, workshopDate, workshopTime, location, bookingReference } = params

  // Parse the workshop time
  const [startTime, endTime] = workshopTime.split(' - ')

  // Parse the date string (e.g., "Saturday, 14 March 2026")
  const eventDate = new Date(workshopDate)

  // Create start datetime
  const [startHours, startMinutes] = startTime.split(':')
  const startDateTime = new Date(eventDate)
  startDateTime.setHours(parseInt(startHours), parseInt(startMinutes || '0'), 0, 0)

  // Create end datetime
  let endDateTime: Date
  if (endTime) {
    const [endHours, endMinutes] = endTime.split(':')
    endDateTime = new Date(eventDate)
    endDateTime.setHours(parseInt(endHours), parseInt(endMinutes || '0'), 0, 0)
  } else {
    // Default to 4 hours if no end time specified
    endDateTime = new Date(startDateTime)
    endDateTime.setHours(startDateTime.getHours() + 4)
  }

  // Format for ICS (YYYYMMDDTHHMMSS) - use local time format without Z suffix
  const formatICSDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}T${hours}${minutes}${seconds}`
  }

  // Format for DTSTAMP (needs to be UTC)
  const formatUTCDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  // Escape special characters for ICS format
  const escapeICS = (str: string): string => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n')
  }

  const description = [
    'Better Wealth Workshop',
    '',
    `Booking Reference: ${bookingReference}`,
    '',
    'What to Bring:',
    '- Laptop (fully charged)',
    '- Notebook and pen',
    '- Access to your business social media accounts',
    '- An open mind and questions!',
    '',
    'Contact: info@better-wealth.co.uk'
  ].join('\\n')

  const uid = `${bookingReference}-${Date.now()}@better-wealth.co.uk`

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Better Wealth//Workshop Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Better Wealth Workshop',
    'BEGIN:VTIMEZONE',
    'TZID:Europe/London',
    'BEGIN:DAYLIGHT',
    'TZOFFSETFROM:+0000',
    'TZOFFSETTO:+0100',
    'TZNAME:BST',
    'DTSTART:19700329T010000',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
    'END:DAYLIGHT',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0000',
    'TZNAME:GMT',
    'DTSTART:19701025T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `DTSTART;TZID=Europe/London:${formatICSDate(startDateTime)}`,
    `DTEND;TZID=Europe/London:${formatICSDate(endDateTime)}`,
    `DTSTAMP:${formatUTCDate(new Date())}`,
    `UID:${uid}`,
    `SUMMARY:${escapeICS(workshopName)}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${escapeICS(location)}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'DESCRIPTION:Workshop tomorrow - Better Wealth',
    'ACTION:DISPLAY',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'DESCRIPTION:Workshop starts in 2 hours',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ]

  return icsLines.join('\r\n')
}

export interface CalendarUrlParams {
  workshopName: string
  workshopDate: string
  workshopTime: string
  location: string
  bookingReference: string
  baseUrl: string
}

export interface CalendarUrls {
  google: string
  outlook: string
  office365: string
  yahoo: string
  ics: string
}

/**
 * Generate URLs for all major calendar services
 */
export function generateCalendarUrls(params: CalendarUrlParams): CalendarUrls {
  const { workshopName, workshopDate, workshopTime, location, bookingReference, baseUrl } = params

  // Parse dates
  const [startTime, endTime] = workshopTime.split(' - ')
  const eventDate = new Date(workshopDate)
  const [startHours, startMinutes] = startTime.split(':')
  const [endHours, endMinutes] = (endTime || '13:00').split(':')

  const startDateTime = new Date(eventDate)
  startDateTime.setHours(parseInt(startHours), parseInt(startMinutes || '0'), 0, 0)

  const endDateTime = new Date(eventDate)
  endDateTime.setHours(parseInt(endHours), parseInt(endMinutes || '0'), 0, 0)

  // Format for Google/Yahoo (YYYYMMDDTHHMMSS)
  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}${month}${day}T${hours}${minutes}00`
  }

  const description = `Better Wealth Workshop\n\nBooking Reference: ${bookingReference}\n\nWhat to Bring:\n- Laptop (fully charged)\n- Notebook and pen\n- Access to your business social media accounts\n- An open mind and questions!`

  // Google Calendar URL
  const googleParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: workshopName,
    dates: `${formatDateTime(startDateTime)}/${formatDateTime(endDateTime)}`,
    details: description,
    location: location,
    ctz: 'Europe/London',
  })
  const google = `https://calendar.google.com/calendar/render?${googleParams.toString()}`

  // Outlook.com URL
  const outlookParams = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: workshopName,
    startdt: startDateTime.toISOString(),
    enddt: endDateTime.toISOString(),
    body: description,
    location: location,
  })
  const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?${outlookParams.toString()}`

  // Office 365 URL
  const office365Params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: workshopName,
    startdt: startDateTime.toISOString(),
    enddt: endDateTime.toISOString(),
    body: description,
    location: location,
  })
  const office365 = `https://outlook.office.com/calendar/0/deeplink/compose?${office365Params.toString()}`

  // Yahoo Calendar URL
  const yahooParams = new URLSearchParams({
    v: '60',
    title: workshopName,
    st: formatDateTime(startDateTime),
    et: formatDateTime(endDateTime),
    desc: description,
    in_loc: location,
  })
  const yahoo = `https://calendar.yahoo.com/?${yahooParams.toString()}`

  // ICS Download URL
  const icsParams = new URLSearchParams({
    workshop: workshopName,
    date: workshopDate,
    time: workshopTime,
    location: location,
    ref: bookingReference,
  })
  const ics = `${baseUrl}/api/calendar?${icsParams.toString()}`

  return { google, outlook, office365, yahoo, ics }
}
