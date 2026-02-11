import Link from 'next/link'
import CountUp from '@/components/CountUp'

export default function Hero() {
  const muted = { color: '#B8D4C5' }
  const divider = { backgroundColor: 'rgba(250, 250, 248, 0.15)' }
  const subtext = { color: 'rgba(250, 250, 248, 0.88)' }
  const base = { backgroundColor: '#033A22' }
  const g1 = { background: 'radial-gradient(ellipse 150% 100% at 50% 50%, rgba(5,72,42,0.5) 0%, transparent 100%)' }
  const g2 = { background: 'radial-gradient(ellipse at 50% 40%, rgba(200,155,74,0.04) 0%, transparent 40%)' }
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={base}></div>
      <div className="absolute inset-0" style={g1}></div>
      <div className="absolute inset-0" style={g2}></div>

      {/* Hero content + divider — fills the viewport */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-6">
              <img src="/brand-mark.svg" alt="Better Wealth logo" className="h-36 w-auto mx-auto" />
            </div>

            <h1 className="text-metallic font-serif font-bold leading-tight mb-6 text-5xl md:text-6xl lg:text-7xl">
              Build Your Network.<br />Build Your Business.
            </h1>

            <div className="w-12 h-0.5 mx-auto mb-6" style={{ backgroundColor: 'rgba(196, 146, 106, 0.5)' }}></div>

            <p className="text-lg max-w-lg mx-auto leading-relaxed mb-10 font-medium" style={subtext}>
              Marketing education for brokers who want to reach six figures and beyond.
            </p>

            <div className="flex justify-center">
              <Link href="/workshops" className="btn-copper px-8 py-3.5 rounded-lg font-semibold text-base shadow-lg">
                Explore Workshops
              </Link>
            </div>
          </div>
        </div>

        {/* Copper divider — pinned at viewport bottom */}
        <div className="max-w-4xl mx-auto w-full px-6 pb-12">
          <div style={{ height: '1px', backgroundColor: 'rgba(196, 146, 106, 0.4)' }}></div>
        </div>
      </div>

      {/* Stats — below the fold */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="pt-10 pb-16 md:pt-12 md:pb-20 flex flex-col items-center">
          <div className="w-12 h-0.5 mb-10" style={{ backgroundColor: 'rgba(196, 146, 106, 0.5)' }}></div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 lg:gap-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
                <CountUp end={250} suffix="+" style={{ color: '#C4926A' }} />
              </div>
              <div className="text-xs uppercase tracking-widest mt-2 font-medium" style={muted}>
                Brokers Trained
              </div>
            </div>
            <div className="hidden md:block w-px h-10" style={divider}></div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
                <CountUp end={12} suffix="+" style={{ color: '#C4926A' }} />
              </div>
              <div className="text-xs uppercase tracking-widest mt-2 font-medium" style={muted}>
                Workshops Delivered
              </div>
            </div>
            <div className="hidden md:block w-px h-10" style={divider}></div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
                <CountUp end={95} prefix="£" suffix="k+" style={{ color: '#C4926A' }} />
              </div>
              <div className="text-xs uppercase tracking-widest mt-2 font-medium" style={muted}>
                Avg Client Revenue
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}