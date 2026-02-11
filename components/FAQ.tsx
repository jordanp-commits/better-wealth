'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'

const faqs = [
  {
    question: "Who are Better Wealth workshops designed for?",
    answer: "Our workshops are built for ambitious professionals in financial services and real estate—mortgage advisors, financial planners, estate agents, wealth managers, and property professionals looking to grow their client base and income through targeted marketing strategies. Most attendees are earning £75k+ and want practical, industry-specific education they can implement immediately."
  },
  {
    question: "What makes Better Wealth different from other business training programs?",
    answer: "We're not motivational speakers. We're practitioners. Every workshop is built around tangible deliverables—you leave with frameworks, templates, and action plans ready to implement. We focus exclusively on financial services and real estate, so everything we teach accounts for FCA compliance, client trust dynamics, and the realities of regulated industries. And our community is vetted, not open-access."
  },
  {
    question: "Do I need marketing experience to attend?",
    answer: "No. Our workshops are designed for complete beginners through to experienced marketers. We cover setup, strategy, and execution—so whether you've never run a paid ad or you're looking to refine your existing campaigns, the content is structured to meet you where you are."
  },
  {
    question: "Can I bring a colleague or business partner?",
    answer: "Absolutely. Many attendees bring team members or business partners. Each person requires their own ticket, but we encourage teams to attend together—it makes implementation easier when everyone's aligned on the strategy."
  },
  {
    question: "What happens after I complete a workshop?",
    answer: "You don't just walk away with a notebook full of notes. Every attendee gets access to follow-up resources, and you become part of the Better Wealth community—an ongoing network of professionals who continue to share strategies and support each other. High-performing members are invited to exclusive events and advanced programs."
  },
  {
    question: "Are workshops recorded or available online?",
    answer: "No. Better Wealth is face-to-face only. The value isn't just in the content—it's in the focused environment, the real-time feedback, and the calibre of people in the room. We're intentionally building something that can't be replicated through a Zoom call or a course login."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24 px-6" style={{ backgroundColor: '#F4F2EF' }}>
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#9d6d47' }}>FAQ</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald mt-1">
              Frequently Asked Questions
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 50}>
              <div
                className="bg-white rounded-lg overflow-hidden transition-all duration-200"
                style={{ border: '1px solid rgba(0,0,0,0.07)' }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-emerald pr-8">{faq.question}</span>
                  <span className="text-2xl flex-shrink-0" style={{ color: '#9d6d47' }} aria-hidden="true">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)' }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}