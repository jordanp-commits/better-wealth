import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald/95 backdrop-blur-sm border-b border-emerald-light/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-copper">
              BETTER WEALTH
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/workshops" 
              className="text-warmwhite hover:text-copper transition-colors duration-200 font-medium"
            >
              Workshops
            </Link>
            <Link 
              href="/about" 
              className="text-warmwhite hover:text-copper transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-warmwhite hover:text-copper transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </div>

          <Link 
            href="/workshops"
            className="hidden md:block px-6 py-2.5 bg-copper text-white rounded-full hover:bg-copper-dark transition-all duration-200 font-medium"
          >
            Explore Workshops
          </Link>
        </div>
      </div>
    </nav>
  )
}
