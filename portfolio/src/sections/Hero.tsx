import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'
import { fadeInUp, staggerContainer, transition } from '../lib/animations'
import Parallax from '../components/Parallax'
import Hero3D from '../components/Hero3D'

export default function Hero() {
  return (
    <section id="top" className="relative pt-16" style={{ minHeight: 'calc(100svh - 64px)' }}>
      <Hero3D />
      <div className="container grid items-center gap-8 py-6 md:grid-cols-2">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-5"
        >
          <motion.div variants={fadeInUp} transition={transition} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow backdrop-blur dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-200">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            BS Artificial Intelligence • FAST NUCES
          </motion.div>
          <motion.h1 variants={fadeInUp} transition={transition} className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            <span className="gradient-text">Building intelligent</span>
            <br />
            systems for the future.
          </motion.h1>
          <motion.p variants={fadeInUp} transition={transition} className="muted text-base md:text-lg max-w-lg">
            I’m <span className="font-bold text-slate-900 dark:text-white underline decoration-indigo-500/50 underline-offset-4 decoration-2">Ali Abbas</span>, a Freshman at <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md mx-1">FAST NUCES</span> exploring the intersection of <span className="text-slate-900 font-semibold dark:text-white">AI</span>, <span className="text-slate-900 font-semibold dark:text-white">Machine Learning</span>, and <span className="text-slate-900 font-semibold dark:text-white">Modern Web</span>. I craft responsive, high-performance applications powered by next-gen tech.
          </motion.p>
          <motion.div variants={fadeInUp} transition={transition} className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#projects" className="btn btn-primary shadow-lg shadow-indigo-500/20">View my work</a>
            <a href="mailto:aliabbas6622tel@gmail.com" className="btn btn-ghost"><Mail className="mr-2 h-4 w-4" /> Let's talk</a>
          </motion.div>
          <motion.div variants={fadeInUp} transition={transition} className="flex flex-wrap gap-2 pt-2 text-sm">
            <span className="badge border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/30 dark:bg-indigo-900/20 dark:text-indigo-300">Python & AI</span>
            <span className="badge">LangChain</span>
            <span className="badge">C/C++</span>
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
            <div className="relative aspect-[4/5] w-60 overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-2xl backdrop-blur md:w-[22rem] lg:w-[24rem] dark:from-slate-900 dark:to-slate-800 dark:border-slate-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Sparkles className="h-16 w-16 mx-auto text-indigo-500 animate-pulse" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Ali Abbas</p>
                </div>
              </div>
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
