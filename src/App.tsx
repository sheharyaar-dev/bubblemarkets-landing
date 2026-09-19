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
import Problem from './components/Problem'
import SectionCta from './components/AppCta'
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
        {/* hook (hero) → problem → solution → how to read it */}
        <Problem />
        <HowItWorks />
        <SectionCta line="Got it? See it on a live market." />
        <Markets />
        <SectionCta line="Every market is already open in your browser." />
        <Showcase />
        <Stats />
        <Features />
        <SectionCta line="All of this starts free — no sign-up needed." />
        <Compare />
        <SectionCta line="Seen enough? Go and look around." />
        <Pricing />
        <Developer />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
