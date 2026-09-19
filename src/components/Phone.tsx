import type { CSSProperties, ReactNode } from 'react'

// Everything is sized in % of the phone's width, so one component works from 120px to 400px wide.
const BODY_RADIUS = '17.5% / 8.2%'
const SCREEN_RADIUS = '14% / 6.5%'
const FRAME = 'linear-gradient(135deg, #4a4c52 0%, #1d1e22 22%, #2c2d32 50%, #131417 78%, #3d3f45 100%)'

// [side, top %, height %]
const BUTTONS: ['left' | 'right', number, number][] = [
  ['left', 16.5, 3.6], // action button
  ['left', 23.5, 6.4], // volume up
  ['left', 31.5, 6.4], // volume down
  ['right', 27, 9.5], // power
  ['right', 55, 6], // camera control
]

/**
 * Graphite Pro-Max-style handset built in CSS. `depth` extrudes the body along Z,
 * so it shows a real edge when a parent rotates it in 3D (parent needs transform-style: preserve-3d).
 */
export default function Phone({ children, className = '', depth = 22 }: { children: ReactNode; className?: string; depth?: number }) {
  const layers = Math.max(2, Math.round(depth / 2))
  const body: CSSProperties = { position: 'absolute', inset: 0, borderRadius: BODY_RADIUS }

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: '9 / 19.2', transformStyle: 'preserve-3d' }}>
      {/* extruded body: stacked slices of the same rounded rect */}
      {Array.from({ length: layers }, (_, i) => (
        <div key={i} aria-hidden style={{ ...body, background: i === layers - 1 ? '#0c0d0f' : '#202126', transform: `translateZ(${-((i + 1) * depth) / layers}px)` }} />
      ))}

      {BUTTONS.map(([side, top, height], i) => (
        <div
          key={i}
          aria-hidden
          style={{ position: 'absolute', top: `${top}%`, height: `${height}%`, width: '1.3%', [side]: '-1%', borderRadius: 3, background: 'linear-gradient(90deg, #15161a, #4a4c52, #15161a)', transform: `translateZ(${-depth / 2}px)` }}
        />
      ))}

      {/* polished frame + bezel */}
      <div aria-hidden style={{ ...body, background: FRAME, boxShadow: '0 50px 100px -30px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.14)' }} />
      <div aria-hidden style={{ position: 'absolute', inset: '0.9%', borderRadius: BODY_RADIUS, background: '#000' }} />

      <div className="absolute overflow-hidden bg-[#11141d]" style={{ inset: '2.6% 3%', borderRadius: SCREEN_RADIUS, containerType: 'inline-size' }}>
        {/* status bar, so the Dynamic Island never sits on top of the app's own header */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-[#11141d] font-sans font-semibold text-white" style={{ height: '5.6%', padding: '0 9cqw', fontSize: '4.4cqw' }}>
          <span>9:41</span>
          <span className="flex items-center" style={{ gap: '1.6cqw' }}>
            <svg viewBox="0 0 18 12" style={{ height: '3.4cqw' }} fill="currentColor"><rect x="0" y="8" width="3" height="4" rx=".8" /><rect x="5" y="5.5" width="3" height="6.5" rx=".8" /><rect x="10" y="3" width="3" height="9" rx=".8" /><rect x="15" y="0" width="3" height="12" rx=".8" /></svg>
            <svg viewBox="0 0 27 13" style={{ height: '3.6cqw' }} fill="none"><rect x=".5" y=".5" width="22" height="12" rx="3.5" stroke="currentColor" opacity=".45" /><rect x="2" y="2" width="17" height="9" rx="2.2" fill="currentColor" /><rect x="24" y="4.2" width="2" height="4.6" rx="1" fill="currentColor" opacity=".5" /></svg>
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0" style={{ top: '5.6%' }}>
          {children}
        </div>
        {/* Dynamic Island */}
        <div aria-hidden className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black" style={{ top: '1.35%', width: '29%', aspectRatio: '3.35 / 1' }}>
          <span className="absolute rounded-full bg-[#0d1224]" style={{ right: '12%', top: '30%', height: '40%', aspectRatio: '1', boxShadow: 'inset 0 0 2px rgba(80,110,255,0.7)' }} />
        </div>
        {/* glass glare */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.13]" />
      </div>
    </div>
  )
}
