'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface MobileNavProps {
  currentPage?: 'workshops' | 'about' | 'partnerships' | 'contact' | 'privacy' | 'cookie-policy' | null
}

export default function MobileNav({ currentPage = null }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Close menu when viewport exceeds mobile breakpoint (lg: 1024px)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const handleChange = () => {
      if (mql.matches) setIsOpen(false)
    }
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  const navLinks = [
    { href: '/workshops', label: 'Workshops', key: 'workshops' },
    { href: '/about', label: 'About', key: 'about' },
    { href: '/partnerships', label: 'Partnerships', key: 'partnerships' },
    { href: '/contact', label: 'Contact', key: 'contact' },
  ]

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative z-[51] flex items-center justify-center w-11 h-11 -mr-2"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="#C4926A"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-4/5 max-w-sm transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#033A22' }}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-11 h-11"
            aria-label="Close menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="#C4926A"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-6">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-4 text-lg font-medium transition-colors duration-200 border-b ${
                currentPage === link.key
                  ? 'text-[#C4926A]'
                  : 'text-white hover:text-[#C4926A]'
              }`}
              style={{ borderColor: 'rgba(196, 146, 106, 0.2)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="px-6 mt-8">
          <Link
            href="/workshops"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center py-4 rounded-lg text-white font-semibold text-sm transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#C4926A' }}
          >
            Explore Workshops
          </Link>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="flex gap-6 text-sm" style={{ color: '#B8D4C5' }}>
            <Link
              href="/privacy"
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/cookie-policy"
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
