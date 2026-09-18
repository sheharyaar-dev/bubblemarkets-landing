export const APP_URL = 'https://bubblemarkets.com'

export const link = (path = '') => `${APP_URL}${path}`

// Tickers and moves below are illustrative — the page says so wherever they render.
export type Bubble = { s: string; c: number; r: number }

export const HERO_BUBBLES: Bubble[] = [
  { s: 'NVDA', c: -2.34, r: 1.55 },
  { s: 'BTC', c: 3.12, r: 1.7 },
  { s: 'AAPL', c: 1.45, r: 1.4 },
  { s: 'MSFT', c: 0.27, r: 1.3 },
  { s: 'ETH', c: 4.61, r: 1.2 },
  { s: 'GOLD', c: 0.84, r: 1.1 },
  { s: 'EUR/USD', c: -0.31, r: 1.05 },
  { s: 'SPY', c: 0.62, r: 1.15 },
  { s: 'AMZN', c: -0.71, r: 1.0 },
  { s: 'TSLA', c: -3.72, r: 0.95 },
  { s: 'SOL', c: 7.8, r: 0.9 },
  { s: 'US10Y', c: -0.4, r: 0.8 },
  { s: 'GOOGL', c: 1.92, r: 0.95 },
  { s: 'META', c: -4.45, r: 0.85 },
  { s: 'OIL', c: -1.88, r: 0.8 },
  { s: 'N225', c: 1.1, r: 0.75 },
  { s: 'QQQ', c: 0.95, r: 0.85 },
  { s: 'USD/JPY', c: 0.22, r: 0.7 },
  { s: 'XRP', c: -2.9, r: 0.65 },
  { s: 'LLY', c: 3.6, r: 0.7 },
  { s: 'TSM', c: -4.07, r: 0.75 },
  { s: 'DAX', c: 0.48, r: 0.6 },
  { s: 'JPM', c: 0.63, r: 0.6 },
  { s: 'SILVER', c: 2.2, r: 0.55 },
  { s: 'DOGE', c: -5.3, r: 0.5 },
  { s: 'GBP/USD', c: 0.12, r: 0.5 },
  { s: 'AVGO', c: -3.17, r: 0.6 },
  { s: 'NIFTY', c: 0.9, r: 0.5 },
  { s: 'WMT', c: 0.76, r: 0.45 },
  { s: 'BNB', c: 1.3, r: 0.5 },
  { s: 'V', c: 1.51, r: 0.45 },
  { s: 'GAS', c: -2.6, r: 0.42 },
]

export const MARKETS: { id: string; label: string; note: string; path: string; bubbles: [string, number, number][] }[] = [
  {
    id: 'stocks',
    label: 'Stocks',
    note: '~1,500 of the most-traded US names, plus Asian, European, Japanese and Indian boards.',
    path: '/stocks',
    bubbles: [['NVDA', -2.3, 100], ['AAPL', 1.5, 92], ['MSFT', 0.3, 86], ['AMZN', -0.7, 70], ['GOOGL', 1.9, 66], ['META', -4.5, 56], ['TSLA', -3.7, 50], ['LLY', 3.6, 46], ['TSM', -4.1, 44], ['JPM', 0.6, 40], ['WMT', 0.8, 36], ['V', 1.5, 34]],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    note: '~16,000 coins, with live prices streaming straight into the board.',
    path: '/crypto',
    bubbles: [['BTC', 3.1, 100], ['ETH', 4.6, 84], ['SOL', 7.8, 60], ['BNB', 1.3, 56], ['XRP', -2.9, 54], ['DOGE', -5.3, 44], ['ADA', 2.2, 40], ['TRX', 0.4, 38], ['AVAX', -1.6, 36], ['LINK', 5.1, 34], ['TON', -0.8, 32], ['DOT', 1.1, 30]],
  },
  {
    id: 'etfs',
    label: 'ETFs',
    note: '~200 funds — tap one and the board becomes its holdings, sized by dollars held.',
    path: '/etfs',
    bubbles: [['SPY', 0.6, 100], ['IVV', 0.6, 88], ['VOO', 0.6, 86], ['QQQ', 1.0, 72], ['VTI', 0.5, 66], ['IWM', -0.9, 48], ['GLD', 0.8, 46], ['EEM', -0.4, 40], ['TLT', -0.6, 38], ['XLK', 1.2, 36], ['ARKK', -2.8, 32], ['XLE', -1.7, 30]],
  },
  {
    id: 'forex',
    label: 'Forex',
    note: '~130 currencies and ~1,900 cross-rates, sized by real global turnover.',
    path: '/forex',
    bubbles: [['USD', 0.1, 100], ['EUR', -0.3, 80], ['JPY', 0.2, 64], ['GBP', 0.1, 56], ['CNY', -0.1, 48], ['AUD', 0.5, 44], ['CAD', -0.2, 42], ['CHF', 0.3, 40], ['INR', -0.1, 34], ['MXN', 0.9, 32], ['SGD', 0.1, 30], ['BRL', -1.1, 30]],
  },
  {
    id: 'commodities',
    label: 'Commodities',
    note: 'Gold, oil, gas, metals and softs — the real-economy board.',
    path: '/commodities',
    bubbles: [['GOLD', 0.8, 100], ['OIL', -1.9, 86], ['BRENT', -1.7, 70], ['SILVER', 2.2, 58], ['GAS', -2.6, 52], ['COPPER', 1.4, 50], ['WHEAT', -0.6, 40], ['CORN', 0.3, 38], ['PLAT', 1.0, 34], ['COFFEE', 3.3, 34], ['SUGAR', -1.2, 30], ['COCOA', -4.0, 30]],
  },
  {
    id: 'bonds',
    label: 'Bonds',
    note: 'The full US Treasury curve — every maturity from 1-month to 30-year.',
    path: '/bonds',
    bubbles: [['US10Y', -0.4, 100], ['US2Y', -0.7, 84], ['US30Y', -0.2, 76], ['US5Y', -0.5, 66], ['US7Y', -0.4, 54], ['US20Y', -0.2, 50], ['US1Y', -0.3, 46], ['US3Y', -0.6, 44], ['US6M', 0.1, 38], ['US3M', 0.1, 36], ['US1M', 0.0, 32], ['US2M', 0.1, 30]],
  },
  {
    id: 'indices',
    label: 'Indices',
    note: 'World indices side by side — see which region is leading today.',
    path: '/indices',
    bubbles: [['S&P', 0.6, 100], ['NDX', 1.0, 86], ['DOW', 0.2, 76], ['N225', 1.1, 62], ['DAX', 0.5, 56], ['FTSE', -0.2, 52], ['HSI', -1.4, 50], ['NIFTY', 0.9, 46], ['CAC', 0.3, 40], ['KOSPI', -0.8, 36], ['ASX', 0.4, 34], ['IBOV', -1.0, 30]],
  },
]

