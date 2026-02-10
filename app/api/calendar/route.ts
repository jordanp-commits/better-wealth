import { NextRequest, NextResponse } from 'next/server'
import { generateICS } from '@/lib/ics-generator'

const LOCATION = 'Cortland by Colliers Yard, Salford, Manchester'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const workshopName = searchParams.get('workshop') || 'Better Wealth Workshop'
  const workshopDate = searchParams.get('date') || ''
  const workshopTime = searchParams.get('time') || '09:00 - 13:00'
  const location = searchParams.get('location') || LOCATION
  const bookingReference = searchParams.get('ref') || `BW-${Date.now()}`

  if (!workshopDate) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 })
  }

  try {
    const icsContent = generateICS({
      workshopName,
      workshopDate,
      workshopTime,
      location,
      bookingReference,
    })

    // Create a safe filename
    const safeRef = bookingReference.replace(/[^a-zA-Z0-9-]/g, '')
    const filename = `better-wealth-workshop-${safeRef}.ics`

    return new NextResponse(icsContent, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating ICS:', error)
    return NextResponse.json({ error: 'Failed to generate calendar file' }, { status: 500 })
  }
}
