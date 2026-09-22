import { motion, useScroll, useTransform } from 'framer-motion'

// The logo's purple, kept dark enough that white and mist text stay readable on top of it.
const DARK = '#000724'
const LIGHT = '#301f78'
const STOPS = [DARK, LIGHT, DARK, LIGHT, DARK, LIGHT, DARK, LIGHT, DARK]

/** Fixed backdrop that breathes between navy and the logo purple several times as the page scrolls. */
export default function PurpleWash() {
  const { scrollYProgress } = useScroll()
  const background = useTransform(scrollYProgress, STOPS.map((_, i) => i / (STOPS.length - 1)), STOPS)
  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ background }} />
}
