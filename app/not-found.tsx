import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F4F2EF]">
      <Navigation />

      {/* Main Content - Simple Centered Layout */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 pt-16 md:pt-20">
        <div className="max-w-2xl mx-auto text-center">

          {/* Compass Icon */}
          <svg
            className="w-16 h-16 mx-auto mt-4 mb-8 text-[#C4926A]/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" strokeWidth={0.75} />
            <polygon
              points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
              strokeWidth={0.75}
              fill="currentColor"
            />
          </svg>

          {/* 404 Number */}
          <p className="text-[120px] md:text-[150px] font-serif font-bold leading-none text-[#9d6d47] mb-2">
            404
          </p>

          {/* Decorative Line */}
          <div className="w-16 h-0.5 bg-[#C4926A] mx-auto mb-6" />

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#033A22] mb-4">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-lg mx-auto mb-8">
            The page you're looking for doesn't exist. It may have been moved or deleted.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3 rounded-lg font-medium bg-[#C4926A] text-[#033A22] transition-all duration-200 hover:bg-[#D4A27A]"
            >
              Back to Home
            </Link>
            <Link
              href="/workshops"
              className="w-full sm:w-auto px-8 py-3 rounded-lg font-medium border-2 border-[#9d6d47] text-[#9d6d47] transition-all duration-200 hover:bg-[#9d6d47] hover:text-[#033A22]"
            >
              Browse Events
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
