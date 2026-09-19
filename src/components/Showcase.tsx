import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { SHOWCASE } from '../lib/content'
import Phone from './Phone'
import { Reveal } from './ui'

function Points({ points, className = '' }: { points: string[]; className?: string }) {
  return (
    <ul className={`mt-6 space-y-2.5 ${className}`}>
      {points.map((p) => (
        <li key={p} className="flex items-center gap-3 text-[15px] text-white/90">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime/15 text-lime">
            <Check size={12} strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  )
}

/** Short viewports (landscape phones) can't fit a full-height sticky phone — show the steps as a plain list. */
function StackedShowcase() {
  return (
    <section id="product" className="py-20">
      <div className="wrap space-y-20">
        <p className="eyebrow">Inside the product</p>
        {SHOWCASE.map((step, i) => (
          <Reveal key={step.img}>
            <div className="grid grid-cols-[minmax(0,200px)_1fr] items-center gap-8 sm:gap-12">
              <Phone className="w-full" depth={12}>
                <img src={step.img} alt={`BubbleMarkets ${step.tag.toLowerCase()} board`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
              </Phone>
              <div>
                <p className="font-mono text-sm text-mist">0{i + 1} — {step.tag}</p>
                <h2 className="mt-3 text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em]">{step.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-mist">{step.body}</p>
                <Points points={step.points} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function useShortViewport() {
  const [short, setShort] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-height: 600px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-height: 600px)')
    const on = () => setShort(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return short
}

export default function Showcase() {
  return useShortViewport() ? <StackedShowcase /> : <StickyShowcase />
}

function StickyShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(SHOWCASE.length - 1, Math.floor(v * SHOWCASE.length))))

  // The phone swings through 3D space as you scroll the section.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })
  const rotateY = useTransform(smooth, [0, 0.5, 1], [-26, 0, 26])
  const rotateX = useTransform(smooth, [0, 0.5, 1], [10, 0, -6])
  const floatY = useTransform(smooth, [0, 1], [12, -12])
  const step = SHOWCASE[active]

  return (
    <section id="product" ref={ref} className="relative" style={{ height: `${SHOWCASE.length * 100}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-start overflow-hidden pt-[88px] lg:items-center lg:pt-16">
        <div aria-hidden className="absolute right-[-10%] top-1/4 h-[60vh] w-[50vw] rounded-full bg-azure/15 blur-[150px]" />
        <div className="wrap relative grid items-center gap-4 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="eyebrow hidden lg:block">Inside the product</p>
            <div className="relative min-h-[190px] sm:min-h-[340px] lg:mt-4">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <p className="font-mono text-sm text-mist">
                    0{active + 1} — {step.tag}
                  </p>
                  <h2 className="mt-2 text-balance text-[1.6rem] font-bold leading-[1.05] tracking-[-0.03em] sm:mt-3 sm:text-5xl">{step.title}</h2>
                  <p className="lede mt-3 line-clamp-4 max-w-lg !text-[15px] !leading-relaxed sm:mt-5 sm:line-clamp-none sm:!text-lg">{step.body}</p>
                  <Points points={step.points} className="hidden sm:block" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 flex gap-2 lg:mt-6" aria-hidden>
              {SHOWCASE.map((_, i) => (
                <span key={i} className="h-1 w-12 overflow-hidden rounded-full bg-white/10">
                  <motion.span className="block h-full bg-lime" animate={{ width: i <= active ? '100%' : '0%' }} transition={{ duration: 0.4 }} />
                </span>
              ))}
            </div>
          </div>

          {/* On phones the handset is drawn large and cropped, fading out behind the copy, so the board is actually legible. */}
          <div
            className="order-1 -mx-5 flex h-[50svh] items-start justify-center overflow-hidden pt-3 [mask-image:linear-gradient(to_bottom,#000_78%,transparent)] sm:mx-0 lg:order-2 lg:h-auto lg:items-center lg:overflow-visible lg:pt-0 lg:[mask-image:none]"
            style={{ perspective: 1400 }}
          >
            <motion.div style={{ rotateY, rotateX, y: floatY, transformStyle: 'preserve-3d' }} className="relative">
              <div aria-hidden className="absolute -inset-10 rounded-[4rem] bg-lime/10 blur-3xl" style={{ transform: 'translateZ(-60px)' }} />
              <Phone className="w-[min(76vw,340px)] lg:h-[76svh] lg:max-h-[700px] lg:w-auto" depth={24}>
                {SHOWCASE.map((s, i) => (
                  <motion.img
                    key={s.img}
                    src={s.img}
                    alt={`BubbleMarkets ${s.tag.toLowerCase()} board`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                    transition={{ duration: 0.6 }}
                  />
                ))}
              </Phone>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
