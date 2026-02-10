'use client'

import { X } from 'lucide-react'

interface CalendarModalProps {
  isOpen: boolean
  onClose: () => void
  calendarUrls: {
    google: string
    outlook: string
    office365: string
    yahoo: string
    ics: string
  }
}

export default function CalendarModal({ isOpen, onClose, calendarUrls }: CalendarModalProps) {
  if (!isOpen) return null

  const services = [
    { name: 'Google Calendar', url: calendarUrls.google, color: 'bg-[#4285F4]', hoverColor: 'hover:bg-[#3367D6]' },
    { name: 'Outlook.com', url: calendarUrls.outlook, color: 'bg-[#0078D4]', hoverColor: 'hover:bg-[#106EBE]' },
    { name: 'Office 365', url: calendarUrls.office365, color: 'bg-[#D83B01]', hoverColor: 'hover:bg-[#C43400]' },
    { name: 'Yahoo Calendar', url: calendarUrls.yahoo, color: 'bg-[#6001D2]', hoverColor: 'hover:bg-[#5001B2]' },
    { name: 'Apple Calendar / Download .ics', url: calendarUrls.ics, color: 'bg-[#333333]', hoverColor: 'hover:bg-[#444444]', isDownload: true }
  ]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="w-12 h-0.5 bg-[#C4926A] mb-4" />
          <h2 className="text-2xl font-serif font-bold text-[#033A22] mb-2">
            Add to Calendar
          </h2>
          <p className="text-gray-600 text-sm">
            Choose your preferred calendar service
          </p>
        </div>

        {/* Calendar service buttons */}
        <div className="space-y-3">
          {services.map((service) => (
            <a
              key={service.name}
              href={service.url}
              target={service.isDownload ? undefined : '_blank'}
              rel={service.isDownload ? undefined : 'noopener noreferrer'}
              className={`block w-full ${service.color} ${service.hoverColor} text-white text-center py-3 px-4 rounded-lg font-medium transition-all duration-200`}
              onClick={onClose}
            >
              {service.name}
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Selecting a service will open it in a new tab or download an .ics file
        </p>
      </div>
    </div>
  )
}
