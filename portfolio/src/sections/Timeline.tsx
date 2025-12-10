import { motion, useScroll, useSpring } from 'framer-motion'
import { GraduationCap, Code, Briefcase } from 'lucide-react'
import { useRef } from 'react'
import { fadeInUp, transition } from '../lib/animations'
import SpotlightCard from '../components/SpotlightCard'

const items = [
  {
    title: 'Intermediate (Pre-Engineering)',
    org: 'Degree College Malir Cantt',
    time: 'Completed',
    icon: GraduationCap,
  },
  {
    title: 'BS in Computer Science',
    org: 'FAST NUCES, Karachi',
    time: 'Starting',
    icon: Code,
  },
  {
    title: 'Current Projects',
    org: 'Web, AI & UI/UX',
    time: 'Ongoing',
    icon: Briefcase,
  },
]

export default function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section ref={ref} className="section bg-slate-50/50 dark:bg-slate-900/20">
      <div className="container max-w-4xl">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={transition} className="mb-12 text-center">
          <h2 className="section-title">Journey</h2>
          <p className="muted mt-2">From Pre-Engineering to Computer Science and real-world projects.</p>
        </motion.div>

        <div className="relative space-y-6">
          {/* Animated Line */}
          <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 md:left-1/2 md:-ml-px" />
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 md:left-1/2 md:-ml-px"
          />

          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...transition, delay: idx * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border-4 border-slate-100 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 dark:bg-slate-900 dark:border-slate-800 transition-transform group-hover:scale-110">
                <it.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <SpotlightCard className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white truncate">{it.title}</h3>
                    <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">{it.time}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{it.org}</p>
                </SpotlightCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
