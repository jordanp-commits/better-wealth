import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partnerships',
  description: 'Partner with Better Wealth to provide marketing training to your network. Corporate training, network partnerships, and technology integrations available.',
  keywords: ['Better Wealth partnerships', 'corporate broker training', 'network partnerships', 'mortgage broker network training', 'financial advisor group training'],
  alternates: {
    canonical: 'https://better-wealth.co.uk/partnerships',
  },
  openGraph: {
    title: 'Partnerships | Better Wealth',
    description: 'Partner with Better Wealth to provide marketing training to your network. Corporate training and network partnerships available.',
    url: 'https://better-wealth.co.uk/partnerships',
  },
}

export default function PartnershipsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
