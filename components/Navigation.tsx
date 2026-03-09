'use client'

import { useState } from 'react'
import Link from 'next/link'
import MobileNav from './MobileNav'
import WaitlistModal from '@/components/WaitlistModal'

export default function Navigation() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[68px]"
        style={{ backgroundColor: '#0D2418' }}
      >
        <div className="relative h-full px-6 max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - left */}
          <Link href="/">
            <div style={{ height: '40px', overflow: 'hidden' }} className="flex items-center">
              <img
                src="/logo-single-line.svg"
                alt="Better Wealth - Home"
                style={{ height: '160px', width: 'auto' }}
              />
            </div>
          </Link>

          {/* Nav links - absolutely centered, hidden on mobile */}
          <div className="absolute left-0 right-0 hidden lg:flex justify-center gap-8 pointer-events-none">
            <Link href="/workshops" className="pointer-events-auto nav-link text-base font-medium">Events</Link>
            <Link href="/about" className="pointer-events-auto nav-link text-base font-medium">About</Link>
            <Link href="/partnerships" className="pointer-events-auto nav-link text-base font-medium">Partnerships</Link>
            <Link href="/contact" className="pointer-events-auto nav-link text-base font-medium">Contact</Link>
          </div>

          {/* Right side: CTA button (desktop) + Mobile menu button */}
          <div className="flex items-center gap-2">
            {/* CTA button - hidden on mobile */}
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="hidden lg:block bg-[#C4926A] hover:bg-[#B07D57] text-white text-base font-medium px-6 py-2.5 rounded-lg transition-all duration-200"
            >
              Become a Member
            </button>

            {/* Mobile menu */}
            <MobileNav onBecomeMember={() => setIsWaitlistModalOpen(true)} />
          </div>
        </div>
      </nav>

      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </>
  );
}
