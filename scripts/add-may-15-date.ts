import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const envFile = readFileSync('.env.local', 'utf-8')
const env: Record<string, string> = {}
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) env[match[1].trim()] = match[2].trim()
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_KEY)

const NEW_DATE = {
  slug: 'paid-advertising',
  date: '2026-05-15',
  time_start: '10:00:00',
  time_end: '13:00:00',
  location: 'Cortland by Colliers Yard, Salford, Manchester',
  seats_remaining: 20,
}

async function run() {
  const { data: workshop, error: workshopError } = await supabase
    .from('workshops')
    .select('id, slug, name')
    .eq('slug', NEW_DATE.slug)
    .single()

  if (workshopError || !workshop) {
    console.error(`Workshop "${NEW_DATE.slug}" not found`, workshopError)
    process.exit(1)
  }

  console.log(`Found workshop: ${workshop.name} (${workshop.id})`)

  const { data: existing } = await supabase
    .from('workshop_dates')
    .select('*')
    .eq('workshop_id', workshop.id)
    .eq('date', NEW_DATE.date)

  if (existing && existing.length > 0) {
    console.log(`Date ${NEW_DATE.date} already exists — skipping insert:`)
    existing.forEach(d => console.log(`  - id=${d.id} ${d.date} ${d.time_start}-${d.time_end} seats=${d.seats_remaining}`))
    return
  }

  const { data: inserted, error: insertError } = await supabase
    .from('workshop_dates')
    .insert([{
      workshop_id: workshop.id,
      date: NEW_DATE.date,
      time_start: NEW_DATE.time_start,
      time_end: NEW_DATE.time_end,
      location: NEW_DATE.location,
      seats_remaining: NEW_DATE.seats_remaining,
    }])
    .select()

  if (insertError) {
    console.error('Insert failed:', insertError)
    process.exit(1)
  }

  console.log('Inserted:')
  inserted?.forEach(d => console.log(`  - id=${d.id} ${d.date} ${d.time_start}-${d.time_end} seats=${d.seats_remaining} location="${d.location}"`))
}

run()
