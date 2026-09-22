import { ArrowRight, Monitor, Smartphone, TabletSmartphone } from 'lucide-react'
import { APP_STORE_URL, link, PLAY_STORE_URL, SMART_APP_LINK } from '../lib/content'

type Platform = { id: string; label: string; sub: string; href: string; live: boolean; Icon: typeof Monitor }

function platforms(): Platform[] {
  const ios = APP_STORE_URL || SMART_APP_LINK
  const android = PLAY_STORE_URL || SMART_APP_LINK
  return [
    { id: 'ios', label: 'iOS', sub: ios ? 'App Store' : 'Coming soon', href: ios, live: !!ios, Icon: Smartphone },
    { id: 'android', label: 'Android', sub: android ? 'Google Play' : 'Coming soon', href: android, live: !!android, Icon: TabletSmartphone },
    { id: 'web', label: 'Desktop', sub: 'Open in browser', href: link('/'), live: true, Icon: Monitor },
  ]
}

/**
 * The iOS / Android / Desktop trio. Store buttons switch on by themselves once the links in content.ts are set;
 * until then they show "Coming soon" and the Desktop button carries the action.
 */
export default function Platforms({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  const items = platforms()
  return (
    <div className={`relative ${className}`}>
      {/* the lighter-purple halo marketing asked for behind the buttons */}
      <div aria-hidden className="absolute -inset-3 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.45),rgba(124,92,255,0.12)_55%,transparent_75%)] blur-md" />
      <div className={`flex flex-wrap justify-center ${compact ? 'gap-2' : 'gap-3'}`}>
        {items.map(({ id, label, sub, href, live, Icon }) => {
          const primary = live && (id === 'web' ? !items.some((p) => p.live && p.id !== 'web') : true)
          const cls = `inline-flex items-center gap-3 rounded-2xl border text-left transition-colors ${compact ? 'min-h-[46px] px-4' : 'min-h-[56px] px-5'} ${
            !live ? 'cursor-default border-white/10 bg-white/[0.03] text-mist/70' : primary ? 'border-lime/60 bg-lime text-ink hover:bg-lime-soft' : 'border-violet/50 bg-violet/25 text-white hover:bg-violet/40'
          }`
          const inner = (
            <>
              <Icon size={compact ? 18 : 22} className="shrink-0" />
              <span className="leading-tight">
                <span className={`block font-semibold ${compact ? 'text-sm' : 'text-[15px]'}`}>{label}</span>
                <span className={`block opacity-75 ${compact ? 'text-[9px] leading-none' : 'text-[11px]'}`}>{compact && live ? null : compact ? 'soon' : sub}</span>
              </span>
              {live && !compact && <ArrowRight size={16} className="ml-1 shrink-0 opacity-70" />}
            </>
          )
          return live ? (
            <a key={id} href={href} className={cls} aria-label={`${label} — ${sub}`}>
              {inner}
            </a>
          ) : (
            <span key={id} className={cls} aria-label={`${label} app coming soon`}>
              {inner}
              {!compact && <span className="ml-1 rounded-full bg-violet/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">Soon</span>}
            </span>
          )
        })}
      </div>
    </div>
  )
}
