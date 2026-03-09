'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type WorkshopDate = {
  id: string
  date: string
  time_start: string
  time_end: string
  seats_remaining: number
}

type WorkshopDatesProps = {
  workshopSlug: string
  bookingPath: string
  variant?: 'light' | 'dark'
}

export default function WorkshopDates({ workshopSlug, bookingPath, variant = 'light' }: WorkshopDatesProps) {
  const isDark = variant === 'dark'
  const [dates, setDates] = useState<WorkshopDate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDates() {
      try {
        // First get the workshop ID
        const { data: workshop, error: workshopError } = await supabase
          .from('workshops')
          .select('id')
          .eq('slug', workshopSlug)
          .single()

        if (workshopError) throw workshopError

        // Then fetch upcoming available dates
        const today = new Date().toISOString().split('T')[0]
        const { data: datesData, error: datesError } = await supabase
          .from('workshop_dates')
          .select('*')
          .eq('workshop_id', workshop.id)
          .gte('date', today)
          .gt('seats_remaining', 0)
          .order('date', { ascending: true })

        if (datesError) throw datesError

        setDates(datesData || [])
      } catch (error) {
        console.error('Error fetching dates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDates()
  }, [workshopSlug])

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`border-2 rounded-xl p-5 animate-pulse ${isDark ? 'bg-white/5' : 'bg-white'}`}
            style={{ borderColor: isDark ? 'rgba(196,146,106,0.15)' : 'rgba(196, 146, 106, 0.2)' }}
          >
            <div className={`h-5 rounded w-1/2 mb-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`h-4 rounded w-1/3 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
          </div>
        ))}
      </div>
    )
  }

  if (dates.length === 0) {
    if (isDark) {
      return (
        <div className="border border-white/10 rounded-md p-4 text-center bg-white/5">
          <p className="text-white/40 text-sm italic">No dates currently available</p>
          <p className="text-white/25 text-xs mt-1">Check back soon</p>
        </div>
      )
    }
    return (
      <p className="text-sm italic" style={{ color: 'rgba(0,0,0,0.5)' }}>
        No dates currently available. Please check back soon.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {dates.map((item) => {
        const formattedDate = new Date(item.date + 'T00:00:00').toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
        const timeDisplay = `${item.time_start.slice(0, 5)} - ${item.time_end.slice(0, 5)}`

        return (
          <Link
            href={`${bookingPath}?date_id=${item.id}`}
            className="block"
            key={item.id}
          >
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white border-2 rounded-xl p-5 hover:border-emerald hover:shadow-lg'}`}
              style={isDark ? undefined : { borderColor: 'rgba(196, 146, 106, 0.2)' }}
            >
              <div>
                <p className={`text-sm font-serif font-bold ${isDark ? 'text-white' : 'text-emerald'}`}>{formattedDate}</p>
                <p className={`text-sm mt-1 ${isDark ? 'text-white/50' : ''}`} style={isDark ? undefined : { color: 'rgba(0,0,0,0.5)' }}>{timeDisplay}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium" style={{ color: '#C4926A' }}>
                  {item.seats_remaining} {item.seats_remaining === 1 ? 'spot' : 'spots'} left
                </span>
                <span style={{ color: '#C4926A' }} aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