export const SHOWCASE = [
  {
    img: '/shots/stocks.jpg',
    tag: 'Stocks',
    title: 'A whole market in one glance.',
    body: 'Physics-driven bubbles drift, collide and can be dragged. Size by market cap or volume, flip from 1H to 1Y, and watch the whole market recolour.',
    points: ['1H · 24H · 7D · 30D · 3M · 6M · 1Y', 'Top-movers strip and live ticker', 'Momentum badges flag unusual activity'],
  },
  {
    img: '/shots/crypto.jpg',
    tag: 'Crypto',
    title: 'The bubbles you know, streaming live.',
    body: '~16,000 coins with prices streaming straight into the board. Tap any bubble for the chart, stats, news and a factual AI read — never advice.',
    points: ['Live exchange price stream', 'Interactive charts, 1 day to all-time', 'One-tap watchlist and alerts'],
  },
  {
    img: '/shots/forex.jpg',
    tag: 'Forex',
    title: 'Currencies, sized by what the world actually trades.',
    body: '~130 currencies and ~1,900 cross-rates. Bubbles are sized by real global turnover, so the euro looks like the euro and not like a rounding error.',
    points: ['Sized by global FX turnover', 'Every cross-rate, one tap away', 'Display prices in 8 currencies'],
  },
  {
    img: '/shots/commodities.jpg',
    tag: 'Commodities',
    title: 'Gold, oil, cocoa — the real economy, too.',
    body: 'Metals, energy and softs on the same screen as your stocks and coins. Add the Treasury curve and world indices, and nothing is out of view.',
    points: ['Metals, energy, agriculture', 'Full US Treasury curve', 'World indices side by side'],
  },
]

export const FEATURES = [
  { icon: 'Bell', title: 'Alerts that watch for you', body: 'Price above / below, 24h % moves and volume spikes — delivered in-app and by push.', span: 'lg:col-span-2' },
  { icon: 'Wallet', title: 'Portfolio P&L', body: 'Add a symbol, quantity and buy price. See live value, cost basis and profit in your currency.', span: '' },
  { icon: 'Sparkles', title: 'AI market summaries', body: 'A plain-English read of what the board is doing right now. Neutral by design: no advice, no price targets.', span: '' },
  { icon: 'History', title: 'Historical replay', body: 'Press play and watch the last 7 days of the market unfold, with a scrubber to stop on any moment.', span: '' },
  { icon: 'Layers', title: 'ETF holdings explorer', body: 'Click a stock to see the ETFs that hold it. Click an ETF to see what is inside, sized by dollars held.', span: '' },
  { icon: 'MonitorSmartphone', title: 'Multi-monitor dashboards', body: 'Two or four full live boards in one grid — stocks beside crypto beside forex, all streaming.', span: 'lg:col-span-2' },
  { icon: 'Smartphone', title: 'Tilt to stir the market', body: 'On a phone, bubbles settle toward whichever way is down. It is a small thing. People love it.', span: '' },
  { icon: 'ShieldCheck', title: 'Secure by default', body: 'Two-factor authentication, captcha-protected sign-in and one-click account deletion.', span: '' },
  { icon: 'Code2', title: 'Embeddable widgets', body: 'Drop a live, white-label bubble board into your own site with one iframe snippet.', span: 'lg:col-span-2' },
]

