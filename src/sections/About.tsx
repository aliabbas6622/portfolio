import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, transition } from '../lib/animations'
import { Sparkles, Trophy, Briefcase, Clock } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-6"
        >
          <motion.h2 variants={fadeInUp} transition={transition} className="section-title">Highlights</motion.h2>
          <motion.p variants={fadeInUp} transition={transition} className="muted mt-1">Quick stats and availability at a glance.</motion.p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-4">
          <motion.div variants={fadeInUp} transition={transition} className="rounded-2xl border border-slate-300 bg-white p-5 shadow dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-sm font-semibold">Availability</h3>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Open to internships & collaborations
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} transition={transition} className="rounded-2xl border border-slate-300 bg-white p-5 shadow dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Trophy className="h-5 w-5" />
              <h3 className="text-sm font-semibold">Projects</h3>
            </div>
            <p className="mt-3 text-3xl font-extrabold">8+</p>
            <p className="muted text-sm">Shipped demos and apps</p>
          </motion.div>

          <motion.div variants={fadeInUp} transition={transition} className="rounded-2xl border border-slate-300 bg-white p-5 shadow dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Briefcase className="h-5 w-5" />
              <h3 className="text-sm font-semibold">Stack</h3>
            </div>
            <p className="mt-3 text-3xl font-extrabold">12+</p>
            <p className="muted text-sm">Technologies used</p>
          </motion.div>

          <motion.div variants={fadeInUp} transition={transition} className="rounded-2xl border border-slate-300 bg-white p-5 shadow dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Clock className="h-5 w-5" />
              <h3 className="text-sm font-semibold">BSCS</h3>
            </div>
            <p className="mt-3 text-3xl font-extrabold">Year 1</p>
            <p className="muted text-sm">FAST NUCES, Karachi</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
