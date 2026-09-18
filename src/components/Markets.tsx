import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { link, MARKETS } from '../lib/content'
import { Reveal, SectionHead } from './ui'

// Fixed slots (% of stage). Bubbles keep their slot and morph size/colour/label between markets.
const SLOTS: [number, number][] = [
  [50, 52], [24, 38], [76, 40], [33, 79], [68, 80], [52, 16],
  [10, 72], [90, 72], [50, 89], [8, 22], [92, 18], [35, 13],
]

export default function Markets() {
  const [active, setActive] = useState(0)
  const market = MARKETS[active]

  return (
    <section id="markets" className="relative py-28 sm:py-36">
      <div aria-hidden className="absolute left-1/2 top-1/3 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full bg-violet/15 blur-[150px]" />
      <div className="wrap relative">
        <SectionHead
          center
          eyebrow="Not just crypto"
          title={<>Seven asset classes.<br />One screen.</>}
          lede="Most bubble tools show crypto only. BubbleMarkets covers them all, so you can compare momentum across markets instead of inside just one."
        />

        <Reveal delay={0.15}>
          <div role="tablist" aria-label="Markets" className="mx-auto mt-12 flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1.5 sm:w-fit">
            {MARKETS.map((m, i) => (
              <button
                key={m.id}
                role="tab"
                type="button"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`relative min-h-[44px] shrink-0 cursor-pointer rounded-full px-5 text-sm font-medium transition-colors ${i === active ? 'text-ink' : 'text-mist hover:text-white'}`}
              >
                {i === active && <motion.span layoutId="market-pill" className="absolute inset-0 rounded-full bg-lime" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{m.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="glass relative mx-auto mt-10 aspect-square w-full max-w-5xl overflow-hidden rounded-[2.5rem] sm:aspect-[16/9]">
            <div className="grid-lines absolute inset-0" />
            {SLOTS.map(([x, y], i) => {
              const [label, change, weight] = market.bubbles[i]
              const c = Math.abs(change) < 0.05 ? '148 163 184' : change > 0 ? '34 197 94' : '239 68 68'
              return (
                <motion.div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{ width: `${6 + weight * 0.12}%`, opacity: 1 }}
                  initial={{ width: '0%', opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.025 }}
                >
                  <div className="bubble !relative aspect-square w-full transition-[box-shadow,background] duration-500" style={{ ['--c' as string]: c, animation: `bob ${5 + (i % 4)}s ease-in-out ${i * -0.7}s infinite` }} />
                  <motion.div key={label} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12 + i * 0.025 }} className="absolute inset-0 grid place-items-center">
                    <div className="leading-tight">
                      <p className="text-[clamp(9px,1.5vw,20px)] font-bold tracking-tight">{label}</p>
                      {weight > 38 && (
                        <p className={`font-mono text-[clamp(8px,1vw,13px)] ${change >= 0 ? 'text-up' : 'text-down'}`}>
                          {change >= 0 ? '+' : ''}
                          {change.toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
            <p className="absolute bottom-3 right-5 font-mono text-[10px] text-mist/40">Illustrative data</p>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <motion.p key={market.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl text-mist">
            <span className="font-semibold text-white">{market.label}. </span>
            {market.note}
          </motion.p>
          <a href={link(market.path)} className="btn-ghost shrink-0">
            Open live {market.label.toLowerCase()} board <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
