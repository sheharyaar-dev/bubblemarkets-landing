import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '../lib/content'
import { Reveal, SectionHead } from './ui'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-28 sm:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead eyebrow="FAQ" title="Questions, answered straight." lede="We'd rather be honest than impressive. If something here is unclear, write to support@bubblemarkets.com." />
        <div>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div className="border-b border-white/10">
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-medium transition-colors hover:text-lime">
                  {f.q}
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15">
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="max-w-2xl pb-6 leading-relaxed text-mist">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
