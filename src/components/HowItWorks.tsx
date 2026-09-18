import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, SectionHead } from './ui'

const rgb = (c: number) => (Math.abs(c) < 0.15 ? '148 163 184' : c > 0 ? '34 197 94' : '239 68 68')

export default function HowItWorks() {
  const [cap, setCap] = useState(62)
  const [move, setMove] = useState(3.4)
  const size = 90 + cap * 2.3

  return (
    <section id="how" className="relative py-28 sm:py-36">
      <div className="wrap grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="Learn it in ten seconds"
            title={<>Size is value.<br />Colour is <span className="text-gradient">movement.</span></>}
            lede="That's the entire legend. Once you know it, a screen of bubbles tells you what a table of 500 rows never will: what the market is doing right now."
          />
          <Reveal delay={0.2}>
            <div className="mt-10 space-y-7">
              <label className="block">
                <span className="flex justify-between font-mono text-xs uppercase tracking-widest text-mist">
                  <span>Market cap</span>
                  <span className="text-white">${(cap * 48 + 120).toLocaleString()}B</span>
                </span>
                <input type="range" min={0} max={100} value={cap} onChange={(e) => setCap(+e.target.value)} className="mt-1 h-11 w-full cursor-pointer accent-lime" />
              </label>
              <label className="block">
                <span className="flex justify-between font-mono text-xs uppercase tracking-widest text-mist">
                  <span>24h move</span>
                  <span className={move > 0.15 ? 'text-up' : move < -0.15 ? 'text-down' : 'text-white'}>
                    {move > 0 ? '+' : ''}
                    {move.toFixed(1)}%
                  </span>
                </span>
                <input type="range" min={-10} max={10} step={0.1} value={move} onChange={(e) => setMove(+e.target.value)} className="mt-1 h-11 w-full cursor-pointer accent-lime" />
              </label>
              <p className="text-sm text-mist">Drag the sliders. You just learned to read every market on Earth.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass relative mx-auto grid aspect-square w-full max-w-[520px] place-items-center overflow-hidden rounded-[2.5rem]">
            <div className="grid-lines absolute inset-0" />
            <motion.div
              className="bubble !relative"
              animate={{ width: size, height: size }}
              transition={{ type: 'spring', stiffness: 140, damping: 14 }}
              style={{ ['--c' as string]: rgb(move), filter: `saturate(${0.5 + Math.min(Math.abs(move) / 6, 1)})` }}
            >
              <div>
                <p className="text-2xl font-bold tracking-tight sm:text-3xl">ACME</p>
                <p className={`font-mono text-sm ${move > 0.15 ? 'text-up' : move < -0.15 ? 'text-down' : 'text-mist'}`}>
                  {move > 0 ? '+' : ''}
                  {move.toFixed(1)}%
                </p>
              </div>
            </motion.div>
            <p className="absolute bottom-5 font-mono text-[11px] uppercase tracking-[0.2em] text-mist/70">Bigger = bigger market · Greener = bigger gain</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
