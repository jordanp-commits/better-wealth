import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = {
  title: 'Register Your Interest',
  robots: { index: false, follow: false },
}

export default function RegisterInterestPage() {
  return (
    <main className="min-h-screen bg-warmwhite">
      <div className="mx-auto max-w-[640px] px-6 py-24 md:py-32">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper mb-4">
          The Events Programme
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-emerald-dark mb-3">
          Register Your Interest
        </h1>
        <p className="text-sm text-stone-500 mb-12">
          Places are limited and allocated by application.
        </p>

        <RegisterForm />
      </div>
    </main>
  )
}
