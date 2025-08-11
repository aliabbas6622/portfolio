import { motion } from 'framer-motion'

export default function Gallery() {
  return (
    <section className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="mb-6">
          <h2 className="section-title">Snapshots</h2>
          <p className="muted mt-1">A few visuals with short stories.</p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          <motion.figure initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow dark:border-slate-700 dark:bg-slate-900">
            <div className="h-56 w-full bg-gradient-to-br from-indigo-200 to-cyan-200 dark:from-indigo-500/20 dark:to-cyan-500/20" />
            <figcaption className="p-4 text-sm text-slate-700 dark:text-slate-300">Always iterating on clean, human-friendly interfaces.</figcaption>
          </motion.figure>
          <motion.figure initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.05 }} className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow dark:border-slate-700 dark:bg-slate-900">
            <div className="h-56 w-full bg-gradient-to-br from-indigo-300/40 via-sky-300/30 to-cyan-300/40 dark:from-indigo-500/20 dark:via-sky-500/15 dark:to-cyan-500/20" />
            <figcaption className="p-4 text-sm text-slate-700 dark:text-slate-300">Prototyping AI chat flows — prompt routing, memory, UX polish.</figcaption>
          </motion.figure>
          <motion.figure initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.1 }} className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow dark:border-slate-700 dark:bg-slate-900">
            <div className="h-56 w-full bg-gradient-to-br from-sky-300/40 via-indigo-300/30 to-cyan-300/40 dark:from-sky-500/20 dark:via-indigo-500/15 dark:to-cyan-500/20" />
            <figcaption className="p-4 text-sm text-slate-700 dark:text-slate-300">Small interactions matter — they make products feel alive.</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
