import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'
import { fadeInUp, staggerContainer, transition } from '../lib/animations'
import Parallax from '../components/Parallax'

export default function Hero() {
  return (
    <section id="top" className="relative pt-16" style={{ minHeight: 'calc(100svh - 64px)' }}>
      <div className="absolute inset-0 -z-10 bg-[url('/bg-code.jpg')] bg-cover bg-center opacity-15 mix-blend-multiply dark:opacity-20" />
      <div className="container grid items-center gap-8 py-6 md:grid-cols-2">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-5"
        >
          <motion.div variants={fadeInUp} transition={transition} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Available for internships & collabs
          </motion.div>
          <motion.h1 variants={fadeInUp} transition={transition} className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            <span className="gradient-text">Designing intuitive interfaces</span>
            <br />
            that feel as good as they look
          </motion.h1>
          <motion.p variants={fadeInUp} transition={transition} className="muted text-base md:text-lg">
            I’m Ali Abbas, an aspiring Artificial Intelligence Student focused on modern UI/UX and AI-driven products. I build responsive, accessible web experiences with micro-interactions that users love.
          </motion.p>
          <motion.div variants={fadeInUp} transition={transition} className="flex flex-wrap items-center gap-3 pt-1">
            <a href="#projects" className="btn btn-primary">Explore projects</a>
            <a href="mailto:aliabbas6622tel@gmail.com" className="btn btn-ghost"><Mail className="mr-2 h-4 w-4" /> Contact me</a>
          </motion.div>
          <motion.div variants={fadeInUp} transition={transition} className="flex flex-wrap gap-2 pt-1 text-sm">
            <span className="badge">UI/UX Focus</span>
            <span className="badge">AI Integrations</span>
            <span className="badge">Responsive Design</span>
          </motion.div>
        </motion.div>
        <Parallax intensity={30}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
            className="flex justify-center md:justify-end"
          >
            <div className="relative aspect-[4/5] w-60 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl md:w-[22rem] lg:w-[24rem] dark:bg-slate-900 dark:border-slate-800">
              <div className="h-full w-full bg-gradient-to-br from-indigo-300/40 via-sky-300/30 to-cyan-300/40 dark:from-indigo-500/20 dark:via-sky-500/15 dark:to-cyan-500/20" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-50/30 dark:from-slate-900/20" />
              <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold shadow dark:bg-slate-800/90 dark:text-slate-100">
                <Sparkles className="mr-1 inline h-3.5 w-3.5" /> Hello!
              </div>
            </div>
          </motion.div>
        </Parallax>
      </div>
    </section>
  )
}
