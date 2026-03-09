'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'

const faqs = [
  {
    question: "Who is Better Wealth for?",
    answer: "Better Wealth is built for founders and operators who are already building. People running businesses, managing wealth, and thinking seriously about long-term financial independence. Our members typically have established revenue, are scaling, and want access to a peer network and resources that match where they are."
  },
  {
    question: "What does a Better Wealth membership include?",
    answer: "Membership gives you access to our private network of founders and operators, curated workshops and masterminds, expert-led sessions, and a community of people navigating similar challenges at a similar level. It's less about education from scratch and more about the right conversations, connections, and frameworks at the right stage of your journey."
  },
  {
    question: "How is Better Wealth different from a business community or networking group?",
    answer: "Most networks are open-access. Ours isn't. Every member is vetted, which means the quality of conversation, introductions, and collaboration is significantly higher. We're building something deliberate — not a directory, not a forum, but a working network of serious operators."
  },
  {
    question: "How do I become a member?",
    answer: "Membership is application-based. We review every application to make sure there's a genuine fit — for your benefit as much as ours. If accepted, you'll be onboarded and connected with relevant members from day one."
  },
  {
    question: "What stage of business should I be at?",
    answer: "There's no fixed rule, but Better Wealth is designed for people who are past the early hustle stage. If you're building something with real traction and thinking about wealth, scale, and longevity — you're likely a good fit."
  },
  {
    question: "Is Better Wealth only based in the UK?",
    answer: "Our community is primarily UK-based, but membership is open to founders and operators building internationally. A number of our members operate across multiple markets. We regularly conduct international members trips, and have many members operating internationally."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
      {/* Dark header band */}
      <div className="py-16 px-6" style={{ backgroundColor: '#0D2418' }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Frequently Asked Questions
            </h2>
          </FadeIn>
        </div>
      </div>

      {/* Accordion */}
      <div className="pt-12 pb-16 md:pt-16 md:pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 50}>
              <div
                className="rounded-lg overflow-hidden transition-all duration-200"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', borderLeft: openIndex === index ? '4px solid #C4926A' : '4px solid transparent' }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F5F2EC] transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium pr-8" style={{ color: '#033A22' }}>{faq.question}</span>
                  <span
                    className="text-2xl flex-shrink-0 transition-transform duration-200"
                    style={{ color: '#9d6d47', transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-base leading-relaxed" style={{ color: '#555' }}>
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