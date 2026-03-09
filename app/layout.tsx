import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'
import Analytics from '@/components/Analytics'
import AutoWaitlistModal from '@/components/AutoWaitlistModal'

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const siteUrl = 'https://better-wealth.co.uk'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Better Wealth | Private Community for Independent Wealth Builders',
    template: '%s | Better Wealth',
  },
  description: 'A private membership network for founders and operators serious about building long-term wealth. Curated events, expert sessions, and trusted peer connections in Manchester.',
  keywords: ['private wealth community', 'wealth builders network', 'founders community Manchester', 'curated events', 'expert sessions', 'peer connections', 'independent wealth'],
  authors: [{ name: 'Better Wealth' }],
  creator: 'Better Wealth',
  publisher: 'Better Wealth',
  icons: {
    icon: '/Favicon.svg?v=2',
    apple: '/Favicon.svg?v=2',
  },
  openGraph: {
    title: 'Better Wealth | Private Community for Independent Wealth Builders',
    description: 'A private membership network for founders and operators serious about building long-term wealth.',
    url: siteUrl,
    siteName: 'Better Wealth',
    images: [
      {
        url: 'https://better-wealth.co.uk/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Better Wealth - Private Community for Independent Wealth Builders',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better Wealth | Private Community for Independent Wealth Builders',
    description: 'A private membership network for founders and operators serious about building long-term wealth.',
    images: ['https://better-wealth.co.uk/og-image.png'],
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
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <div id="main-content">{children}</div>
        <CookieConsent />
        <AutoWaitlistModal />
        <Analytics />
      </body>
    </html>
  )
}