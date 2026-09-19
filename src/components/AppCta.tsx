import { ArrowRight } from 'lucide-react'
import { APP_STORE_URL, APPS_LIVE, link, PLAY_STORE_URL, SMART_APP_LINK } from '../lib/content'
import { Reveal } from './ui'

function StoreButton({ href, small, big }: { href: string; small: string; big: string }) {
  return (
    <a href={href} className="inline-flex min-h-[52px] items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-5 text-left transition-colors hover:bg-white/10">
      <span className="leading-tight">
        <span className="block text-[11px] text-mist">{small}</span>
        <span className="block text-[15px] font-semibold">{big}</span>
      </span>
    </a>
  )
}

/** Store buttons once the apps are live (see content.ts); nothing before that. */
export function StoreButtons() {
  if (!APPS_LIVE) return null
  return (
    <>
      {(APP_STORE_URL || SMART_APP_LINK) && <StoreButton href={APP_STORE_URL || SMART_APP_LINK} small="Download on the" big="App Store" />}
      {(PLAY_STORE_URL || SMART_APP_LINK) && <StoreButton href={PLAY_STORE_URL || SMART_APP_LINK} small="Get it on" big="Google Play" />}
    </>
  )
}

/**
 * The "I've seen enough" exit under each main section.
 * Before launch it sends people to the web product; after launch it becomes the app download row.
 */
export default function SectionCta({ line }: { line: string }) {
  return (
    <Reveal>
      <div className="wrap -mt-10 pb-24 sm:-mt-14 sm:pb-28">
        <div className="glass mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 rounded-3xl px-6 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="text-lg font-medium text-white">{line}</p>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <StoreButtons />
            <a href={link('/')} className={APPS_LIVE ? 'btn-ghost' : 'btn-primary group'}>
              {APPS_LIVE ? 'Open in browser' : 'Try it free'}
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
