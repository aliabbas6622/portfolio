import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-primary/80 dark:bg-primary"
      style={{ scaleX }}
    />
  )
}
