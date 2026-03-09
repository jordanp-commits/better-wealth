export default function MarqueeTicker() {
  const text = 'PRIVATE MEMBERSHIP\u00A0\u00A0·\u00A0\u00A0INDEPENDENT WEALTH BUILDERS\u00A0\u00A0·\u00A0\u00A0MANCHESTER\u00A0\u00A0·\u00A0\u00A0EST. 2026\u00A0\u00A0·\u00A0\u00A0BUILD YOUR NETWORK\u00A0\u00A0·\u00A0\u00A0BUILD YOUR BUSINESS\u00A0\u00A0·\u00A0\u00A02026\u00A0\u00A0·\u00A0\u00A0'

  return (
    <div className="py-3 overflow-hidden" style={{ backgroundColor: '#0D2418' }}>
      <div className="flex w-fit animate-marquee-ticker">
        <span className="text-xs tracking-[0.25em] uppercase font-sans whitespace-nowrap" style={{ color: 'rgba(196,146,106,0.7)' }}>
          {text}{text}{text}{text}
        </span>
        <span className="text-xs tracking-[0.25em] uppercase font-sans whitespace-nowrap" style={{ color: 'rgba(196,146,106,0.7)' }} aria-hidden="true">
          {text}{text}{text}{text}
        </span>
      </div>
    </div>
  )
}
