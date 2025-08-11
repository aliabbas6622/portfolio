import { motion } from 'framer-motion'
import { GraduationCap, Code, Briefcase } from 'lucide-react'
import { fadeInUp, transition } from '../lib/animations'

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
  return (
    <section className="section">
      <div className="container">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={transition} className="mb-6">
          <h2 className="section-title">Journey</h2>
          <p className="muted mt-1">From Pre-Engineering to Computer Science and real projects.</p>
        </motion.div>
        <ol className="relative ml-4 space-y-6 border-l border-slate-300 dark:border-slate-700">
          {items.map((it, idx) => (
            <motion.li
              key={it.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...transition, delay: idx * 0.05 }}
              className="pl-6"
            >
              <span className="absolute -left-1.5 mt-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-primary" />
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <it.icon className="h-4 w-4" />
                <span className="text-xs">{it.time}</span>
              </div>
              <div className="mt-2 rounded-2xl border border-slate-300 bg-white p-4 shadow dark:border-slate-700 dark:bg-slate-900">
                <h3 className="text-base font-semibold">{it.title}</h3>
                <p className="muted text-sm">{it.org}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
