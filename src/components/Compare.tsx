import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { COMPARE } from '../lib/content'
import { Reveal, SectionHead, Wordmark } from './ui'

export default function Compare() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <SectionHead
          eyebrow="The honest comparison"
          title={<>Same brilliant idea.<br /><span className="text-gradient">A much wider lens.</span></>}
          lede="If you love crypto bubble charts, you already know how to use BubbleMarkets. We just didn't stop at coins."
        />
        <Reveal delay={0.1}>
          <div className="glass overflow-hidden rounded-3xl">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-white/10 px-5 py-4 text-sm sm:gap-x-8 sm:px-7">
              <span className="text-mist">Feature</span>
              <Wordmark className="w-24 text-center text-sm sm:w-32 sm:text-base" />
              <span className="w-20 text-center text-xs text-mist sm:w-28 sm:text-sm">Crypto-only bubble charts</span>
            </div>
            {COMPARE.map((row, i) => (
              <motion.div
                key={row}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-white/5 px-5 py-3.5 text-[15px] last:border-0 sm:gap-x-8 sm:px-7"
              >
                <span>{row}</span>
                <span className="grid w-24 place-items-center sm:w-32">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-lime text-ink">
                    <Check size={14} strokeWidth={3} />
                    <span className="sr-only">Yes</span>
                  </span>
                </span>
                <span className="grid w-20 place-items-center text-mist/50 sm:w-28">
                  <Minus size={16} />
                  <span className="sr-only">No</span>
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
