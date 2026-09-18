# BubbleMarkets — marketing landing page

Animated 3D landing page for [BubbleMarkets](https://bubblemarkets.com): every market as a live bubble map.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/ — deploy to Vercel, Netlify, S3, anywhere
```

## Stack

Vite · React 19 · TypeScript · Tailwind CSS 3 · framer-motion (scroll + UI motion) · three.js (WebGL hero, lazy-loaded).

## Editing copy

All text, prices, plans, FAQs, stats and links live in **`src/lib/content.ts`** — marketing can change the page without touching components.
Every CTA points at `APP_URL` at the top of that file.

## Sections (`src/components/`)

| File | What it is |
| --- | --- |
| `Hero` + `BubbleScene` | WebGL field of glass bubbles: reacts to the cursor, camera flies through on scroll |
| `Marquee` | Ticker strip |
| `HowItWorks` | Interactive "size = value, colour = move" explainer with sliders |
| `Markets` | Seven asset classes — bubbles morph between markets |
| `Showcase` | Sticky scroll story with a 3D-rotating phone and real product screenshots |
| `Stats`, `Features`, `Compare` | Counters, tilt-card bento grid, comparison table |
| `Pricing`, `Developer`, `Faq`, `FinalCta`, `Footer` | Plans with monthly/yearly toggle, API, FAQ, parallax CTA |

## Notes

- Tickers and % moves in the hero, marquee and markets stage are **illustrative** and labelled as such on the page.
- Product screenshots in `public/shots/` were captured from the live site; re-capture when the UI changes.
- `prefers-reduced-motion` is respected: the WebGL scene renders a single still frame and UI animation is disabled.
- Mobile apps are shown as "Soon" — update `Footer.tsx` and the FAQ once store links exist.
