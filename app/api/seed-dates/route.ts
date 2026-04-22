import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// Temporary endpoint to seed workshop dates — DELETE after use
export async function GET() {
  try {
    // Get workshop IDs by slug
    const { data: workshops, error: workshopError } = await supabaseAdmin
      .from('workshops')
      .select('id, slug, name')
      .in('slug', ['paid-advertising', 'entering-financial-services'])

    if (workshopError) {
      return NextResponse.json({ error: 'Failed to fetch workshops', details: workshopError }, { status: 500 })
    }

    if (!workshops || workshops.length === 0) {
      return NextResponse.json({ error: 'No workshops found with those slugs' }, { status: 404 })
    }

    const paidAd = workshops.find(w => w.slug === 'paid-advertising')
    const enteringFS = workshops.find(w => w.slug === 'entering-financial-services')

    // Check what dates already exist for these workshops
    const workshopIds = workshops.map(w => w.id)
    const { data: existingDates } = await supabaseAdmin
      .from('workshop_dates')
      .select('*')
      .in('workshop_id', workshopIds)
      .order('date', { ascending: true })

    const hasDate = (workshopId: string | undefined, date: string) =>
      !!workshopId && existingDates?.some(d => d.date === date && d.workshop_id === workshopId)

    const datesToInsert = []

    if (paidAd && !hasDate(paidAd.id, '2026-03-22')) {
      datesToInsert.push({
        workshop_id: paidAd.id,
        date: '2026-03-22',
        time_start: '09:00:00',
        time_end: '13:00:00',
        location: 'Cortland by Colliers Yard, Salford, Manchester',
        seats_remaining: 20,
      })
    }

    if (paidAd && !hasDate(paidAd.id, '2026-05-15')) {
      datesToInsert.push({
        workshop_id: paidAd.id,
        date: '2026-05-15',
        time_start: '10:00:00',
        time_end: '13:00:00',
        location: 'Cortland by Colliers Yard, Salford, Manchester',
        seats_remaining: 20,
      })
    }

    if (enteringFS && !hasDate(enteringFS.id, '2026-03-22')) {
      datesToInsert.push({
        workshop_id: enteringFS.id,
        date: '2026-03-22',
        time_start: '14:00:00',
        time_end: '18:00:00',
        location: 'Cortland by Colliers Yard, Salford, Manchester',
        seats_remaining: 20,
      })
    }

    let inserted = null
    if (datesToInsert.length > 0) {
      const { data, error } = await supabaseAdmin
        .from('workshop_dates')
        .insert(datesToInsert)
        .select()

      if (error) {
        return NextResponse.json({ error: 'Failed to insert dates', details: error }, { status: 500 })
      }
      inserted = data
    }

    // Re-fetch all dates to show current state
    const { data: allDates } = await supabaseAdmin
      .from('workshop_dates')
      .select('*')
      .in('workshop_id', workshopIds)
      .order('date', { ascending: true })

    return NextResponse.json({
      workshops: workshops.map(w => ({ id: w.id, slug: w.slug, name: w.name })),
      inserted: inserted ? `Inserted ${inserted.length} new date(s)` : 'No new dates needed (already exist)',
      allDatesForTheseWorkshops: allDates,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error', details: String(err) }, { status: 500 })
  }
}
