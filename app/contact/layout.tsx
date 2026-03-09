import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Better Wealth about event bookings, partnerships, or general enquiries. Email info@better-wealth.co.uk or use our contact form.',
  keywords: ['contact Better Wealth', 'event enquiries', 'Manchester training', 'broker education contact'],
  alternates: {
    canonical: 'https://better-wealth.co.uk/contact',
  },
  openGraph: {
    title: 'Contact Us | Better Wealth',
    description: 'Get in touch with Better Wealth about event bookings, partnerships, or general enquiries.',
    url: 'https://better-wealth.co.uk/contact',
    images: [{ url: 'https://better-wealth.co.uk/og-image.png', width: 1200, height: 630, alt: 'Better Wealth - Private Community for Independent Wealth Builders' }],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
