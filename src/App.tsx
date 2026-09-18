import { motion, useScroll, useSpring } from 'framer-motion'
import Compare from './components/Compare'
import Developer from './components/Developer'
import Faq from './components/Faq'
import Features from './components/Features'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Marquee from './components/Marquee'
import Markets from './components/Markets'
import Nav from './components/Nav'
import Pricing from './components/Pricing'
import Showcase from './components/Showcase'
import Stats from './components/Stats'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <div className="grain">
      <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-lime" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Markets />
        <Showcase />
        <Stats />
        <Features />
        <Compare />
        <Pricing />
        <Developer />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
