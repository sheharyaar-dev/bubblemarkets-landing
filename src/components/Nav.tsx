import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { link } from '../lib/content'
import { Wordmark } from './ui'

const LINKS = [
  ['Why', '#why'],
  ['Markets', '#markets'],
  ['Product', '#product'],
  ['Features', '#features'],
  ['Pricing', '#pricing'],
  ['API', '#api'],
  ['FAQ', '#faq'],
]

export default function Nav() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 40))

  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-wrap items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          solid || open ? 'border border-white/10 bg-ink/75 shadow-2xl shadow-black/40 backdrop-blur-xl' : 'border border-white/5 bg-ink/45 backdrop-blur-md'
        }`}
      >
        <a href="#top" className="flex min-h-[44px] items-center gap-2 sm:gap-2.5">
          <img src="/logo-icon.png" srcSet="/logo-icon@2x.png 2x" alt="" width={36} height={36} className="h-8 w-8 rounded-full sm:h-9 sm:w-9" />
          <Wordmark className="whitespace-nowrap text-base sm:text-lg" />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-4 py-2 text-sm text-mist transition-colors hover:bg-white/5 hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href={link('/login')} className="hidden rounded-full px-4 py-2 text-sm text-mist transition-colors hover:text-white sm:block">
            Sign in
          </a>
          <a href={link('/')} className="btn-primary !min-h-[40px] whitespace-nowrap !px-4 text-[13px] sm:!min-h-[42px] sm:!px-5 sm:text-sm">
            <span className="sm:hidden">Get app</span>
            <span className="hidden sm:inline">Open the app</span>
          </a>
          <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10 lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-2 max-w-wrap rounded-3xl border border-white/10 bg-ink/90 p-3 backdrop-blur-xl lg:hidden">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base text-white hover:bg-white/5">
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href={link('/login')} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base text-mist hover:bg-white/5">
              Sign in
            </a>
          </li>
        </motion.ul>
      )}
    </motion.header>
  )
}
