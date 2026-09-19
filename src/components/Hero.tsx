import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { APPS_LIVE, link, SMART_APP_LINK } from '../lib/content'
import { StoreButtons } from './AppCta'

const BubbleScene = lazy(() => import('./BubbleScene'))

const EASE = [0.22, 1, 0.36, 1] as const
const LINE_1 = ['Every', 'market.']
const LINE_2 = ['One', 'living', 'map.']

function Word({ children, i, accent }: { children: string; i: number; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span className={`inline-block ${accent ? 'text-gradient' : ''}`} initial={{ y: '110%', rotate: 6 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.25 + i * 0.09, ease: EASE }}>
        {children}&nbsp;
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const sceneOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0])

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* depth layers: colour blooms, grid, then the WebGL field */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-violet/25 blur-[140px]" />
        <div className="absolute bottom-[-25%] left-[-10%] h-[60vh] w-[60vw] rounded-full bg-azure/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-lime/10 blur-[140px]" />
        <div className="grid-lines absolute inset-0" />
      </div>

      <motion.div style={{ opacity: sceneOpacity }} className="absolute inset-0">
        <Suspense fallback={null}>
          <BubbleScene progress={scrollYProgress} />
        </Suspense>
      </motion.div>

      {/* keeps the headline legible over the bubbles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_8%,rgba(0,7,36,0.74)_22%,rgba(0,7,36,0.74)_72%,transparent_90%)] sm:bg-[radial-gradient(ellipse_55%_42%_at_50%_48%,rgba(0,7,36,0.88),transparent_72%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />

      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-32 pt-24 text-center sm:pb-24 sm:pt-28">
        <div data-hero-copy className="flex flex-col items-center">
        <motion.a
          href="#markets"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="glass pointer-events-auto mb-5 inline-flex sm:mb-7 min-h-[44px] items-center gap-2.5 rounded-full px-4 font-mono text-xs text-mist"
        >
          <span className="h-2 w-2 animate-pulseDot rounded-full bg-up shadow-[0_0_10px_#22C55E]" />
          <span className="sm:hidden">LIVE · 7 asset classes, one screen</span>
          <span className="hidden sm:inline">LIVE · Stocks · Crypto · ETFs · Forex · Commodities · Bonds</span>
        </motion.a>

        <h1 className="text-[clamp(2.9rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
          <span className="block">
            {LINE_1.map((w, i) => (
              <Word key={w} i={i}>{w}</Word>
            ))}
          </span>
          <span className="block">
            {LINE_2.map((w, i) => (
              <Word key={w} i={i + 2} accent={i > 0}>{w}</Word>
            ))}
          </span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.85, ease: EASE }} className="lede mt-6 max-w-xl !text-base sm:mt-7 sm:!text-lg">
          Following stocks, crypto and every other market across different apps, lists and charts takes time. BubbleMarkets shows you what's moving across all of them — in one visual view.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease: EASE }} className="pointer-events-auto mt-7 flex flex-col sm:mt-9 items-center gap-3 sm:flex-row">
          <a href={APPS_LIVE && SMART_APP_LINK ? SMART_APP_LINK : link('/')} className="btn-primary group">
            {APPS_LIVE && SMART_APP_LINK ? 'Get the app' : 'Explore the bubbles'}
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a href="#why" className="btn-ghost">
            <Play size={16} className="fill-current" />
            See how it works
          </a>
        </motion.div>

        {APPS_LIVE && (
          <div className="pointer-events-auto mt-5 flex flex-wrap justify-center gap-3">
            <StoreButtons />
          </div>
        )}

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }} className="mt-5 text-sm text-mist/80">
          Free to use. No download, no sign-up needed for the basics.
        </motion.p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: copyOpacity }} className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist/70">
        <span className="hidden sm:block">Move your cursor · bubbles react</span>
        <span className="block h-9 w-[1px] overflow-hidden bg-white/10">
          <motion.span className="block h-3 w-full bg-lime" animate={{ y: [-12, 36] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </motion.div>
      <p className="absolute bottom-3 right-4 z-10 font-mono text-[10px] text-mist/40">Illustrative data</p>
    </section>
  )
}
