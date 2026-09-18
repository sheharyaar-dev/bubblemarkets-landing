import { ArrowUpRight } from 'lucide-react'
import { link } from '../lib/content'
import { Reveal, SectionHead } from './ui'

export default function Developer() {
  return (
    <section id="api" className="relative py-28 sm:py-36">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 [&>*]:min-w-0">
        <div>
          <SectionHead eyebrow="For developers & AI agents" title="One endpoint. Every market." lede="The same data that drives the bubbles, as clean JSON. Seven categories, 100 assets a page, simple bearer auth — plus an OpenAPI spec and llms.txt so agents can find their own way in." />
          <Reveal delay={0.2}>
            <dl className="mt-9 grid grid-cols-2 gap-6 font-mono">
              <div>
                <dt className="text-xs uppercase tracking-widest text-mist">Professional</dt>
                <dd className="mt-1 text-2xl text-white">10,000 <span className="text-sm text-mist">req / day</span></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-mist">Enterprise</dt>
                <dd className="mt-1 text-2xl text-white">100,000 <span className="text-sm text-mist">req / day</span></dd>
              </div>
            </dl>
            <a href={link('/developer')} className="btn-ghost mt-9">
              Get an API key <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass overflow-hidden rounded-3xl shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-down/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-up/80" />
              <span className="ml-3 font-mono text-xs text-mist">GET /api/v1/markets</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed sm:text-sm">
              <code>
                <span className="text-lime">curl</span> <span className="text-white">"https://bubblemarkets.com/api/v1/markets?category=crypto&page=1"</span> \{'\n'}
                {'  '}-H <span className="text-azure">"Authorization: Bearer $BUBBLEMARKETS_KEY"</span>
                {'\n\n'}
                <span className="text-mist/60">{'// 200 OK'}</span>
                {'\n'}
                {'{\n'}
                {'  '}<span className="text-violet">"symbol"</span>: <span className="text-up">"BTC"</span>,{'\n'}
                {'  '}<span className="text-violet">"name"</span>: <span className="text-up">"Bitcoin"</span>,{'\n'}
                {'  '}<span className="text-violet">"price"</span>: <span className="text-lime">…</span>,{'\n'}
                {'  '}<span className="text-violet">"market_cap"</span>: <span className="text-lime">…</span>,{'\n'}
                {'  '}<span className="text-violet">"volume"</span>: <span className="text-lime">…</span>,{'\n'}
                {'  '}<span className="text-violet">"change_24h"</span>: <span className="text-lime">…</span>
                {'\n}'}
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
