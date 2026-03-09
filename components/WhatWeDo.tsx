'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'

const tabs = [
  {
    key: 'why',
    label: 'Why We Exist',
    content: 'There is no shortage of networking. What\'s often missing is balance. Rooms that are curated but not contrived. Ambitious, but not theatrical. Commercial, but not transactional. Better Wealth was created to build that middle ground.',
  },
  {
    key: 'membership',
    label: 'Membership',
    content: 'Membership is limited and application-based. We aim to maintain a balanced environment — established professionals alongside emerging operators with genuine ambition. Members receive access to private events, preferential workshop access, introductions where appropriate, invitations to occasional member trips, and ongoing communication within the network. Numbers are controlled carefully. Growth is deliberate.',
  },
  {
    key: 'workshops',
    label: 'Workshops',
    content: 'Workshops focus on areas including real estate investment and development, finance and lending strategy, capital structuring, business operations and expansion, and lead generation and positioning. They remain commercially grounded and sector specific. A percentage of proceeds is directed toward charities aligned with housing and financial education.',
  },
  {
    key: 'events',
    label: 'Events',
    content: 'Private, member-focused gatherings designed to encourage considered conversation and meaningful introductions.',
  },
]

const labelColor = { color: '#9d6d47' }
const mutedDark = { color: 'rgba(0,0,0,0.35)' }

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState('why')

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ backgroundColor: '#0A1F10' }}>
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-serif font-bold mt-1">
              What We Do
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
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
          <div className="max-w-2xl mx-auto text-center">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                className={`transition-opacity duration-300 ${
                  activeTab === tab.key ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <h3 className="text-white font-serif text-2xl font-bold mb-4">{tab.label}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(237,232,224,0.8)' }}>
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
