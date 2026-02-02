import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-emerald overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-copper leading-tight">
            Build Your Network.
            <br />
            Build Your Business.
          </h1>

          <p className="text-xl md:text-2xl text-warmwhite/90 max-w-2xl mx-auto leading-relaxed">
            Marketing education for brokers who want to reach six figures and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link 
              href="/workshops"
              className="px-8 py-4 bg-copper text-white rounded-full hover:bg-copper-light transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Workshops
            </Link>
            <Link 
              href="/about"
              className="px-8 py-4 bg-transparent border-2 border-copper text-copper rounded-full hover:bg-copper hover:text-white transition-all duration-200 font-medium text-lg"
            >
              Learn More
            </Link>
          </div>

          <div className="pt-12">
            <p className="text-warmwhite/70 text-sm uppercase tracking-wider mb-4">
              Trusted by Professionals Across the UK
            </p>
            <div className="flex justify-center items-center space-x-8 text-warmwhite/60">
              <span>Manchester</span>
              <span>•</span>
              <span>Face-to-Face</span>
              <span>•</span>
              <span>Results-Driven</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}