export const STATS = [
  { value: 16000, prefix: '~', suffix: '', label: 'coins' },
  { value: 1500, prefix: '~', suffix: '', label: 'US stocks' },
  { value: 1900, prefix: '~', suffix: '', label: 'FX cross-rates' },
  { value: 7, prefix: '', suffix: '', label: 'asset classes, one screen' },
]

export const COMPARE = [
  'Stock bubbles',
  'ETF bubbles',
  'Forex & currencies',
  'Commodities',
  'Bonds & world indices',
  'Cross-asset comparison',
  'Portfolio tracker',
  'Price & volume-spike alerts',
  'Screener & heat maps',
  'AI market summaries',
  'ETF holdings explorer',
  'Two-factor authentication',
]

export const PLANS = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    line: 'Get started',
    cta: 'Open the bubbles',
    href: link('/'),
    features: ['Stocks, ETFs, Forex & Crypto', 'Prices refresh every 1–2 minutes', 'Interactive bubble maps', 'Watchlists', 'Filters & sorting'],
  },
  {
    name: 'Pro',
    monthly: 19.99,
    yearly: 199,
    line: 'For active traders',
    popular: true,
    cta: 'Start 7-day free trial',
    href: link('/pricing'),
    features: ['Prices refresh every 30–60 seconds', 'Unlimited watchlists', 'Price alerts', 'Portfolio tracking', 'Sector heat maps', 'Historical replay', 'AI market summaries', 'ETF holdings explorer'],
  },
  {
    name: 'Professional',
    monthly: 49.99,
    yearly: 499,
    line: 'For power users',
    cta: 'Go Professional',
    href: link('/pricing'),
    features: ['Everything in Pro', 'Live streaming — second to second', 'Advanced screeners', 'Developer API access', 'CSV data export', 'Multi-monitor dashboards', 'Advanced alerts — % moves & volume spikes', 'Per-asset AI analysis'],
  },
  {
    name: 'Enterprise',
    monthly: 99,
    yearly: 990,
    line: 'For teams & firms',
    cta: 'Talk to us',
    href: link('/contact'),
    features: ['Everything in Professional', 'Commercial licensing', 'Team accounts — up to 5 users', 'White-label widgets', 'Firm dashboards', 'Higher API limits — 100k requests/day'],
  },
]

export const FAQS = [
  { q: 'What is BubbleMarkets?', a: 'A live market visualizer. Every stock, ETF, coin, currency, commodity, bond and index is drawn as a bubble — sized by its value and coloured by its price move — so you can read an entire market at a glance instead of scrolling a table.' },
  { q: 'Is it really free?', a: 'Yes. You can open any board without installing anything or creating an account. A free account adds saved watchlists, all timeframes and a price alert. Paid plans add faster data, live streaming, portfolio, screener, heat maps, replay, AI and the API.' },
  { q: 'How is it different from crypto-only bubble charts?', a: 'Same idea, much wider lens. Crypto-only tools stop at coins. BubbleMarkets puts stocks, ETFs, forex, commodities, bonds and world indices on the same screen, so you can compare momentum across markets instead of inside just one.' },
  { q: 'What do bubble size and colour mean?', a: 'Size is value — market cap by default, or 24h volume or % change if you prefer. Colour is direction: green is up, red is down, and the stronger the colour the bigger the move. Grey means roughly flat.' },
  { q: 'How often do prices update?', a: 'It depends on your plan and the market. Crypto and US stocks & ETFs are the fastest on every plan — from every 1–2 minutes on Free to second-by-second streaming on Professional. Forex, commodities, bonds and indices update more slowly because those sources do not publish faster.' },
  { q: 'Is there a mobile app?', a: 'Native iOS and Android apps are on the way. Today the site works beautifully in any mobile browser — including tilt-to-move bubbles.' },
  { q: 'Is this financial advice?', a: 'No. BubbleMarkets is a visualization and research tool. Nothing on it is a recommendation to buy or sell. Do your own research.' },
]

export const SOCIALS = [
  { label: 'X', href: 'https://x.com/bubblemarketss' },
  { label: 'Instagram', href: 'https://www.instagram.com/bubble.markets/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@bubblemarkets' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/bubble-markets/' },
  { label: 'Threads', href: 'https://www.threads.com/@bubble.markets' },
  { label: 'Reddit', href: 'https://www.reddit.com/user/bubblemarkets/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61593383404043' },
]
