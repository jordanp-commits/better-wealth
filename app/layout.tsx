import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import './globals.css'

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Better Wealth',
  description: 'Marketing education for brokers who want to reach six figures and beyond.',
  icons: {
    icon: '/Favicon.png?v=2',
    apple: '/Favicon.png?v=2',
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
      </body>
    </html>
  )
}