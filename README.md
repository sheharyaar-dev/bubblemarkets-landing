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
| `Problem` | Hook → problem → solution: scattered apps vs one bubble view |
| `HowItWorks` | Interactive "size = value, colour = move" explainer with sliders |
| `Markets` | Seven asset classes — bubbles morph between markets |
| `Showcase` + `Phone` | Sticky scroll story; CSS-built graphite Pro-Max-style handset that rotates in 3D around real product screenshots |
| `Platforms` + `FloatingDock` | iOS / Android / Desktop button trio (hero, section strips, final CTA, footer) and the floating dock that follows the reader |
| `AppCta` | Call-to-action strip under each main section |
| `PurpleWash` | Fixed backdrop that breathes between navy and the logo purple as you scroll |
| `BubbleFallback` + `SceneBoundary` | Static CSS bubble field used when WebGL is missing, fails or is lost — the page never goes blank |
| `Stats`, `Features`, `Compare` | Counters, tilt-card bento grid, comparison table |
| `Pricing`, `Developer`, `Faq`, `FinalCta`, `Footer` | Plans with monthly/yearly toggle, API, FAQ, parallax CTA |

## When the mobile apps go live

Open `src/lib/content.ts` and fill in `APP_STORE_URL`, `PLAY_STORE_URL` and/or `SMART_APP_LINK`. Nothing else to change:
the iOS and Android buttons switch from "Coming soon" to live store links everywhere they appear (hero, section strips,
floating dock, final CTA, footer). Desktop always opens the web app. Leave them empty and every CTA keeps pointing at the web product.

## Notes

- Tickers and % moves in the hero, marquee and markets stage are **illustrative** and labelled as such on the page.
- Product screenshots in `public/shots/` were captured from the live site; re-capture when the UI changes.
- `prefers-reduced-motion` is respected: the WebGL scene renders a single still frame and UI animation is disabled.
- Mobile apps are shown as "Soon" until the links above are filled in; update the FAQ answer in `content.ts` at the same time.
