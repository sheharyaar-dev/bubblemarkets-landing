/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#000724', 900: '#030a2b', 800: '#071036', 700: '#0d1844', 600: '#16235c' },
        lime: { DEFAULT: '#B6F605', soft: '#d4ff5c' },
        up: '#22C55E',
        down: '#EF4444',
        violet: '#7C5CFF',
        azure: '#3B82F6',
        mist: '#9AA6CF',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { wrap: '1240px' },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        bob: { '0%,100%': { transform: 'translate3d(0,0,0)' }, '50%': { transform: 'translate3d(0,-10px,0)' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        bob: 'bob 6s ease-in-out infinite',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
