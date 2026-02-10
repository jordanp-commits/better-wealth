import Link from 'next/link'
import CountUp from '@/components/CountUp'

export default function Hero() {
  const muted = { color: 'rgba(250, 250, 248, 0.55)' }
  const divider = { backgroundColor: 'rgba(250, 250, 248, 0.15)' }
  const subtext = { color: 'rgba(250, 250, 248, 0.88)' }
  const border = { borderTop: '1px solid rgba(250, 250, 248, 0.12)' }
  const base = { backgroundColor: '#033A22' }
  const accentLine = {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #C4926A, transparent)'
  }
  const g1 = { background: 'radial-gradient(ellipse 150% 100% at 50% 50%, rgba(5,72,42,0.5) 0%, transparent 100%)' }
  const g2 = { background: 'radial-gradient(ellipse at 50% 40%, rgba(200,155,74,0.04) 0%, transparent 40%)' }
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={base}></div>
      <div className="absolute inset-0" style={g1}></div>
      <div className="absolute inset-0" style={g2}></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 text-center">
        <div className="mt-10 mb-4">
          <img src="/brand-mark.png" alt="Better Wealth" className="h-32 w-auto mx-auto" />
        </div>

        <h1 className="text-metallic font-serif font-bold leading-tight mb-6 text-4xl md:text-5xl lg:text-6xl">
          Build Your Network.<br />Build Your Business.
        </h1>

        <div className="w-12 mx-auto mb-6" style={accentLine}></div>

        <p className="text-lg max-w-lg mx-auto leading-relaxed mb-10 font-medium" style={subtext}>
          Marketing education for brokers who want to reach six figures and beyond.
        </p>

        <div className="flex justify-center">
          <Link href="/workshops" className="btn-copper px-7 py-3 rounded-lg font-semibold text-sm shadow-lg">
            Explore Workshops
          </Link>
        </div>

        <div className="mt-12 md:mt-20 py-12 md:py-16" style={border}>
          <div className="w-32 md:w-48 mx-auto mb-8 md:mb-12" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C4926A, transparent)' }}></div>
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