import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Thank You',
  robots: { index: false, follow: false },
}

export default function ConfirmedPage() {
  return (
    <main className="min-h-screen bg-warmwhite">
      <div className="mx-auto max-w-[640px] px-6 py-24 md:py-32">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper mb-4">
          Thank You
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-emerald-dark mb-3">
          Received.
        </h1>
        <p className="text-sm text-stone-500 mb-12">
          Your interest has been noted. Places are limited and reviewed
          individually. If there&rsquo;s a place for you, we&rsquo;ll be in
          touch.
        </p>
        <Link
          href="/"
          className="text-sm text-copper underline underline-offset-4 hover:text-emerald-dark transition-colors"
        >
          Return home
        </Link>
      </div>
    </main>
  )
}
