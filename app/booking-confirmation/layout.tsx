import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  description: 'Your event booking with Better Wealth has been confirmed. Check your email for details.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BookingConfirmationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
