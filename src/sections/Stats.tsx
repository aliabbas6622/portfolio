import { useEffect } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

function Counter({ to, suffix = '+' }: { to: number; suffix?: string }) {
  const count = useMotionValue(0)
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.2,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => count.set(v),
    })
    return () => controls.stop()
  }, [to, count])
  return (
    <motion.span>
      {Math.round(count.get())}
      {suffix}
    </motion.span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Stats" className="section py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="container grid gap-4 sm:grid-cols-2 md:grid-cols-4"
      >
        <div className="rounded-2xl border border-slate-300 bg-white p-5 text-center shadow dark:border-slate-700 dark:bg-slate-900">
          <div className="text-3xl font-extrabold"><Counter to={8} /></div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Projects</p>
        </div>
        <div className="rounded-2xl border border-slate-300 bg-white p-5 text-center shadow dark:border-slate-700 dark:bg-slate-900">
          <div className="text-3xl font-extrabold"><Counter to={12} /></div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Technologies</p>
        </div>
        <div className="rounded-2xl border border-slate-300 bg-white p-5 text-center shadow dark:border-slate-700 dark:bg-slate-900">
          <div className="text-3xl font-extrabold"><Counter to={1} suffix={''} /></div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Year at FAST NUCES</p>
        </div>
        <div className="rounded-2xl border border-slate-300 bg-white p-5 text-center shadow dark:border-slate-700 dark:bg-slate-900">
          <div className="text-3xl font-extrabold">Karachi</div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Based in Pakistan</p>
        </div>
      </motion.div>
    </section>
  )
}
