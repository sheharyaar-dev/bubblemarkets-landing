import Platforms from './Platforms'
import { Reveal } from './ui'

/** Kept for the footer: the same iOS / Android / Desktop trio, compact. */
export function StoreButtons() {
  return <Platforms compact />
}

/** The "I've seen enough" exit under each main section. */
export default function SectionCta({ line }: { line: string }) {
  return (
    <Reveal>
      <div className="wrap -mt-10 pb-24 sm:-mt-14 sm:pb-28">
        <div className="glass mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-3xl px-6 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="text-lg font-medium text-white">{line}</p>
          <Platforms compact className="shrink-0" />
        </div>
      </div>
    </Reveal>
  )
}
