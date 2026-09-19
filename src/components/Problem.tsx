import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Reveal, SectionHead } from './ui'

// The "before": one tool per market, each with its own list to scroll.
const TABS: { name: string; rows: [string, string, boolean][]; x: number; y: number; r: number }[] = [
  { name: 'Stock app', rows: [['NVDA', '-2.34%', false], ['AAPL', '+1.45%', true], ['MSFT', '+0.27%', true]], x: 0, y: 0, r: -7 },
  { name: 'Crypto exchange', rows: [['BTC', '+3.12%', true], ['ETH', '+4.61%', true], ['XRP', '-2.90%', false]], x: 34, y: 14, r: 5 },
  { name: 'FX chart', rows: [['EUR/USD', '-0.31%', false], ['USD/JPY', '+0.22%', true], ['GBP/USD', '+0.12%', true]], x: 4, y: 36, r: 4 },
  { name: 'Commodities site', rows: [['GOLD', '+0.84%', true], ['OIL', '-1.88%', false], ['GAS', '-2.60%', false]], x: 40, y: 46, r: -5 },
]

const AFTER: [string, number, number, number, boolean][] = [
  ['BTC', 50, 55, 27, true], ['NVDA', 22, 39, 21, false], ['AAPL', 79, 36, 20, true], ['GOLD', 27, 79, 16, true], ['EUR', 76, 80, 16, false],
  ['ETH', 51, 17, 13, true], ['OIL', 34, 12, 11, false], ['SPY', 90, 60, 10, true], ['US10Y', 7, 63, 11, false],
]

export default function Problem() {
  return (
    <section id="why" className="relative py-28 sm:py-36">
      <div className="wrap">
        <SectionHead
          center
          eyebrow="The problem"
          title={<>Four apps. A dozen tabs.<br />One simple question.</>}
          lede="What's moving right now? Answering that means hopping between a stock app, a crypto exchange, an FX chart and a commodities site — then stitching the picture together in your head. It takes time, and you still miss things."
        />

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <figure className="glass relative aspect-[5/4] overflow-hidden rounded-[2rem] p-5 sm:aspect-[4/3] sm:p-7">
              <figcaption className="font-mono text-xs uppercase tracking-[0.2em] text-down">Before — scattered</figcaption>
              <div className="absolute inset-x-5 bottom-5 top-14 sm:inset-x-7">
                {TABS.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 30, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: t.r }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 120, damping: 14 }}
                    className="absolute w-[56%] rounded-xl border border-white/10 bg-ink-800 p-3 shadow-2xl shadow-black/60"
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                  >
                    <p className="flex items-center gap-1.5 border-b border-white/10 pb-2 text-[11px] text-mist">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      {t.name}
                    </p>
                    {t.rows.map(([sym, chg, up]) => (
                      <p key={sym} className="flex justify-between pt-1.5 font-mono text-[11px] sm:text-xs">
                        <span className="text-white/80">{sym}</span>
                        <span className={up ? 'text-up' : 'text-down'}>{chg}</span>
                      </p>
                    ))}
                  </motion.div>
                ))}
              </div>
            </figure>
          </Reveal>

          <div aria-hidden className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-lime text-ink shadow-[0_0_40px_rgba(182,246,5,0.5)]">
            <ArrowRight className="hidden lg:block" size={22} />
            <ArrowDown className="lg:hidden" size={22} />
          </div>

          <Reveal delay={0.15}>
            <figure className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-lime/30 sm:aspect-[4/3] bg-gradient-to-b from-lime/[0.08] to-white/[0.02] p-5 sm:p-7">
              <figcaption className="font-mono text-xs uppercase tracking-[0.2em] text-lime">After — one view</figcaption>
              <div className="absolute inset-x-3 bottom-3 top-12">
                {AFTER.map(([sym, x, y, size, up], i) => (
                  <motion.div
                    key={sym}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 160, damping: 13 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%`, width: `${size}%` }}
                  >
                    <div className="bubble !relative aspect-square w-full" style={{ ['--c' as string]: up ? '34 197 94' : '239 68 68', animation: `bob ${5 + (i % 3)}s ease-in-out ${i * -0.8}s infinite` }}>
                      <span className="text-[clamp(8px,1.3vw,15px)] font-bold">{sym}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-xl leading-relaxed text-white sm:text-2xl">
            <span className="text-gradient font-semibold">BubbleMarkets</span> puts stocks, crypto, ETFs, forex, commodities, bonds and indices on one screen — so you see what's moving across all of them in a single glance.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
