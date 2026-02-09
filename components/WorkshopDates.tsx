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
}

export default function WorkshopDates({ workshopSlug, bookingPath }: WorkshopDatesProps) {
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

        // Then fetch available dates
        const { data: datesData, error: datesError } = await supabase
          .from('workshop_dates')
          .select('*')
          .eq('workshop_id', workshop.id)
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
            className="bg-white border-2 rounded-xl p-5 animate-pulse"
            style={{ borderColor: 'rgba(196, 146, 106, 0.2)' }}
          >
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  if (dates.length === 0) {
    return (
      <div
        className="bg-white border-2 rounded-xl p-5 text-center"
        style={{ borderColor: 'rgba(196, 146, 106, 0.2)' }}
      >
        <p className="text-sm" style={{ color: 'rgba(0,0,0,0.5)' }}>
          No dates currently available. Please check back soon.
        </p>
      </div>
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
              className="bg-white border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-emerald hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: 'rgba(196, 146, 106, 0.2)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-serif font-bold text-emerald">{formattedDate}</p>
                  <p className="text-sm mt-1" style={{ color: 'rgba(0,0,0,0.5)' }}>{timeDisplay}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium" style={{ color: '#C4926A' }}>
                    {item.seats_remaining} {item.seats_remaining === 1 ? 'spot' : 'spots'} left
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(196, 146, 106, 0.1)' }}
                  >
                    <span style={{ color: '#C4926A' }}>→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
