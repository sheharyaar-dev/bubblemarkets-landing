import { Bell, Code2, History, Layers, MonitorSmartphone, ShieldCheck, Smartphone, Sparkles, Wallet, type LucideIcon } from 'lucide-react'
import { FEATURES } from '../lib/content'
import { Reveal, SectionHead, TiltCard } from './ui'

const ICONS: Record<string, LucideIcon> = { Bell, Code2, History, Layers, MonitorSmartphone, ShieldCheck, Smartphone, Sparkles, Wallet }

export default function Features() {
  return (
    <section id="features" className="relative py-28 sm:py-36">
      <div className="wrap">
        <SectionHead eyebrow="Depth behind the picture" title={<>Pretty is the hook.<br />The tools are why you stay.</>} lede="Built for active traders, not investors who check once a week." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon]
            return (
              <Reveal key={f.title} delay={(i % 4) * 0.06} className={f.span}>
                <TiltCard className="h-full">
                  <div className="flex h-full min-h-[220px] flex-col p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-lime/25 bg-lime/10 text-lime">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-auto pt-8 text-xl font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-mist">{f.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
