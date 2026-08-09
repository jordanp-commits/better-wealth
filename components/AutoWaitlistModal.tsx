'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import WaitlistModal from './WaitlistModal'

export default function AutoWaitlistModal() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const hidden = pathname === '/events/register' || pathname === '/events/register/confirmed'

  useEffect(() => {
    if (hidden) return

    // Don't show if already applied
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('waitlist_applied') === 'true') {
        return
      }

      // Don't show if already dismissed this session
      if (sessionStorage.getItem('waitlist_dismissed') === 'true') {
        return
      }
    }

    let hasShown = false

    // Timer: Show after 30 seconds
    const timer = setTimeout(() => {
      if (!hasShown) {
        hasShown = true
        setIsOpen(true)
      }
    }, 30000)

    // Scroll: Show after 50% scroll
    const handleScroll = () => {
      if (hasShown) return

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (window.scrollY / scrollHeight) * 100

      if (scrollPercent >= 50) {
        hasShown = true
        setIsOpen(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('waitlist_dismissed', 'true')
  }

  if (hidden) return null

  return <WaitlistModal isOpen={isOpen} onClose={handleClose} />
}
