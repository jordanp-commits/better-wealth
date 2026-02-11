import Link from 'next/link'
import MobileNav from './MobileNav'

export default function Navigation() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: '#033A22' }}
    >
      <div className="relative h-16 px-6 max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - left */}
        <Link href="/">
          <div style={{ height: '40px', overflow: 'hidden' }} className="flex items-center">
            <img
              src="/logo-single-line.svg"
              alt="Better Wealth - Home"
              style={{ height: '160px', width: 'auto' }}
            />
          </div>
        </Link>

        {/* Nav links - absolutely centered, hidden on mobile */}
        <div className="absolute left-0 right-0 hidden lg:flex justify-center gap-8 pointer-events-none">
          <Link href="/workshops" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Workshops</Link>
          <Link href="/about" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">About</Link>
          <Link href="/partnerships" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Partnerships</Link>
          <Link href="/contact" className="pointer-events-auto text-white/85 hover:text-white text-sm font-medium transition-colors duration-200">Contact</Link>
        </div>

        {/* Right side: CTA button (desktop) + Mobile menu button */}
        <div className="flex items-center gap-2">
          {/* CTA button - hidden on mobile */}
          <Link
            href="/workshops"
            className="hidden lg:block btn-outline-copper text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200"
          >
            Explore Workshops
          </Link>

          {/* Mobile menu */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
