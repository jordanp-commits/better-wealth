import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Better Wealth\'s mission to provide practical marketing education for mortgage brokers and financial professionals. Built by brokers, for brokers.',
  keywords: ['about Better Wealth', 'mortgage broker training', 'financial advisor education', 'Jordan Price', 'broker marketing'],
  alternates: {
    canonical: 'https://better-wealth.co.uk/about',
  },
  openGraph: {
    title: 'About Us | Better Wealth',
    description: 'Learn about Better Wealth\'s mission to provide practical marketing education for mortgage brokers and financial professionals.',
    url: 'https://better-wealth.co.uk/about',
    images: [{ url: 'https://better-wealth.co.uk/og-image.png', width: 1200, height: 630, alt: 'Better Wealth - Private Community for Independent Wealth Builders' }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
