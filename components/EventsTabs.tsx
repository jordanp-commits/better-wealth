'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'

const tabs = [
  {
    key: 'workshops',
    label: 'Workshops',
    content: 'Workshops run regularly and are open to both members and non-members. They remain focused on property, financial services and commercially relevant growth topics. Delivery partners are selected carefully and aligned with the standards of the platform.',
  },
  {
    key: 'trips',
    label: 'Member Trips',
    content: 'From time to time, members are invited to join smaller, invitation-only trips. These are relationship-led and considered in scale.',
  },
]

export default function EventsTabs() {
  const [activeTab, setActiveTab] = useState('workshops')

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#0A1F10' }}>
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          {/* Tabs */}
          <div className="flex flex-col md:flex-row justify-center mb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-base font-medium transition-all duration-200 -mb-px ${
                  activeTab === tab.key
                    ? 'text-[#C4926A]'
                    : 'text-white/40 hover:text-[#C4926A]/70'
                }`}
                style={activeTab === tab.key ? { borderBottom: '2px solid #C4926A' } : { borderBottom: '2px solid transparent' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="max-w-[800px] mx-auto text-center">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                className={`transition-opacity duration-300 ${
                  activeTab === tab.key ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <h2 className="text-white font-serif text-2xl font-bold mb-4">{tab.label}</h2>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(237,232,224,0.75)' }}>
                  {tab.content}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
