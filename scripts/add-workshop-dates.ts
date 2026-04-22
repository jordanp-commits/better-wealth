import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const envFile = readFileSync('.env.local', 'utf-8')
const env: Record<string, string> = {}
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) env[match[1].trim()] = match[2].trim()
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_KEY)

const LOCATION = 'Cortland by Colliers Yard, Salford, Manchester'

const DATES = [
  { slug: 'paid-advertising',            date: '2026-05-08', time_start: '10:00:00', time_end: '13:00:00', seats_remaining: 20 },
  { slug: 'paid-advertising',            date: '2026-05-15', time_start: '10:00:00', time_end: '13:00:00', seats_remaining: 20 },
  { slug: 'entering-financial-services', date: '2026-05-19', time_start: '10:00:00', time_end: '13:00:00', seats_remaining: 20 },
]

async function run() {
  const slugs = Array.from(new Set(DATES.map(d => d.slug)))

  const { data: workshops, error: workshopError } = await supabase
    .from('workshops')
    .select('id, slug, name')
    .in('slug', slugs)

  if (workshopError || !workshops || workshops.length === 0) {
    console.error('Failed to fetch workshops', workshopError)
    process.exit(1)
  }

  const bySlug = new Map(workshops.map(w => [w.slug, w]))
  for (const slug of slugs) {
    if (!bySlug.has(slug)) {
      console.error(`Workshop "${slug}" not found in DB`)
      process.exit(1)
    }
  }

  const workshopIds = Array.from(bySlug.values()).map(w => w.id)
  const { data: existing } = await supabase
    .from('workshop_dates')
    .select('workshop_id, date')
    .in('workshop_id', workshopIds)

  const exists = new Set((existing ?? []).map(d => `${d.workshop_id}|${d.date}`))

  const toInsert = []
  const skipped: string[] = []

  for (const d of DATES) {
    const workshop = bySlug.get(d.slug)!
    const key = `${workshop.id}|${d.date}`
    if (exists.has(key)) {
      skipped.push(`${workshop.name} · ${d.date}`)
      continue
    }
    toInsert.push({
      workshop_id: workshop.id,
      date: d.date,
      time_start: d.time_start,
      time_end: d.time_end,
      location: LOCATION,
      seats_remaining: d.seats_remaining,
    })
  }

  if (skipped.length > 0) {
    console.log(`Skipped (already exist): ${skipped.length}`)
    skipped.forEach(s => console.log(`  - ${s}`))
  }

  if (toInsert.length === 0) {
    console.log('Nothing to insert.')
    return
  }

  const { data: inserted, error: insertError } = await supabase
    .from('workshop_dates')
    .insert(toInsert)
    .select()

  if (insertError) {
    console.error('Insert failed:', insertError)
    process.exit(1)
  }

  console.log(`Inserted ${inserted?.length ?? 0} new date(s):`)
  inserted?.forEach(d => console.log(`  - id=${d.id} workshop=${d.workshop_id} ${d.date} ${d.time_start}-${d.time_end} seats=${d.seats_remaining}`))
}

run()
