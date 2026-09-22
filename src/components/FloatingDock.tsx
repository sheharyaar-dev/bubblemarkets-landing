import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Platforms from './Platforms'

/** Compact platform buttons that follow the reader once the hero has scrolled away, and step aside at the footer. */
export default function FloatingDock() {
  const { scrollY, scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)
  const update = () => setShow(scrollY.get() > window.innerHeight * 0.9 && scrollYProgress.get() < 0.94)
  useMotionValueEvent(scrollY, 'change', update)
  useMotionValueEvent(scrollYProgress, 'change', update)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed inset-x-3 bottom-3 z-40 flex justify-center sm:inset-x-auto sm:right-5 sm:bottom-5"
        >
          <div className="glass rounded-[1.6rem] px-2.5 py-2 shadow-2xl shadow-black/60">
            <p className="mb-1.5 hidden text-center font-mono sm:block text-[10px] uppercase tracking-[0.2em] text-mist">Get BubbleMarkets</p>
            <Platforms compact />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
