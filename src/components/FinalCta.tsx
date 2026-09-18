import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { link } from '../lib/content'
import { Reveal } from './ui'

const ORBS: [number, number, number, string, number][] = [
  [8, 22, 120, '34 197 94', 1.4], [88, 18, 90, '239 68 68', 0.8], [16, 78, 70, '239 68 68', 1.8],
  [82, 74, 140, '34 197 94', 1.1], [50, 8, 56, '34 197 94', 2.2], [64, 90, 48, '239 68 68', 0.6], [32, 94, 60, '34 197 94', 1.5],
]

function Orb({ orb, progress }: { orb: (typeof ORBS)[number]; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const [x, y, size, c, depth] = orb
  const ty = useTransform(progress, [0, 1], [90 * depth, -90 * depth])
  return (
    <motion.div className="absolute" style={{ left: `${x}%`, top: `${y}%`, y: ty }}>
      <div className="bubble !relative -translate-x-1/2 -translate-y-1/2" style={{ width: size, height: size, ['--c' as string]: c }} />
    </motion.div>
  )
}

export default function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return (
    <section ref={ref} className="relative overflow-hidden py-36 sm:py-48">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-[150px]" />
        {ORBS.map((o, i) => (
          <Orb key={i} orb={o} progress={scrollYProgress} />
        ))}
      </div>
      <div className="wrap relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
            What is the market doing <span className="text-gradient">right now?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede mx-auto mt-6 max-w-xl">One glance answers it. Free to use, nothing to install, no sign-up needed for the basics.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={link('/')} className="btn-primary group !min-h-[56px] !px-8 text-base">
              Open the bubbles <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a href={link('/signup')} className="btn-ghost !min-h-[56px] !px-8 text-base">
              Create a free account
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
