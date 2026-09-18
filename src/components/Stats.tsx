import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { STATS } from '../lib/content'
import { Reveal } from './ui'

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => (node.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`) })
    return () => controls.stop()
  }, [inView, value, prefix, suffix])
  return <span ref={ref}>{prefix}0{suffix}</span>
}

export default function Stats() {
  return (
    <section className="border-y border-white/10 bg-ink-900/50 py-16">
      <div className="wrap grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="text-center">
              <p className="font-mono text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-mist sm:text-base">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
