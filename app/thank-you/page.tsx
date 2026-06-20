import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Application Received',
  description: 'Thank you for applying to Better Wealth. We will review your application and be in touch soon.',
  robots: { index: false, follow: false },
}

export default function ThankYou() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0D2418' }}>
      <Navigation />

      <section className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 rounded-full border-2 border-[#C4926A] flex items-center justify-center mx-auto mb-6">
            <span className="text-[#C4926A] text-2xl">&#10003;</span>
          </div>
          <h1 className="font-serif text-white text-3xl md:text-4xl font-bold mb-4">
            Application Received
          </h1>
          <p className="text-white/60 text-lg mb-8 leading-relaxed">
            Thank you for applying to Better Wealth. We review every application personally and will be in touch soon.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#C4926A] text-white px-8 py-3 rounded-md font-medium tracking-wide hover:bg-[#B07D57] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
