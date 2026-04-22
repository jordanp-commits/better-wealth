import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Parse .env.local manually (no dotenv dependency)
const envFile = readFileSync('.env.local', 'utf-8')
const env: Record<string, string> = {}
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) env[match[1].trim()] = match[2].trim()
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = env.SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedDates() {
  // Get workshop IDs by slug
  const { data: workshops, error: workshopError } = await supabase
    .from('workshops')
    .select('id, slug')
    .in('slug', ['paid-advertising', 'entering-financial-services'])

  if (workshopError) {
    console.error('Error fetching workshops:', workshopError)
    process.exit(1)
  }

  if (!workshops || workshops.length === 0) {
    console.error('No workshops found. Make sure the workshops table has entries with slugs "paid-advertising" and "entering-financial-services".')
    process.exit(1)
  }

  console.log('Found workshops:', workshops.map(w => `${w.slug} (${w.id})`).join(', '))

  const paidAd = workshops.find(w => w.slug === 'paid-advertising')
  const enteringFS = workshops.find(w => w.slug === 'entering-financial-services')

  const datesToInsert = []

  if (paidAd) {
    datesToInsert.push({
      workshop_id: paidAd.id,
      date: '2026-03-22',
      time_start: '09:00:00',
      time_end: '13:00:00',
      seats_remaining: 20,
    })
  } else {
    console.warn('Workshop "paid-advertising" not found, skipping.')
  }

  if (enteringFS) {
    datesToInsert.push({
      workshop_id: enteringFS.id,
      date: '2026-03-22',
      time_start: '14:00:00',
      time_end: '18:00:00',
      seats_remaining: 20,
    })
  } else {
    console.warn('Workshop "entering-financial-services" not found, skipping.')
  }

  if (datesToInsert.length === 0) {
    console.error('No dates to insert.')
    process.exit(1)
  }

  const { data, error } = await supabase
    .from('workshop_dates')
    .insert(datesToInsert)
    .select()

  if (error) {
    console.error('Error inserting dates:', error)
    process.exit(1)
  }

  console.log(`Successfully inserted ${data.length} workshop date(s):`)
  data.forEach(d => {
    console.log(`  - ${d.date} ${d.time_start}-${d.time_end} (ID: ${d.id}, seats: ${d.seats_remaining})`)
  })
}

seedDates()
