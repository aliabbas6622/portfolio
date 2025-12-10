import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, transition } from '../lib/animations'
import { Sparkles, Trophy, Briefcase, Clock } from 'lucide-react'
import SpotlightCard from '../components/SpotlightCard'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-8"
        >
          <motion.h2 variants={fadeInUp} transition={transition} className="section-title">Highlights</motion.h2>
          <motion.p variants={fadeInUp} transition={transition} className="muted mt-1">Quick stats and availability at a glance.</motion.p>
        </motion.div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <motion.div variants={fadeInUp} transition={transition} className="h-full">
            <SpotlightCard className="h-full p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Status</h3>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Open to work</span>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={fadeInUp} transition={transition} className="h-full">
            <SpotlightCard className="h-full p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Projects</h3>
              </div>
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">8+</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Shipped demos & apps</p>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={fadeInUp} transition={transition} className="h-full">
            <SpotlightCard className="h-full p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Stack</h3>
              </div>
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">12+</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Core technologies</p>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={fadeInUp} transition={transition} className="h-full">
            <SpotlightCard className="h-full p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Education</h3>
              </div>
              <p className="mt-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">Freshman</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">FAST NUCES, BS AI</p>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
