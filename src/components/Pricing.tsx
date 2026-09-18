import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { PLANS } from '../lib/content'
import { Reveal, SectionHead } from './ui'

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="relative py-28 sm:py-36">
      <div aria-hidden className="absolute left-1/2 top-1/4 h-[50vh] w-[60vw] -translate-x-1/2 rounded-full bg-lime/[0.07] blur-[150px]" />
      <div className="wrap relative">
        <SectionHead center eyebrow="Pricing" title="Free to look. Fair to upgrade." lede="Start without an account. Upgrade when you want faster data and sharper tools. Cancel any time." />

        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
            {[false, true].map((y) => (
              <button key={String(y)} type="button" aria-pressed={yearly === y} onClick={() => setYearly(y)} className={`relative min-h-[44px] cursor-pointer rounded-full px-5 text-sm font-medium transition-colors ${yearly === y ? 'text-ink' : 'text-mist hover:text-white'}`}>
                {yearly === y && <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-lime" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{y ? 'Yearly · 2 months free' : 'Monthly'}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p, i) => {
            const price = yearly ? p.yearly : p.monthly
            return (
              <Reveal key={p.name} delay={i * 0.07} className="h-full">
                <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className={`relative flex h-full flex-col rounded-3xl p-7 ${p.popular ? 'border border-lime/50 bg-gradient-to-b from-lime/[0.12] to-white/[0.02] shadow-[0_30px_80px_-30px_rgba(182,246,5,0.45)]' : 'glass'}`}>
                  {p.popular && <span className="absolute -top-3 left-7 rounded-full bg-lime px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">Most popular</span>}
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-mist">{p.line}</p>
                  <p className="mt-6 flex items-baseline gap-1.5">
                    <motion.span key={price} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-5xl font-semibold tracking-tight">
                      ${price}
                    </motion.span>
                    <span className="text-sm text-mist">{price === 0 ? 'forever' : yearly ? '/ year' : '/ month'}</span>
                  </p>
                  <a href={p.href} className={`mt-6 w-full ${p.popular ? 'btn-primary' : 'btn-ghost'}`}>
                    {p.cta}
                  </a>
                  {p.popular && <p className="mt-3 text-xs leading-relaxed text-mist">Free for 7 days, then $19.99/month. Cancel any time before day 7 and you pay nothing.</p>}
                  <ul className="mt-7 space-y-3 border-t border-white/10 pt-6 text-[15px]">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-white/85">
                        <Check size={16} className="mt-1 shrink-0 text-lime" strokeWidth={3} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-mist/80">
          Refresh rates vary by market. Crypto and US stocks & ETFs are the fastest on every plan; forex, commodities, bonds and indices update more slowly because those sources do not publish faster. Live streaming covers crypto, US stocks and ETFs.
        </p>
      </div>
    </section>
  )
}
