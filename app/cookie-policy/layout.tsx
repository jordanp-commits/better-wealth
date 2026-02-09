import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information about how Better Wealth uses cookies on our website. Manage your cookie preferences and learn about essential, analytics, and marketing cookies.',
  alternates: {
    canonical: 'https://better-wealth.co.uk/cookie-policy',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Cookie Policy | Better Wealth',
    description: 'Information about how Better Wealth uses cookies on our website.',
    url: 'https://better-wealth.co.uk/cookie-policy',
  },
}

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
