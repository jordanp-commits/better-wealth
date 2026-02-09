import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'
import Analytics from '@/components/Analytics'
import NewsletterModal from '@/components/NewsletterModal'

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const siteUrl = 'https://better-wealth.co.uk'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Better Wealth | Marketing Education for Financial Services & Real Estate',
    template: '%s | Better Wealth',
  },
  description: 'Face-to-face marketing workshops for mortgage brokers and financial advisors. Practical training with real deliverables. Manchester-based, FCA-compliant strategies.',
  keywords: ['mortgage broker marketing', 'financial advisor marketing', 'FCA compliant marketing', 'broker workshops', 'Manchester', 'financial services training', 'real estate marketing'],
  authors: [{ name: 'Better Wealth' }],
  creator: 'Better Wealth',
  publisher: 'Better Wealth',
  icons: {
    icon: '/Favicon.png?v=2',
    apple: '/Favicon.png?v=2',
  },
  openGraph: {
    title: 'Better Wealth | Marketing Education for Financial Services',
    description: 'Face-to-face marketing workshops for mortgage brokers and financial advisors. Practical training with real deliverables.',
    url: siteUrl,
    siteName: 'Better Wealth',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Better Wealth - Marketing Education for Financial Services',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better Wealth | Marketing Education for Financial Services',
    description: 'Face-to-face marketing workshops for mortgage brokers and financial advisors.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={atkinson.className}>
        {children}
        <CookieConsent />
        <NewsletterModal />
        <Analytics />
      </body>
    </html>
  )
}