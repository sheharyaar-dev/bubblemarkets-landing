import { link, SOCIALS } from '../lib/content'
import { Wordmark } from './ui'

const COLS: [string, [string, string][]][] = [
  ['Markets', [['Stocks', '/stocks'], ['Crypto', '/crypto'], ['ETFs', '/etfs'], ['Forex', '/forex'], ['Commodities', '/commodities'], ['Bonds', '/bonds'], ['Indices', '/indices']]],
  ['Tools', [['Screener', '/screener'], ['Heat map', '/heatmap'], ['Alerts', '/alerts'], ['Portfolio', '/portfolio'], ['Widgets', '/widgets'], ['Developer API', '/developer']]],
  ['Company', [['About', '/about'], ['Pricing', '/pricing'], ['Guides', '/guides'], ['FAQ', '/faq'], ['Contact', '/contact'], ['Privacy', '/privacy'], ['Terms', '/terms']]],
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900/60 pb-10 pt-16">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <img src="/logo-icon.png" srcSet="/logo-icon@2x.png 2x" alt="" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full" />
              <Wordmark className="text-xl" />
            </a>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist">Every market as a live bubble map — stocks, ETFs, crypto, forex, commodities, bonds and world indices.</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-xs text-mist">
              iOS & Android apps <span className="rounded-full bg-lime/15 px-2 py-0.5 text-lime">Soon</span>
            </p>
          </div>
          {COLS.map(([title, items]) => (
            <nav key={title} aria-label={title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mist">{title}</h3>
              <ul className="mt-4 space-y-1">
                {items.map(([label, path]) => (
                  <li key={path}>
                    <a href={link(path)} className="inline-block py-2.5 text-[15px] text-white/80 transition-colors hover:text-lime">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-2">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2.5 text-sm text-mist transition-colors hover:border-lime/50 hover:text-white">
              {s.label}
            </a>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-xs leading-relaxed text-mist/70">
          <p>No financial advice. Do your own research. BubbleMarkets is a visualization and research tool; nothing on it is a recommendation to buy or sell any asset. Prices are real but vary by source, and stocks update only during market hours.</p>
          <p className="mt-4">© {new Date().getFullYear()} BubbleMarkets · <a className="hover:text-white" href="mailto:support@bubblemarkets.com">support@bubblemarkets.com</a></p>
        </div>
      </div>
    </footer>
  )
}
