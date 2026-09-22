import { HERO_BUBBLES } from '../lib/content'

// Deterministic ring layout around the copy: big bubbles out wide, small ones nearer the middle.
const SLOTS: [number, number][] = [
  [8, 22], [90, 20], [14, 74], [86, 78], [4, 50], [95, 52], [28, 6], [72, 5], [24, 92], [76, 93],
  [12, 38], [88, 36], [50, 2], [50, 99], [20, 58], [82, 62], [40, 92], [62, 10], [6, 84], [94, 88],
]

/**
 * Static CSS version of the hero field. Used when WebGL is unavailable, fails or is lost mid-session,
 * and as the first paint before the three.js chunk arrives, so the hero never renders empty.
 */
export default function BubbleFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {HERO_BUBBLES.slice(0, SLOTS.length).map((b, i) => {
        const [x, y] = SLOTS[i]
        const size = 60 + b.r * 70
        return (
          <div
            key={b.s}
            className="bubble -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              ['--c' as string]: b.c >= 0 ? '34 197 94' : '239 68 68',
              animation: `bob ${6 + (i % 5)}s ease-in-out ${i * -0.9}s infinite`,
            }}
          >
            <div className="leading-tight">
              <p className="font-bold" style={{ fontSize: Math.max(10, size / 6) }}>{b.s}</p>
              <p className={`font-mono ${b.c >= 0 ? 'text-up' : 'text-down'}`} style={{ fontSize: Math.max(8, size / 10) }}>
                {b.c >= 0 ? '+' : ''}{b.c.toFixed(2)}%
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
