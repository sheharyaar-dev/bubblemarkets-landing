import { HERO_BUBBLES } from '../lib/content'

export default function Marquee() {
  const items = [...HERO_BUBBLES, ...HERO_BUBBLES]
  return (
    <div className="relative border-y border-white/10 bg-ink-900/60 py-4" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 font-mono text-sm">
          {items.map((b, i) => (
            <span key={i} className="flex items-center gap-2.5 whitespace-nowrap">
              <span className={`h-2 w-2 rounded-full ${b.c >= 0 ? 'bg-up' : 'bg-down'}`} />
              <span className="text-white">{b.s}</span>
              <span className={b.c >= 0 ? 'text-up' : 'text-down'}>
                {b.c >= 0 ? '+' : ''}
                {b.c.toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
